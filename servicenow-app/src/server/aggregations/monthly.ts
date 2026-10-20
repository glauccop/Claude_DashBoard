import { T, groupBy2, readAll, n, round } from './util.ts'

const pad = (m: number) => String(m).padStart(2, '0')
const MESES = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez']

export function buildMonthly() {
    // Metadata (discount, unique/new customers) from the pre-aggregated monthly table.
    // Revenue and order count are re-computed from the live order table via groupBy2
    // (same pattern as buildSales.seasonality — confirmed reliable).
    const meta: Record<string, { discount: number; unique_customers: number; new_customers: number }> = {}
    readAll(T.monthly, ['year', 'month', 'avg_discount_pct', 'unique_customers', 'new_customers']).forEach((r) => {
        const key = `${n(r.year)}-${pad(n(r.month))}`
        meta[key] = {
            discount: round(n(r.avg_discount_pct), 2),
            unique_customers: n(r.unique_customers),
            new_customers: n(r.new_customers),
        }
    })

    return groupBy2(T.order, 'year', 'month', { sums: ['total_amount_usd'] })
        .map((r) => {
            const year = n(r.k1)
            const month = n(r.k2)
            const key = `${year}-${pad(month)}`
            const label = `${MESES[month - 1]} ${year}`
            const revenue = round(r.sum.total_amount_usd)
            const orders = r.count
            const m = meta[key] ?? { discount: 0, unique_customers: 0, new_customers: 0 }
            return {
                label,
                year,
                month,
                orders,
                revenue,
                aov: round(orders ? revenue / orders : 0),
                discount: m.discount,
                unique_customers: m.unique_customers,
                new_customers: m.new_customers,
            }
        })
        .sort((a, b) => a.year !== b.year ? a.year - b.year : a.month - b.month)
}
