# Dashboard ServiceNow

A scoped application (`x_snc_dashboard_se`) built with the **Now SDK** that delivers a rich sales-analytics dashboard running natively inside a ServiceNow instance. Data is stored in four custom tables and aggregated in real time by a Scripted REST API consumed by React-based UI Pages.

---

## Overview

| Layer | Technology |
|---|---|
| SDK | `@servicenow/sdk` 4.7.2 |
| Frontend | React 18 + TypeScript 5.5 |
| Charts | Apache ECharts 5 · ApexCharts 3 |
| Design system | `@servicenow/react-components` (Aurora) |
| Server logic | TypeScript compiled by Now SDK (runs as GlideScript) |

The app exposes four dashboard **themes** (UI Pages), each consuming the same REST endpoint:

| Theme | Description |
|---|---|
| **Aurora** | Main dashboard — 4 tabs: Overview, Sales, Customers, Products |
| **Balanço** | Alternative layout using ECharts |
| **Nexus** | ApexCharts-based dark theme |
| **Portal** | Lightweight portal preview |

---

## Project structure

```
src/
├── client/
│   ├── aurora/          # Main dashboard (React + Aurora components)
│   │   └── components/  # KpiCard, VBars, HBars, Donut, LineArea, Scatter, Heatmap, Table…
│   ├── balanco/         # ECharts theme
│   ├── nexus/           # ApexCharts theme
│   ├── portal/          # Portal theme
│   └── shared/
│       ├── types.ts     # DashboardData contract (mirrors REST API payload)
│       └── data.ts      # Data-fetching helpers
├── fluent/
│   ├── tables/          # Table definitions (order, customer, product_summary, monthly_revenue)
│   ├── ui-pages/        # UI Page registrations (aurora, balanco, nexus, portal)
│   ├── rest/            # Scripted REST API definition
│   └── nav/             # Navigation module
└── server/
    ├── dashboard-handler.ts   # Main REST handler — orchestrates all aggregations
    └── aggregations/          # kpis · sales · monthly · customers · products · util
scripts/
└── upload-data.mjs     # CSV → ServiceNow Table API uploader
```

---

## REST API

```
GET /api/x_snc_dashboard_se/dashboard/data
```

Requires authentication (any non-guest user). Returns a single JSON object:

```jsonc
{
  "kpis":      { "total_revenue", "total_orders", "aov", "return_rate", "repeat_rate", "avg_rating" },
  "sales":     { "by_category", "by_payment", "by_device", "by_status", "by_dow", "by_quarter", … },
  "monthly":   [ { "label", "year", "month", "orders", "revenue", "aov", … } ],
  "customers": { "total", "churn_rate", "gender", "top_countries", "by_tier", "age_hist", … },
  "products":  { "top_revenue", "worst_returns", "scatter", "avg_price_by_cat" }
}
```

---

## Data model

Four custom tables are created in the instance by the SDK:

| Table | Label | ~Rows | Key fields |
|---|---|---|---|
| `x_snc_dashboard_se_order` | Order | 25 k | order_id, category, total_amount_usd, payment_method, returned, is_repeat_customer … |
| `x_snc_dashboard_se_customer` | Customer | — | tier, channel, country, churned, newsletter_subscribed, ltv … |
| `x_snc_dashboard_se_product_summary` | Product Summary | — | category, name, revenue, return_rate, avg_rating … |
| `x_snc_dashboard_se_monthly_revenue` | Monthly Revenue | — | year, month, revenue, orders, new_customers … |

---

## Getting started

### Prerequisites

- Node.js ≥ 18
- Access to a ServiceNow instance (PDI or nowdemo)
- Authenticate once: `npx now-sdk auth --add https://<inst>.service-now.com --type basic --alias <alias>` then `npx now-sdk auth --use <alias>` (see the root `README.md`, "Autenticar na sua instância")
- Now SDK CLI (installed as a dev dependency)

### Install dependencies

```bash
npm install
```

### Build the app

Compiles TypeScript and bundles all UI Pages:

```bash
npm run build
```

### Deploy to the instance

Installs the scoped app and all its artifacts into the configured instance:

```bash
npm run deploy
```

The target is the instance of your default `now-sdk auth` alias (`now.config.json` only defines the scope `x_snc_dashboard_se`).

---

## Uploading data

The script `scripts/upload-data.mjs` reads CSV files from a local dataset folder and inserts records into the custom tables via the ServiceNow Table API, in batches of 9 000 with 25 concurrent workers.

### Authentication

Provide credentials in **one** of these ways (checked in this order):

1. **Environment variable — Bearer token**
   ```bash
   export SN_TOKEN=your_bearer_token
   ```

2. **Environment variables — Basic auth**
   ```bash
   export SN_USER=admin
   export SN_PASS=your_password
   ```

3. **Credential file** — create `.sn-upload.json` in the project root (already gitignored):
   ```json
   { "user": "admin", "pass": "your_password" }
   ```
   or with a token:
   ```json
   { "token": "your_bearer_token" }
   ```

### Usage

```bash
# Upload all four tables
node scripts/upload-data.mjs

# Upload a specific table
node scripts/upload-data.mjs order
node scripts/upload-data.mjs customer
node scripts/upload-data.mjs product_summary
node scripts/upload-data.mjs monthly_revenue

# Dry run — parse CSV and print a sample without sending requests
node scripts/upload-data.mjs --dry

# Check current record counts in the instance
node scripts/upload-data.mjs --check

# Wipe a table before re-uploading
node scripts/upload-data.mjs order --wipe
```

> The script reads the CSVs from `../dataset/` at the repo root (resolved relative to the script) and targets `SN_INSTANCE` (default `https://nowdemo.service-now.com`). Alternatively, import the `.xlsx` files in `../dataset/dataset-servicenow/` via Import Sets.

---

## Scripts reference

| Command | Description |
|---|---|
| `npm run build` | Compile and bundle the app |
| `npm run deploy` | Build + install into the instance |
| `npm run transform` | Run Now SDK transform step |
| `npm run types` | Regenerate SDK type dependencies |

---

## Security notes

- **Never commit credentials.** The files `.sn-upload.json` and `get_data.sh` are listed in `.gitignore`.
- Use environment variables (`SN_TOKEN` / `SN_USER` + `SN_PASS`) in CI/CD pipelines.
- The REST endpoint ACL allows any authenticated (non-guest) user to read data.
