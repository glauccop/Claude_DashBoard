import { T, groupBy, readAll, n, round } from './util.ts'

const PFIELDS = [
    'category',
    'product_name',
    'total_orders',
    'total_revenue_usd',
    'avg_price',
    'avg_rating',
    'return_rate',
    'avg_discount_pct',
    'avg_delivery_days',
]

function mapProduct(r: Record<string, string>) {
    const rawRating = n(r.avg_rating)
    // avg_rating was imported via pt-BR locale UI: "3.96" → 396 (×100). Divide to restore.
    const avg_rating = round(rawRating > 5 ? rawRating / 100 : rawRating, 2)
    return {
        category: r.category,
        name: r.product_name,
        orders: n(r.total_orders),
        revenue: round(n(r.total_revenue_usd)),
        avg_price: round(n(r.avg_price)),
        avg_rating,
        return_rate: round(n(r.return_rate), 2),
        avg_discount: round(n(r.avg_discount_pct), 2),
        avg_delivery_days: round(n(r.avg_delivery_days), 2),
    }
}

export function buildProducts() {
    const top_revenue = readAll(T.product, PFIELDS, { orderDesc: 'total_revenue_usd', limit: 15 }).map(mapProduct)
    const worst_returns = readAll(T.product, PFIELDS, { orderDesc: 'return_rate', limit: 12 }).map(mapProduct)

    const scatter = readAll(T.product, PFIELDS).map((r) => {
        const rawRating = n(r.avg_rating)
        const x = round(rawRating > 5 ? rawRating / 100 : rawRating, 2)
        return {
            x,
            y: round(n(r.return_rate), 2),
            z: n(r.total_orders),
            name: r.product_name,
            category: r.category,
        }
    })

    const avg_price_by_cat = groupBy(T.order, 'category', { avgs: ['unit_price_usd'] })
        .map((r) => ({ name: r.key, avg_price: round(r.avg.unit_price_usd) }))
        .sort((a, b) => b.avg_price - a.avg_price)

    return { top_revenue, worst_returns, scatter, avg_price_by_cat }
}
