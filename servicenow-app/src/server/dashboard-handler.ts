import { buildKpis } from './aggregations/kpis.ts'
import { buildSales } from './aggregations/sales.ts'
import { buildMonthly } from './aggregations/monthly.ts'
import { buildCustomers } from './aggregations/customers.ts'
import { buildProducts } from './aggregations/products.ts'
import { T, countWhere } from './aggregations/util.ts'

// DIAGNÓSTICO TEMPORÁRIO: contagens de boolean por `=true` vs `=1` e painéis vazios.
function buildDiag(body: any) {
    const bools: Record<string, { eqTrue: number; eq1: number }> = {}
    const pairs: Array<[string, string]> = [
        ['order.returned', T.order + '|returned'],
        ['order.is_repeat_customer', T.order + '|is_repeat_customer'],
        ['customer.churned', T.customer + '|churned'],
        ['customer.newsletter_subscribed', T.customer + '|newsletter_subscribed'],
    ]
    pairs.forEach(([label, spec]) => {
        const parts = spec.split('|')
        const table = parts[0]
        const field = parts[1]
        bools[label] = {
            eqTrue: countWhere(table, field + '=true'),
            eq1: countWhere(table, field + '=1'),
        }
    })
    const counts = {
        order: countWhere(T.order),
        customer: countWhere(T.customer),
        product: countWhere(T.product),
        monthly: countWhere(T.monthly),
    }
    // procura arrays vazios nas seções
    const empty: string[] = []
    const sections = ['sales', 'customers', 'products', 'monthly']
    sections.forEach((sec) => {
        const obj = body[sec]
        if (Array.isArray(obj) && obj.length === 0) empty.push(sec)
        else if (obj && typeof obj === 'object') {
            Object.keys(obj).forEach((k) => {
                if (Array.isArray(obj[k]) && obj[k].length === 0) empty.push(sec + '.' + k)
            })
        }
    })
    return { counts, bools, empty_panels: empty }
}

// Roda um builder isolado: se falhar, registra o erro em `errors` (com stack)
// em vez de deixar a exceção derrubar o request inteiro com 500 opaco.
function safe<T>(name: string, fn: () => T, errors: Record<string, string>): T | null {
    try {
        return fn()
    } catch (e: any) {
        errors[name] = (e && (e.message || String(e))) + (e && e.stack ? ' | ' + e.stack : '')
        return null
    }
}

// Handler do Scripted REST: agrega ao vivo as 4 tabelas e devolve o JSON
// no MESMO formato consumido pelos dashboards (espelha o data.json original).
export function getDashboardData(_request: unknown, response: any) {
    const errors: Record<string, string> = {}
    const body = {
        generated_from: 'x_snc_dashboard_se tables (live aggregation)',
        kpis: safe('kpis', buildKpis, errors),
        sales: safe('sales', buildSales, errors),
        monthly: safe('monthly', buildMonthly, errors),
        customers: safe('customers', buildCustomers, errors),
        products: safe('products', buildProducts, errors),
        _errors: errors,
        _diag: null as any,
    }
    body._diag = safe('diag', () => buildDiag(body), errors)
    response.setStatus(200)
    response.setContentType('application/json')
    const writer = response.getStreamWriter()
    writer.writeString(JSON.stringify(body))
}
