import { Table, StringColumn, IntegerColumn, DecimalColumn } from '@servicenow/sdk/core'

// Product summary (140) — fonte: dataset/product_summary.csv
export const x_snc_dashboard_se_product_summary = Table({
    name: 'x_snc_dashboard_se_product_summary',
    label: 'Product Summary',
    display: 'product_name',
    allowWebServiceAccess: true,
    schema: {
        category: StringColumn({ label: 'Category', maxLength: 60 }),
        product_name: StringColumn({ label: 'Product Name', maxLength: 120 }),
        total_orders: IntegerColumn({ label: 'Total Orders' }),
        total_revenue_usd: DecimalColumn({ label: 'Total Revenue (USD)' }),
        avg_price: DecimalColumn({ label: 'Avg Price' }),
        avg_rating: DecimalColumn({ label: 'Avg Rating' }),
        return_rate: DecimalColumn({ label: 'Return Rate' }),
        avg_discount_pct: DecimalColumn({ label: 'Avg Discount %' }),
        avg_delivery_days: DecimalColumn({ label: 'Avg Delivery Days' }),
    },
})
