import { GlideAggregate, GlideRecord } from '@servicenow/glide'

// Nomes das tabelas do app
export const T = {
    order: 'x_snc_dashboard_se_order',
    customer: 'x_snc_dashboard_se_customer',
    product: 'x_snc_dashboard_se_product_summary',
    monthly: 'x_snc_dashboard_se_monthly_revenue',
}

export function n(v: string | number): number {
    const f = typeof v === 'number' ? v : parseFloat(v)
    return isFinite(f) ? f : 0
}

export function round(v: number, d = 2): number {
    const m = Math.pow(10, d)
    return Math.round(v * m) / m
}

export interface GroupRow {
    key: string
    count: number
    sum: Record<string, number>
    avg: Record<string, number>
}

// Totais sobre a tabela inteira (sem agrupar)
export function totals(table: string, sums: string[] = [], avgs: string[] = [], where?: string) {
    const ga = new GlideAggregate(table) as any
    ga.addAggregate('COUNT')
    sums.forEach((s) => ga.addAggregate('SUM', s))
    avgs.forEach((a) => ga.addAggregate('AVG', a))
    if (where) ga.addEncodedQuery(where)
    ga.query()
    const r = { count: 0, sum: {} as Record<string, number>, avg: {} as Record<string, number> }
    if (ga.next()) {
        r.count = n(ga.getAggregate('COUNT'))
        sums.forEach((s) => (r.sum[s] = n(ga.getAggregate('SUM', s))))
        avgs.forEach((a) => (r.avg[a] = n(ga.getAggregate('AVG', a))))
    }
    return r
}

// SUM de um único campo (agregado isolado — evita o bug de misturar COUNT/SUM/AVG sem groupBy)
export function sumField(table: string, field: string, where?: string): number {
    const ga = new GlideAggregate(table) as any
    ga.addAggregate('SUM', field)
    if (where) ga.addEncodedQuery(where)
    ga.query()
    return ga.next() ? n(ga.getAggregate('SUM', field)) : 0
}

// AVG de um único campo (isolado)
export function avgField(table: string, field: string, where?: string): number {
    const ga = new GlideAggregate(table) as any
    ga.addAggregate('AVG', field)
    if (where) ga.addEncodedQuery(where)
    ga.query()
    return ga.next() ? n(ga.getAggregate('AVG', field)) : 0
}

// Contagem de linhas que batem a query
export function countWhere(table: string, where?: string): number {
    const ga = new GlideAggregate(table) as any
    ga.addAggregate('COUNT')
    if (where) ga.addEncodedQuery(where)
    ga.query()
    return ga.next() ? n(ga.getAggregate('COUNT')) : 0
}

// Agrupa por um campo
export function groupBy(
    table: string,
    field: string,
    opts: { sums?: string[]; avgs?: string[]; where?: string } = {},
): GroupRow[] {
    const { sums = [], avgs = [], where } = opts
    const ga = new GlideAggregate(table) as any
    ga.addAggregate('COUNT')
    sums.forEach((s) => ga.addAggregate('SUM', s))
    avgs.forEach((a) => ga.addAggregate('AVG', a))
    ga.groupBy(field)
    if (where) ga.addEncodedQuery(where)
    ga.query()
    const out: GroupRow[] = []
    while (ga.next()) {
        const sum: Record<string, number> = {}
        const avg: Record<string, number> = {}
        sums.forEach((s) => (sum[s] = n(ga.getAggregate('SUM', s))))
        avgs.forEach((a) => (avg[a] = n(ga.getAggregate('AVG', a))))
        out.push({ key: ga.getValue(field) || '', count: n(ga.getAggregate('COUNT')), sum, avg })
    }
    return out
}

// Agrupa por dois campos (ex.: year + month)
export function groupBy2(
    table: string,
    f1: string,
    f2: string,
    opts: { sums?: string[]; where?: string } = {},
): Array<{ k1: string; k2: string; count: number; sum: Record<string, number> }> {
    const { sums = [], where } = opts
    const ga = new GlideAggregate(table) as any
    ga.addAggregate('COUNT')
    sums.forEach((s) => ga.addAggregate('SUM', s))
    ga.groupBy(f1)
    ga.groupBy(f2)
    if (where) ga.addEncodedQuery(where)
    ga.query()
    const out: Array<{ k1: string; k2: string; count: number; sum: Record<string, number> }> = []
    while (ga.next()) {
        const sum: Record<string, number> = {}
        sums.forEach((s) => (sum[s] = n(ga.getAggregate('SUM', s))))
        out.push({ k1: ga.getValue(f1) || '', k2: ga.getValue(f2) || '', count: n(ga.getAggregate('COUNT')), sum })
    }
    return out
}

// Mapa key -> count
export function countMap(table: string, field: string, where?: string): Record<string, number> {
    const m: Record<string, number> = {}
    groupBy(table, field, { where }).forEach((r) => (m[r.key] = r.count))
    return m
}

export interface Bucket {
    name: string
    min?: number
    max?: number
}

// Histograma por faixas numéricas
export function buckets(table: string, field: string, bs: Bucket[]): Array<{ name: string; count: number }> {
    return bs.map((b) => {
        let q = ''
        if (b.min != null) q += `${field}>=${b.min}`
        if (b.max != null) q += `${q ? '^' : ''}${field}<=${b.max}`
        return { name: b.name, count: countWhere(table, q) }
    })
}

// Lê registros (com order/limit/where) retornando objetos simples
export function readAll(
    table: string,
    fields: string[],
    opts: { orderDesc?: string; order?: string; where?: string; limit?: number } = {},
): Array<Record<string, string>> {
    const gr = new GlideRecord(table) as any
    if (opts.where) gr.addEncodedQuery(opts.where)
    if (opts.orderDesc) gr.orderByDesc(opts.orderDesc)
    if (opts.order) gr.orderBy(opts.order)
    if (opts.limit) gr.setLimit(opts.limit)
    gr.query()
    const out: Array<Record<string, string>> = []
    while (gr.next()) {
        const o: Record<string, string> = {}
        fields.forEach((f) => (o[f] = gr.getValue(f) || ''))
        out.push(o)
    }
    return out
}
