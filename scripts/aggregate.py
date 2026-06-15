#!/usr/bin/env python3
"""Aggregate the e-commerce CSVs in dataset/ into a compact dashboard/data.json.

No third-party deps (stdlib csv only). orders.csv (~25k rows) is streamed row by row,
never loaded whole. Run:  python3 scripts/aggregate.py
"""
import csv
import json
import os
from collections import defaultdict

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATASET = os.path.join(ROOT, "dataset")
OUT = os.path.join(ROOT, "dashboard", "data.json")

MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
               "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
DOW_ORDER = ["Monday", "Tuesday", "Wednesday", "Thursday",
             "Friday", "Saturday", "Sunday"]


def f(v, default=0.0):
    try:
        return float(v)
    except (TypeError, ValueError):
        return default


def i(v, default=0):
    try:
        return int(float(v))
    except (TypeError, ValueError):
        return default


def r2(x):
    return round(x, 2)


# ---------------------------------------------------------------- orders.csv
def aggregate_orders():
    total_revenue = 0.0
    n_orders = 0
    n_returned = 0
    n_repeat = 0
    rating_sum = 0.0
    rating_n = 0

    cat = defaultdict(lambda: {"revenue": 0.0, "orders": 0, "returned": 0})
    pay = defaultdict(lambda: {"revenue": 0.0, "orders": 0})
    dev = defaultdict(lambda: {"revenue": 0.0, "orders": 0})
    status = defaultdict(int)
    dow = defaultdict(lambda: {"revenue": 0.0, "orders": 0})
    quarter = defaultdict(lambda: {"revenue": 0.0, "orders": 0})
    year = defaultdict(lambda: {"revenue": 0.0, "orders": 0})
    season = defaultdict(float)                       # (year, month) -> revenue
    ret_month = defaultdict(lambda: {"orders": 0, "returned": 0})  # (y,m)
    delivery_by_cat = defaultdict(lambda: {"sum": 0.0, "n": 0})

    with open(os.path.join(DATASET, "orders.csv"), newline="", encoding="utf-8") as fh:
        for row in csv.DictReader(fh):
            total = f(row["total_amount_usd"])
            yr = i(row["year"])
            mo = i(row["month"])
            returned = i(row["returned"])

            total_revenue += total
            n_orders += 1
            n_returned += returned
            n_repeat += i(row["is_repeat_customer"])

            rating = row.get("customer_rating", "")
            if rating not in ("", "(null)", None):
                rating_sum += f(rating)
                rating_n += 1

            c = cat[row["category"]]
            c["revenue"] += total
            c["orders"] += 1
            c["returned"] += returned

            p = pay[row["payment_method"]]
            p["revenue"] += total
            p["orders"] += 1

            d = dev[row["device_used"]]
            d["revenue"] += total
            d["orders"] += 1

            status[row["order_status"]] += 1

            w = dow[row["day_of_week"]]
            w["revenue"] += total
            w["orders"] += 1

            q = quarter[row["quarter"]]
            q["revenue"] += total
            q["orders"] += 1

            y = year[str(yr)]
            y["revenue"] += total
            y["orders"] += 1

            season[(yr, mo)] += total

            rm = ret_month[(yr, mo)]
            rm["orders"] += 1
            rm["returned"] += returned

            dc = delivery_by_cat[row["category"]]
            dc["sum"] += f(row["delivery_days"])
            dc["n"] += 1

    by_category = sorted(
        ({"name": k,
          "revenue": r2(v["revenue"]),
          "orders": v["orders"],
          "aov": r2(v["revenue"] / v["orders"]) if v["orders"] else 0,
          "return_rate": r2(100 * v["returned"] / v["orders"]) if v["orders"] else 0}
         for k, v in cat.items()),
        key=lambda x: -x["revenue"])

    def simple(dd):
        return sorted(
            ({"name": k, "revenue": r2(v["revenue"]), "orders": v["orders"]}
             for k, v in dd.items()),
            key=lambda x: -x["revenue"])

    by_dow = sorted(
        ({"name": k, "revenue": r2(v["revenue"]), "orders": v["orders"]}
         for k, v in dow.items()),
        key=lambda x: DOW_ORDER.index(x["name"]) if x["name"] in DOW_ORDER else 99)

    by_status = sorted(
        ({"name": k, "orders": v} for k, v in status.items()),
        key=lambda x: -x["orders"])

    by_year = sorted(
        ({"name": k, "revenue": r2(v["revenue"]), "orders": v["orders"]}
         for k, v in year.items()),
        key=lambda x: x["name"])

    by_quarter = sorted(
        ({"name": k, "revenue": r2(v["revenue"]), "orders": v["orders"]}
         for k, v in quarter.items()),
        key=lambda x: x["name"])

    # seasonality heatmap: list per year of 12 monthly values
    years_sorted = sorted({y for (y, m) in season})
    seasonality = []
    for yr in years_sorted:
        seasonality.append({
            "year": yr,
            "months": [r2(season.get((yr, m + 1), 0.0)) for m in range(12)],
        })

    return_by_month = []
    for (yr, mo) in sorted(ret_month):
        v = ret_month[(yr, mo)]
        return_by_month.append({
            "label": f"{MONTH_NAMES[mo - 1]} {yr}",
            "return_rate": r2(100 * v["returned"] / v["orders"]) if v["orders"] else 0,
        })

    delivery_by_category = sorted(
        ({"name": k, "avg_delivery_days": r2(v["sum"] / v["n"]) if v["n"] else 0}
         for k, v in delivery_by_cat.items()),
        key=lambda x: -x["avg_delivery_days"])

    kpis = {
        "total_revenue": r2(total_revenue),
        "total_orders": n_orders,
        "aov": r2(total_revenue / n_orders) if n_orders else 0,
        "return_rate": r2(100 * n_returned / n_orders) if n_orders else 0,
        "repeat_rate": r2(100 * n_repeat / n_orders) if n_orders else 0,
        "avg_rating": r2(rating_sum / rating_n) if rating_n else 0,
    }

    return {
        "kpis": kpis,
        "by_category": by_category,
        "by_payment": simple(pay),
        "by_device": simple(dev),
        "by_status": by_status,
        "by_dow": by_dow,
        "by_quarter": by_quarter,
        "by_year": by_year,
        "seasonality": seasonality,
        "return_by_month": return_by_month,
        "delivery_by_category": delivery_by_category,
    }


# ----------------------------------------------------------- monthly_revenue.csv
def aggregate_monthly():
    rows = []
    with open(os.path.join(DATASET, "monthly_revenue.csv"), newline="", encoding="utf-8") as fh:
        for row in csv.DictReader(fh):
            yr, mo = i(row["year"]), i(row["month"])
            rows.append({
                "label": f"{MONTH_NAMES[mo - 1]} {yr}",
                "year": yr,
                "month": mo,
                "orders": i(row["orders"]),
                "revenue": r2(f(row["revenue_usd"])),
                "aov": r2(f(row["avg_order_value"])),
                "discount": r2(f(row["avg_discount_pct"])),
                "unique_customers": i(row["unique_customers"]),
                "new_customers": i(row["new_customers"]),
            })
    rows.sort(key=lambda x: (x["year"], x["month"]))
    return rows


# ----------------------------------------------------------------- customers.csv
def bucket(value, edges, labels):
    for idx, edge in enumerate(edges):
        if value < edge:
            return labels[idx]
    return labels[-1]


def aggregate_customers():
    total = 0
    n_churned = 0
    n_newsletter = 0

    gender = defaultdict(int)
    country = defaultdict(lambda: {"customers": 0, "spend": 0.0})
    tier = defaultdict(lambda: {"customers": 0, "spend": 0.0, "churned": 0})
    channel = defaultdict(lambda: {"customers": 0, "spend": 0.0, "churned": 0})

    age_labels = ["<25", "25-34", "35-44", "45-54", "55-64", "65+"]
    age_edges = [25, 35, 45, 55, 65]
    age_hist = defaultdict(int)

    rec_labels = ["0-30", "31-60", "61-90", "91-180", "180+"]
    rec_edges = [31, 61, 91, 181]
    rec_hist = defaultdict(int)

    freq_labels = ["1", "2-3", "4-6", "7-10", "11+"]
    freq_edges = [2, 4, 7, 11]
    freq_hist = defaultdict(int)

    ltv_labels = ["<250", "250-500", "500-1k", "1k-2k", "2k+"]
    ltv_edges = [250, 500, 1000, 2000]
    ltv_hist = defaultdict(int)

    with open(os.path.join(DATASET, "customers.csv"), newline="", encoding="utf-8") as fh:
        for row in csv.DictReader(fh):
            total += 1
            churned = i(row["churned"])
            n_churned += churned
            n_newsletter += i(row["newsletter_subscribed"])
            spend = f(row["total_spend_usd"])

            gender[row["gender"]] += 1

            co = country[row["country"]]
            co["customers"] += 1
            co["spend"] += spend

            t = tier[row["membership_tier"]]
            t["customers"] += 1
            t["spend"] += spend
            t["churned"] += churned

            ch = channel[row["acquisition_channel"]]
            ch["customers"] += 1
            ch["spend"] += spend
            ch["churned"] += churned

            age_hist[bucket(i(row["age"]), age_edges, age_labels)] += 1
            rec_hist[bucket(i(row["days_since_last_purchase"]), rec_edges, rec_labels)] += 1
            freq_hist[bucket(i(row["total_orders"]), freq_edges, freq_labels)] += 1
            ltv_hist[bucket(spend, ltv_edges, ltv_labels)] += 1

    top_countries = sorted(
        ({"name": k, "customers": v["customers"], "spend": r2(v["spend"])}
         for k, v in country.items()),
        key=lambda x: -x["customers"])[:12]

    tier_order = ["Free", "Silver", "Gold", "Platinum"]
    by_tier = sorted(
        ({"name": k,
          "customers": v["customers"],
          "avg_spend": r2(v["spend"] / v["customers"]) if v["customers"] else 0,
          "churn_rate": r2(100 * v["churned"] / v["customers"]) if v["customers"] else 0}
         for k, v in tier.items()),
        key=lambda x: tier_order.index(x["name"]) if x["name"] in tier_order else 99)

    by_channel = sorted(
        ({"name": k,
          "customers": v["customers"],
          "avg_spend": r2(v["spend"] / v["customers"]) if v["customers"] else 0,
          "churn_rate": r2(100 * v["churned"] / v["customers"]) if v["customers"] else 0}
         for k, v in channel.items()),
        key=lambda x: -x["customers"])

    def hist(d, labels):
        return [{"name": lbl, "count": d.get(lbl, 0)} for lbl in labels]

    return {
        "total": total,
        "churn_rate": r2(100 * n_churned / total) if total else 0,
        "newsletter_rate": r2(100 * n_newsletter / total) if total else 0,
        "gender": sorted(({"name": k, "count": v} for k, v in gender.items()),
                         key=lambda x: -x["count"]),
        "top_countries": top_countries,
        "by_tier": by_tier,
        "by_channel": by_channel,
        "age_hist": hist(age_hist, age_labels),
        "recency_hist": hist(rec_hist, rec_labels),
        "frequency_hist": hist(freq_hist, freq_labels),
        "ltv_hist": hist(ltv_hist, ltv_labels),
    }


# ------------------------------------------------------------- product_summary.csv
def aggregate_products():
    products = []
    cat_price = defaultdict(lambda: {"sum": 0.0, "n": 0})
    with open(os.path.join(DATASET, "product_summary.csv"), newline="", encoding="utf-8") as fh:
        for row in csv.DictReader(fh):
            p = {
                "category": row["category"],
                "name": row["product_name"],
                "orders": i(row["total_orders"]),
                "revenue": r2(f(row["total_revenue_usd"])),
                "avg_price": r2(f(row["avg_price"])),
                "avg_rating": r2(f(row["avg_rating"])),
                "return_rate": r2(f(row["return_rate"])),
                "avg_discount": r2(f(row["avg_discount_pct"])),
                "avg_delivery_days": r2(f(row["avg_delivery_days"])),
            }
            products.append(p)
            cp = cat_price[row["category"]]
            cp["sum"] += f(row["avg_price"])
            cp["n"] += 1

    top_revenue = sorted(products, key=lambda x: -x["revenue"])[:15]
    worst_returns = sorted(products, key=lambda x: -x["return_rate"])[:12]
    scatter = [{"x": p["avg_rating"], "y": p["return_rate"],
                "z": p["orders"], "name": p["name"], "category": p["category"]}
               for p in products]
    avg_price_by_cat = sorted(
        ({"name": k, "avg_price": r2(v["sum"] / v["n"]) if v["n"] else 0}
         for k, v in cat_price.items()),
        key=lambda x: -x["avg_price"])

    return {
        "top_revenue": top_revenue,
        "worst_returns": worst_returns,
        "scatter": scatter,
        "avg_price_by_cat": avg_price_by_cat,
    }


def main():
    orders = aggregate_orders()
    data = {
        "generated_from": "dataset/*.csv",
        "kpis": orders["kpis"],
        "sales": {
            "by_category": orders["by_category"],
            "by_payment": orders["by_payment"],
            "by_device": orders["by_device"],
            "by_status": orders["by_status"],
            "by_dow": orders["by_dow"],
            "by_quarter": orders["by_quarter"],
            "by_year": orders["by_year"],
            "seasonality": orders["seasonality"],
            "return_by_month": orders["return_by_month"],
            "delivery_by_category": orders["delivery_by_category"],
        },
        "monthly": aggregate_monthly(),
        "customers": aggregate_customers(),
        "products": aggregate_products(),
    }

    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w", encoding="utf-8") as fh:
        json.dump(data, fh, ensure_ascii=False, separators=(",", ":"))

    size_kb = os.path.getsize(OUT) / 1024
    cat_sum = sum(c["revenue"] for c in orders["by_category"])
    print(f"Wrote {OUT} ({size_kb:.1f} KB)")
    print(f"  total_revenue (kpi):     {orders['kpis']['total_revenue']:,.2f}")
    print(f"  sum(by_category.revenue):{cat_sum:,.2f}")
    print(f"  total_orders:            {orders['kpis']['total_orders']:,}")
    print(f"  customers:               {data['customers']['total']:,}")
    print(f"  products:                {len(data['products']['top_revenue'])} top / scatter {len(data['products']['scatter'])}")


if __name__ == "__main__":
    main()
