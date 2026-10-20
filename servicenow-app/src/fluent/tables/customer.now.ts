import { Table, StringColumn, IntegerColumn, DecimalColumn, DateColumn, BooleanColumn } from '@servicenow/sdk/core'

// Customers (8k) — fonte: dataset/customers.csv
export const x_snc_dashboard_se_customer = Table({
    name: 'x_snc_dashboard_se_customer',
    label: 'Customer',
    display: 'customer_id',
    allowWebServiceAccess: true,
    schema: {
        customer_id: StringColumn({ label: 'Customer ID', maxLength: 40 }),
        country: StringColumn({ label: 'Country', maxLength: 60 }),
        age: IntegerColumn({ label: 'Age' }),
        gender: StringColumn({
            label: 'Gender',
            choices: { Female: 'Female', Male: 'Male', Other: 'Other' },
        }),
        membership_tier: StringColumn({
            label: 'Membership Tier',
            choices: { Free: 'Free', Silver: 'Silver', Gold: 'Gold', Platinum: 'Platinum' },
        }),
        registration_date: DateColumn({ label: 'Registration Date' }),
        total_orders: IntegerColumn({ label: 'Total Orders' }),
        total_spend_usd: DecimalColumn({ label: 'Total Spend (USD)' }),
        avg_order_value_usd: DecimalColumn({ label: 'Avg Order Value (USD)' }),
        days_since_last_purchase: IntegerColumn({ label: 'Days Since Last Purchase' }),
        preferred_category: StringColumn({ label: 'Preferred Category', maxLength: 60 }),
        preferred_device: StringColumn({
            label: 'Preferred Device',
            choices: { Mobile: 'Mobile', Desktop: 'Desktop', Tablet: 'Tablet' },
        }),
        preferred_payment_method: StringColumn({ label: 'Preferred Payment Method', maxLength: 60 }),
        acquisition_channel: StringColumn({ label: 'Acquisition Channel', maxLength: 60 }),
        reviews_given: IntegerColumn({ label: 'Reviews Given' }),
        avg_review_score: DecimalColumn({ label: 'Avg Review Score' }),
        returns_made: IntegerColumn({ label: 'Returns Made' }),
        wishlist_items: IntegerColumn({ label: 'Wishlist Items' }),
        newsletter_subscribed: BooleanColumn({ label: 'Newsletter Subscribed' }),
        churned: BooleanColumn({ label: 'Churned' }),
    },
})
