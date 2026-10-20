// Contrato de dados — espelha exatamente o payload da REST API
// GET /api/x_snc_dashboard_se/dashboard/data (e o data.json original).

export interface Product {
    category: string
    name: string
    orders: number
    revenue: number
    avg_price: number
    avg_rating: number
    return_rate: number
    avg_discount: number
    avg_delivery_days: number
}

export interface DashboardData {
    generated_from: string
    kpis: {
        total_revenue: number
        total_orders: number
        aov: number
        return_rate: number
        repeat_rate: number
        avg_rating: number
    }
    sales: {
        by_category: { name: string; revenue: number; orders: number; aov: number; return_rate: number }[]
        by_payment: { name: string; revenue: number; orders: number }[]
        by_device: { name: string; revenue: number; orders: number }[]
        by_status: { name: string; orders: number }[]
        by_dow: { name: string; revenue: number; orders: number }[]
        by_quarter: { name: string; revenue: number; orders: number }[]
        by_year: { name: string; revenue: number; orders: number }[]
        seasonality: { year: number; months: number[] }[]
        return_by_month: { label: string; return_rate: number }[]
        delivery_by_category: { name: string; avg_delivery_days: number }[]
    }
    monthly: {
        label: string
        year: number
        month: number
        orders: number
        revenue: number
        aov: number
        discount: number
        unique_customers: number
        new_customers: number
    }[]
    customers: {
        total: number
        churn_rate: number
        newsletter_rate: number
        gender: { name: string; count: number }[]
        top_countries: { name: string; customers: number; spend: number }[]
        by_tier: { name: string; customers: number; avg_spend: number; churn_rate: number }[]
        by_channel: { name: string; customers: number; avg_spend: number; churn_rate: number }[]
        age_hist: { name: string; count: number }[]
        recency_hist: { name: string; count: number }[]
        frequency_hist: { name: string; count: number }[]
        ltv_hist: { name: string; count: number }[]
    }
    products: {
        top_revenue: Product[]
        worst_returns: Product[]
        scatter: { x: number; y: number; z: number; name: string; category: string }[]
        avg_price_by_cat: { name: string; avg_price: number }[]
    }
}

export type TabKey = 'overview' | 'sales' | 'customers' | 'products'
export const TABS: TabKey[] = ['overview', 'sales', 'customers', 'products']
