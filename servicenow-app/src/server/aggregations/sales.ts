import { T, groupBy, groupBy2, countMap, round, n } from './util.ts'

const DOW = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const pad = (m: string | number) => String(m).padStart(2, '0')
const MESES = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez']

export function buildSales() {
    const rev = (field: string) =>
        groupBy(T.order, field, { sums: ['total_amount_usd'] }).map((r) => ({
            name: r.key,
            revenue: round(r.sum.total_amount_usd),
            orders: r.count,
        }))

    // por categoria (com aov + return_rate)
    const catReturned = countMap(T.order, 'category', 'returned=true')
    const by_category = groupBy(T.order, 'category', { sums: ['total_amount_usd'] })
        .map((r) => ({
            name: r.key,
            revenue: round(r.sum.total_amount_usd),
            orders: r.count,
            aov: round(r.count ? r.sum.total_amount_usd / r.count : 0),
            return_rate: round(r.count ? ((catReturned[r.key] || 0) / r.count) * 100 : 0),
        }))
        .sort((a, b) => b.revenue - a.revenue)

    const by_payment = rev('payment_method').sort((a, b) => b.revenue - a.revenue)
    const by_device = rev('device_used')
    const by_status = groupBy(T.order, 'order_status').map((r) => ({ name: r.key, orders: r.count }))
    const by_dow = rev('day_of_week').sort((a, b) => DOW.indexOf(a.name) - DOW.indexOf(b.name))
    const by_quarter = rev('quarter').sort((a, b) => a.name.localeCompare(b.name))
    const by_year = rev('year').sort((a, b) => Number(a.name) - Number(b.name))

    // sazonalidade: receita por ano x mês
    const seasonMap: Record<string, number[]> = {}
    groupBy2(T.order, 'year', 'month', { sums: ['total_amount_usd'] }).forEach((r) => {
        const y = r.k1
        if (!seasonMap[y]) seasonMap[y] = new Array(12).fill(0)
        const mi = Number(r.k2) - 1
        if (mi >= 0 && mi < 12) seasonMap[y][mi] = round(r.sum.total_amount_usd)
    })
    const seasonality = Object.keys(seasonMap)
        .sort((a, b) => Number(a) - Number(b))
        .map((y) => ({ year: Number(y), months: seasonMap[y] }))

    // return rate por mês
    const ordByYm = groupBy2(T.order, 'year', 'month')
    const retByYm = groupBy2(T.order, 'year', 'month', { where: 'returned=true' })
    const retKey: Record<string, number> = {}
    retByYm.forEach((r) => (retKey[`${r.k1}-${r.k2}`] = r.count))
    const return_by_month = [...ordByYm]
        .sort((a, b) => n(a.k1) !== n(b.k1) ? n(a.k1) - n(b.k1) : n(a.k2) - n(b.k2))
        .map((r) => ({
            label: `${MESES[n(r.k2) - 1]} ${n(r.k1)}`,
            return_rate: round(r.count ? ((retKey[`${r.k1}-${r.k2}`] || 0) / r.count) * 100 : 0),
        }))

    const delivery_by_category = groupBy(T.order, 'category', { avgs: ['delivery_days'] })
        .map((r) => ({ name: r.key, avg_delivery_days: round(r.avg.delivery_days, 2) }))
        .sort((a, b) => b.avg_delivery_days - a.avg_delivery_days)

    return {
        by_category,
        by_payment,
        by_device,
        by_status,
        by_dow,
        by_quarter,
        by_year,
        seasonality,
        return_by_month,
        delivery_by_category,
    }
}
