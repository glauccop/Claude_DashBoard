import { ApplicationMenu, Record } from '@servicenow/sdk/core'

// Menu de topo no navegador
const menu = ApplicationMenu({
    $id: Now.ID['app_menu'],
    title: 'Dashboard ServiceNow',
    hint: 'E-commerce analytics dashboards',
    description: 'Portal e três dashboards (Aurora, O Balanço, NEXUS) sobre o dataset de e-commerce.',
    roles: ['admin'],
    active: true,
    order: 100,
})

// Portal + dashboards
Record({
    $id: Now.ID['mod_portal'],
    table: 'sys_app_module',
    data: { title: 'Portal', application: menu, link_type: 'DIRECT', query: 'x_snc_dashboard_se_portal.do', roles: ['admin'], active: true, order: 100 },
})
Record({
    $id: Now.ID['mod_sep_dash'],
    table: 'sys_app_module',
    data: { title: 'Dashboards', application: menu, link_type: 'SEPARATOR', roles: ['admin'], active: true, order: 150 },
})
Record({
    $id: Now.ID['mod_aurora'],
    table: 'sys_app_module',
    data: { title: 'Aurora', application: menu, link_type: 'DIRECT', query: 'x_snc_dashboard_se_aurora.do', roles: ['admin'], active: true, order: 200 },
})
Record({
    $id: Now.ID['mod_balanco'],
    table: 'sys_app_module',
    data: { title: 'O Balanço', application: menu, link_type: 'DIRECT', query: 'x_snc_dashboard_se_balanco.do', roles: ['admin'], active: true, order: 300 },
})
Record({
    $id: Now.ID['mod_nexus'],
    table: 'sys_app_module',
    data: { title: 'NEXUS // Terminal', application: menu, link_type: 'DIRECT', query: 'x_snc_dashboard_se_nexus.do', roles: ['admin'], active: true, order: 400 },
})

// Tabelas de dados
Record({
    $id: Now.ID['mod_sep_data'],
    table: 'sys_app_module',
    data: { title: 'Data', application: menu, link_type: 'SEPARATOR', roles: ['admin'], active: true, order: 450 },
})
Record({
    $id: Now.ID['mod_orders'],
    table: 'sys_app_module',
    data: { title: 'Orders', application: menu, link_type: 'LIST', name: 'x_snc_dashboard_se_order', roles: ['admin'], active: true, order: 500 },
})
Record({
    $id: Now.ID['mod_customers'],
    table: 'sys_app_module',
    data: { title: 'Customers', application: menu, link_type: 'LIST', name: 'x_snc_dashboard_se_customer', roles: ['admin'], active: true, order: 600 },
})
Record({
    $id: Now.ID['mod_products'],
    table: 'sys_app_module',
    data: { title: 'Product Summary', application: menu, link_type: 'LIST', name: 'x_snc_dashboard_se_product_summary', roles: ['admin'], active: true, order: 700 },
})
Record({
    $id: Now.ID['mod_monthly'],
    table: 'sys_app_module',
    data: { title: 'Monthly Revenue', application: menu, link_type: 'LIST', name: 'x_snc_dashboard_se_monthly_revenue', roles: ['admin'], active: true, order: 800 },
})
