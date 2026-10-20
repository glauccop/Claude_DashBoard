import { T, groupBy, countWhere, countMap, buckets, round } from './util.ts'

const TIERS = ['Free', 'Silver', 'Gold', 'Platinum']

export function buildCustomers() {
    const total = countWhere(T.customer)
    const churn = countWhere(T.customer, 'churned=true')
    const newsletter = countWhere(T.customer, 'newsletter_subscribed=true')

    const gender = groupBy(T.customer, 'gender').map((r) => ({ name: r.key, count: r.count }))

    const top_countries = groupBy(T.customer, 'country', { sums: ['total_spend_usd'] })
        .map((r) => ({ name: r.key, customers: r.count, spend: round(r.sum.total_spend_usd) }))
        .sort((a, b) => b.customers - a.customers)
        .slice(0, 12)

    const tierChurn = countMap(T.customer, 'membership_tier', 'churned=true')
    const by_tier = groupBy(T.customer, 'membership_tier', { avgs: ['total_spend_usd'] })
        .map((r) => ({
            name: r.key,
            customers: r.count,
            avg_spend: round(r.avg.total_spend_usd),
            churn_rate: round(r.count ? ((tierChurn[r.key] || 0) / r.count) * 100 : 0),
        }))
        .sort((a, b) => TIERS.indexOf(a.name) - TIERS.indexOf(b.name))

    const chanChurn = countMap(T.customer, 'acquisition_channel', 'churned=true')
    const by_channel = groupBy(T.customer, 'acquisition_channel', { avgs: ['total_spend_usd'] })
        .map((r) => ({
            name: r.key,
            customers: r.count,
            avg_spend: round(r.avg.total_spend_usd),
            churn_rate: round(r.count ? ((chanChurn[r.key] || 0) / r.count) * 100 : 0),
        }))
        .sort((a, b) => b.customers - a.customers)

    const age_hist = buckets(T.customer, 'age', [
        { name: '18-24', min: 18, max: 24 },
        { name: '25-29', min: 25, max: 29 },
        { name: '30-34', min: 30, max: 34 },
        { name: '35-39', min: 35, max: 39 },
        { name: '40-44', min: 40, max: 44 },
        { name: '45+', min: 45 },
    ])

    const recency_hist = buckets(T.customer, 'days_since_last_purchase', [
        { name: '0-30', min: 0, max: 30 },
        { name: '31-60', min: 31, max: 60 },
        { name: '61-90', min: 61, max: 90 },
        { name: '91-120', min: 91, max: 120 },
        { name: '120+', min: 121 },
    ])

    const frequency_hist = buckets(T.customer, 'total_orders', [
        { name: '1-5', min: 1, max: 5 },
        { name: '6-10', min: 6, max: 10 },
        { name: '11-20', min: 11, max: 20 },
        { name: '21-40', min: 21, max: 40 },
        { name: '40+', min: 41 },
    ])

    const ltv_hist = buckets(T.customer, 'total_spend_usd', [
        { name: '$0-500', min: 0, max: 500 },
        { name: '$500-1.5k', min: 500, max: 1500 },
        { name: '$1.5k-3k', min: 1500, max: 3000 },
        { name: '$3k-6k', min: 3000, max: 6000 },
        { name: '$6k+', min: 6000 },
    ])

    return {
        total,
        churn_rate: round(total ? (churn / total) * 100 : 0),
        newsletter_rate: round(total ? (newsletter / total) * 100 : 0),
        gender,
        top_countries,
        by_tier,
        by_channel,
        age_hist,
        recency_hist,
        frequency_hist,
        ltv_hist,
    }
}
