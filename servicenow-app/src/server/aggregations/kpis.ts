import { T, groupBy, round } from './util.ts'

export function buildKpis() {
    // countWhere/sumField without groupBy are unreliable in this SN environment.
    // Use groupBy (same pattern as buildSales.by_year — confirmed reliable).
    const byYear = groupBy(T.order, 'year', {
        sums: ['total_amount_usd'],
        avgs: ['customer_rating'],
    })
    const orders = byYear.reduce((a, r) => a + r.count, 0)
    const revenue = byYear.reduce((a, r) => a + r.sum.total_amount_usd, 0)

    // Weighted average rating across all years
    const rawRating = orders > 0
        ? byYear.reduce((a, r) => a + r.avg.customer_rating * r.count, 0) / orders
        : 0
    // customer_rating imported via pt-BR UI: "3.96" → 396 (×100). Divide to restore.
    const avg_rating = round(rawRating > 5 ? rawRating / 100 : rawRating, 2)

    const retByYear = groupBy(T.order, 'year', { where: 'returned=true' })
    const returned = retByYear.reduce((a, r) => a + r.count, 0)

    const repByYear = groupBy(T.order, 'year', { where: 'is_repeat_customer=true' })
    const repeat = repByYear.reduce((a, r) => a + r.count, 0)

    return {
        total_revenue: round(revenue),
        total_orders: orders,
        aov: round(orders ? revenue / orders : 0),
        return_rate: round(orders ? (returned / orders) * 100 : 0),
        repeat_rate: round(orders ? (repeat / orders) * 100 : 0),
        avg_rating,
    }
}
