import { Table, StringColumn, IntegerColumn, DecimalColumn } from '@servicenow/sdk/core'

// Monthly revenue (75) — fonte: dataset/monthly_revenue.csv
export const x_snc_dashboard_se_monthly_revenue = Table({
    name: 'x_snc_dashboard_se_monthly_revenue',
    label: 'Monthly Revenue',
    display: 'quarter',
    allowWebServiceAccess: true,
    schema: {
        year: IntegerColumn({ label: 'Year' }),
        month: IntegerColumn({ label: 'Month' }),
        quarter: StringColumn({ label: 'Quarter', maxLength: 4 }),
        orders: IntegerColumn({ label: 'Orders' }),
        revenue_usd: DecimalColumn({ label: 'Revenue (USD)' }),
        avg_order_value: DecimalColumn({ label: 'Avg Order Value' }),
        avg_discount_pct: DecimalColumn({ label: 'Avg Discount %' }),
        return_rate: DecimalColumn({ label: 'Return Rate' }),
        unique_customers: IntegerColumn({ label: 'Unique Customers' }),
        new_customers: IntegerColumn({ label: 'New Customers' }),
    },
})
