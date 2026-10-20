#!/usr/bin/env node
// Uploader de dados -> tabelas do app x_snc_dashboard_se (Table API), em lotes <= 9000.
// Auth: env SN_TOKEN (Bearer) OU SN_USER+SN_PASS (Basic) OU arquivo ./.sn-upload.json ({token} | {user,pass}).
// Uso: node scripts/upload-data.mjs [all|customer|order|product_summary|monthly_revenue] [--dry] [--check]
import fs from 'node:fs'
import path from 'node:path'

// Instância: SN_INSTANCE (ex.: https://minha-inst.service-now.com). Padrão: nowdemo.
const INSTANCE = (process.env.SN_INSTANCE || 'https://nowdemo.service-now.com').replace(/\/$/, '')
const BATCH = 9000
const CONCURRENCY = 25
// CSVs em <raiz do repo>/dataset (relativo a este script)
import { fileURLToPath } from 'node:url'
const DATASET = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../dataset')

const TABLES = {
    customer: { csv: 'customers.csv', table: 'x_snc_dashboard_se_customer', bool: ['newsletter_subscribed', 'churned'] },
    order: { csv: 'orders.csv', table: 'x_snc_dashboard_se_order', bool: ['returned', 'is_repeat_customer'] },
    product_summary: { csv: 'product_summary.csv', table: 'x_snc_dashboard_se_product_summary', bool: [] },
    monthly_revenue: { csv: 'monthly_revenue.csv', table: 'x_snc_dashboard_se_monthly_revenue', bool: [] },
}
const ORDER = ['product_summary', 'monthly_revenue', 'customer', 'order']

const argv = process.argv.slice(2)
const DRY = argv.includes('--dry')
const CHECK = argv.includes('--check')
const WIPE = argv.includes('--wipe')
const which = argv.find((a) => !a.startsWith('--')) || 'all'
const keys = which === 'all' ? ORDER : [which]

function authHeader() {
    let token = process.env.SN_TOKEN
    let user = process.env.SN_USER
    let pass = process.env.SN_PASS
    const credFile = path.join(process.cwd(), '.sn-upload.json')
    if (!token && !user && fs.existsSync(credFile)) {
        const c = JSON.parse(fs.readFileSync(credFile, 'utf8'))
        token = c.token
        user = c.user
        pass = c.pass
    }
    if (token) return 'Bearer ' + token
    if (user && pass) return 'Basic ' + Buffer.from(`${user}:${pass}`).toString('base64')
    return null
}

// Parser CSV com suporte a campos entre aspas
function parseCSV(text) {
    const rows = []
    let row = [],
        field = '',
        inQ = false
    for (let i = 0; i < text.length; i++) {
        const ch = text[i]
        if (inQ) {
            if (ch === '"') {
                if (text[i + 1] === '"') {
                    field += '"'
                    i++
                } else inQ = false
            } else field += ch
        } else if (ch === '"') inQ = true
        else if (ch === ',') {
            row.push(field)
            field = ''
        } else if (ch === '\n') {
            row.push(field)
            rows.push(row)
            row = []
            field = ''
        } else if (ch !== '\r') field += ch
    }
    if (field.length || row.length) {
        row.push(field)
        rows.push(row)
    }
    return rows.filter((r) => r.length > 1 || (r.length === 1 && r[0] !== ''))
}

function buildRecords(rows, boolFields) {
    const header = rows[0]
    const out = []
    for (let r = 1; r < rows.length; r++) {
        const vals = rows[r]
        const rec = {}
        for (let c = 0; c < header.length; c++) {
            let v = vals[c]
            if (v === undefined || v === '') continue
            if (boolFields.includes(header[c])) v = v === '1' || v.toLowerCase() === 'true' ? 'true' : 'false'
            rec[header[c]] = v
        }
        out.push(rec)
    }
    return out
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function insert(AUTH, table, rec) {
    const url = `${INSTANCE}/api/now/table/${table}?sysparm_input_display_value=false&sysparm_display_value=false&sysparm_fields=sys_id`
    for (let attempt = 0; attempt < 2; attempt++) {
        const res = await fetch(url, {
            method: 'POST',
            headers: { Authorization: AUTH, 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify(rec),
        })
        if (res.status === 201) return
        if ((res.status === 429 || res.status >= 500) && attempt === 0) {
            await sleep(600)
            continue
        }
        const t = await res.text()
        throw new Error(`HTTP ${res.status}: ${t.slice(0, 140)}`)
    }
}

async function runPool(items, worker) {
    let idx = 0,
        ok = 0,
        fail = 0
    const errors = []
    async function next() {
        while (idx < items.length) {
            const cur = idx++
            try {
                await worker(items[cur])
                ok++
            } catch (e) {
                fail++
                if (errors.length < 8) errors.push(String((e && e.message) || e))
            }
            if ((ok + fail) % 1000 === 0) process.stdout.write(`\r    ... ${ok + fail}/${items.length} (ok=${ok} fail=${fail})`)
        }
    }
    await Promise.all(Array.from({ length: CONCURRENCY }, next))
    process.stdout.write('\n')
    return { ok, fail, errors }
}

async function count(AUTH, table) {
    const url = `${INSTANCE}/api/now/stats/${table}?sysparm_count=true`
    const res = await fetch(url, { headers: { Authorization: AUTH, Accept: 'application/json' } })
    const j = await res.json()
    return j?.result?.stats?.count ?? '?'
}

async function getSysIds(AUTH, table) {
    const ids = []
    const limit = 5000
    let offset = 0
    while (true) {
        const url = `${INSTANCE}/api/now/table/${table}?sysparm_fields=sys_id&sysparm_limit=${limit}&sysparm_offset=${offset}&sysparm_exclude_reference_link=true`
        const res = await fetch(url, { headers: { Authorization: AUTH, Accept: 'application/json' } })
        const j = await res.json()
        const batch = (j?.result ?? []).map((r) => r.sys_id)
        ids.push(...batch)
        if (batch.length < limit) break
        offset += limit
    }
    return ids
}

async function deleteRecord(AUTH, table, sysId) {
    const url = `${INSTANCE}/api/now/table/${table}/${sysId}`
    for (let attempt = 0; attempt < 2; attempt++) {
        const res = await fetch(url, { method: 'DELETE', headers: { Authorization: AUTH } })
        if (res.status === 204) return
        if ((res.status === 429 || res.status >= 500) && attempt === 0) { await sleep(600); continue }
        throw new Error(`DELETE HTTP ${res.status} for ${sysId}`)
    }
}

async function wipeTable(AUTH, table) {
    process.stdout.write(`  Lendo sys_ids de ${table}…`)
    const ids = await getSysIds(AUTH, table)
    console.log(` ${ids.length} registros`)
    if (ids.length === 0) return
    const { ok, fail, errors } = await runPool(ids, (id) => deleteRecord(AUTH, table, id))
    console.log(`  Wipe: ok=${ok} fail=${fail}`)
    if (errors.length) console.log('  erros:', errors)
}

async function main() {
    const AUTH = DRY ? null : authHeader()
    if (!DRY && !AUTH) {
        console.error('SEM AUTENTICAÇÃO. Defina SN_TOKEN ou SN_USER+SN_PASS, ou crie .sn-upload.json')
        process.exit(2)
    }
    for (const key of keys) {
        const cfg = TABLES[key]
        if (!cfg) {
            console.error(`tabela desconhecida: ${key}`)
            continue
        }
        if (CHECK) {
            console.log(`${cfg.table}: ${await count(AUTH, cfg.table)} registros`)
            continue
        }
        if (WIPE) {
            console.log(`\n=== WIPE ${cfg.table} ===`)
            await wipeTable(AUTH, cfg.table)
        }
        const rows = parseCSV(fs.readFileSync(path.join(DATASET, cfg.csv), 'utf8'))
        const records = buildRecords(rows, cfg.bool)
        console.log(`\n=== ${cfg.table} :: ${records.length} registros (lotes de ${BATCH}) ===`)
        if (DRY) {
            console.log('  amostra[0]:', JSON.stringify(records[0]))
            console.log('  amostra[last]:', JSON.stringify(records[records.length - 1]))
            continue
        }
        let totalOk = 0,
            totalFail = 0
        for (let start = 0, b = 1; start < records.length; start += BATCH, b++) {
            const chunk = records.slice(start, start + BATCH)
            console.log(`  Lote ${b}: ${chunk.length} registros`)
            const { ok, fail, errors } = await runPool(chunk, (r) => insert(AUTH, cfg.table, r))
            totalOk += ok
            totalFail += fail
            if (errors.length) console.log('    erros (amostra):', errors)
            await sleep(400)
        }
        console.log(`  TOTAL ${cfg.table}: ok=${totalOk} fail=${totalFail}`)
    }
    console.log('\nConcluído.')
}

main().catch((e) => {
    console.error(e)
    process.exit(1)
})
