import React, { useEffect, useMemo, useRef, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { useDashboard, useTab, fmtNum, fmtUSD, fmtCompact } from '../shared/data'
import type { DashboardData, TabKey } from '../shared/types'
import { NX } from './chartTheme'
import { Apex, NxPanel, NxKpi, NxBars, NxTable } from './components/Apex'
import './styles.css'

const C = NX.C
const fmtK = (n: number) => fmtCompact(n) // $X.XXM / $X.Xk style
const MONTHS = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']

const TAB_META: { key: TabKey; n: string; label: string }[] = [
    { key: 'overview', n: '01', label: 'OVERVIEW' },
    { key: 'sales', n: '02', label: 'VENDAS' },
    { key: 'customers', n: '03', label: 'CLIENTES' },
    { key: 'products', n: '04', label: 'PRODUTOS' },
]

/* ===================== ATMOSPHERE ===================== */
function Atmosphere() {
    return (
        <>
            <div className="nx-fx-grid" />
            <div className="nx-fx-glow a" />
            <div className="nx-fx-glow b" />
            <div className="nx-fx-glow c" />
            <div className="nx-fx-vig" />
            <div className="nx-fx-scan" />
            <div className="nx-fx-noise" />
            <div className="nx-fx-flicker" />
        </>
    )
}

/* ===================== BOOT OVERLAY ===================== */
const BOOT_LINES: [string, string][] = [
    ['> INIT NEXUS//TERMINAL CORE ...........', 'ok'],
    ['> MOUNT /dev/feed ec-7 ................', 'ok'],
    ['> AUTH OPERATOR <glaucco> .............', 'ok'],
    ['> FETCH ./data ........................', ''],
    ['> DECODE 25,000 ORDERS ................', 'ok'],
    ['> CALIBRATE NEON DISPLAY MATRIX .......', 'ok'],
    ['> SYNTHWAVE SUBSYSTEMS ONLINE .........', 'ok'],
]

function Boot({ done }: { done: boolean }) {
    const [shown, setShown] = useState(0)
    useEffect(() => {
        if (shown >= BOOT_LINES.length) return
        const t = setTimeout(() => setShown((s) => s + 1), 300)
        return () => clearTimeout(t)
    }, [shown])
    return (
        <div className={`nx-boot${done ? ' done' : ''}`}>
            <div className="nx-bootmark">
                NEXUS<span>//</span>TERMINAL
            </div>
            <div className="nx-bootlog">
                {BOOT_LINES.slice(0, shown).map(([t, s], i) => (
                    <div className="l" key={i}>
                        {t}{' '}
                        {s ? (
                            <span className={s}>[{s.toUpperCase()}]</span>
                        ) : (
                            <span className="nx-cursor" />
                        )}
                    </div>
                ))}
            </div>
            <div className="nx-bootbar">
                <i />
            </div>
        </div>
    )
}

/* ===================== HEADER ===================== */
function useClock() {
    const [t, setT] = useState('--:--:--')
    useEffect(() => {
        const tick = () => setT(new Date().toISOString().substr(11, 8))
        tick()
        const id = setInterval(tick, 1000)
        return () => clearInterval(id)
    }, [])
    return t
}

function Header({ rec }: { rec: string }) {
    const clock = useClock()
    return (
        <header className="nx-header">
            <div className="nx-brand">
                NEXUS<span className="slash">//</span>
                <b>TERMINAL</b> <span className="nx-badge">v-B</span>
            </div>
            <div className="nx-sys">
                <div>
                    <span className="nx-live" />
                    FEED <b>LIVE</b>
                </div>
                <div>
                    NODE <b>EC-7</b>
                </div>
                <div>
                    UTC <b>{clock}</b>
                </div>
                <div>
                    REC <b>{rec}</b>
                </div>
            </div>
        </header>
    )
}

/* ===================== TICKER ===================== */
function Ticker({ D }: { D: DashboardData }) {
    const k = D.kpis
    const items: [string, string, 'up' | 'dn', string][] = [
        ['REVENUE', fmtK(k.total_revenue), 'up', '+12.4%'],
        ['ORDERS', fmtNum(k.total_orders), 'up', '+3.1%'],
        ['AOV', fmtUSD(k.aov), 'up', '+0.8%'],
        ['RETURN', k.return_rate + '%', 'dn', '-0.4%'],
        ['REPEAT', k.repeat_rate + '%', 'up', '+2.2%'],
        ['RATING', k.avg_rating.toFixed(1) + '/5', 'up', '+0.1'],
        ['CHURN', D.customers.churn_rate + '%', 'dn', '-1.0%'],
        ['BASE', fmtNum(D.customers.total), 'up', '+5.7%'],
    ]
    const run = (
        <>
            {items.map(([s, v, d, c], i) => (
                <span className="nx-tk" key={s + i}>
                    <span className="sym">{s}</span>
                    <span className="val">{v}</span>
                    <span className={d === 'up' ? 'nx-up' : 'nx-dn'}>
                        {d === 'up' ? '▲' : '▼'} {c}
                    </span>
                </span>
            ))}
        </>
    )
    return (
        <div className="nx-ticker">
            <div className="run">
                {run}
                {run}
            </div>
        </div>
    )
}

/* ===================== OVERVIEW ===================== */
function Overview({ D }: { D: DashboardData }) {
    const k = D.kpis
    const kpis = [
        { lab: 'RECEITA TOTAL', val: fmtK(k.total_revenue), sub: <><b>▲ 12.4%</b> vs ano ant.</>, v: 'cyan' as const },
        { lab: 'PEDIDOS', val: fmtNum(k.total_orders), sub: <><b>▲ 3.1%</b> volume</>, v: 'cyan' as const },
        { lab: 'TICKET MÉDIO', val: fmtUSD(k.aov), sub: 'AOV consolidado', v: 'magenta' as const },
        { lab: 'DEVOLUÇÃO', val: k.return_rate + '%', sub: 'taxa global', v: 'magenta' as const },
        { lab: 'RECOMPRA', val: k.repeat_rate + '%', sub: <><b>▲</b> clientes fiéis</>, v: 'cyan' as const },
        { lab: 'RATING MÉDIO', val: k.avg_rating.toFixed(1), sub: '★ de 5.0', v: 'cyan' as const },
    ]

    const totalOrders = D.sales.by_status.reduce((a, b) => a + b.orders, 0)
    const devTot = D.sales.by_device.reduce((a, b) => a + b.revenue, 0)

    const revenueOpt = {
        ...NX.base,
        chart: { ...NX.base.chart, type: 'area', height: 300 },
        series: [{ name: 'Receita', data: D.monthly.map((m) => Math.round(m.revenue)) }],
        xaxis: {
            categories: D.monthly.map((m) => m.label),
            tickAmount: 8,
            labels: { style: { fontSize: '9px', colors: C.mute } },
            axisBorder: { color: C.grid },
            axisTicks: { color: C.grid },
        },
        yaxis: { labels: { formatter: fmtK, style: { fontSize: '9px' } }, min: 25000, max: 52000 },
        stroke: { curve: 'smooth', width: 2.5, colors: [C.cyan] },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.45,
                opacityTo: 0,
                colorStops: [
                    { offset: 0, color: C.magenta, opacity: 0.5 },
                    { offset: 100, color: C.cyan, opacity: 0 },
                ],
            },
        },
        colors: [C.cyan],
        markers: { size: 0 },
        tooltip: { ...NX.base.tooltip, y: { formatter: (v: number) => fmtUSD(v) } },
    }

    const statusOpt = NX.merge(NX.base, {
        chart: { ...NX.base.chart, type: 'donut', height: 300 },
        series: D.sales.by_status.map((s) => s.orders),
        labels: D.sales.by_status.map((s) => s.name),
        colors: [C.cyan, C.magenta, C.amber, C.violet],
        stroke: { colors: ['#05060a'], width: 2 },
        plotOptions: {
            pie: {
                donut: {
                    size: '68%',
                    labels: {
                        show: true,
                        total: { show: true, label: 'TOTAL', color: C.dim, fontSize: '11px', formatter: () => fmtNum(totalOrders) },
                        value: { color: '#fff', fontFamily: "'Orbitron'", fontSize: '22px' },
                    },
                },
            },
        },
        legend: { ...NX.base.legend, position: 'bottom', fontSize: '10px' },
        tooltip: { ...NX.base.tooltip, y: { formatter: (v: number) => fmtNum(v) } },
    })

    const yearOpt = NX.merge(NX.base, {
        chart: { ...NX.base.chart, type: 'bar', height: 240 },
        series: [{ name: 'Receita', data: D.sales.by_year.map((y) => +y.revenue.toFixed(0)) }],
        xaxis: { categories: D.sales.by_year.map((y) => y.name), labels: { style: { fontSize: '9px' } } },
        yaxis: { labels: { formatter: fmtK, style: { fontSize: '9px' } } },
        plotOptions: { bar: { borderRadius: 0, columnWidth: '52%', distributed: true } },
        colors: [C.cyan, C.blue, C.violet, C.magenta, C.amber, C.cyan, C.green],
        legend: { show: false },
        tooltip: { ...NX.base.tooltip, y: { formatter: (v: number) => fmtUSD(v) } },
    })

    const deviceOpt = NX.merge(NX.base, {
        chart: { ...NX.base.chart, type: 'radialBar', height: 240 },
        series: D.sales.by_device.map((d) => +(d.revenue / devTot * 100).toFixed(1)),
        labels: D.sales.by_device.map((d) => d.name),
        colors: [C.magenta, C.cyan, C.amber],
        plotOptions: {
            radialBar: {
                hollow: { size: '38%' },
                track: { background: 'rgba(255,255,255,.05)' },
                dataLabels: {
                    name: { fontSize: '10px', color: C.dim },
                    value: { fontSize: '14px', color: '#fff', fontFamily: "'Orbitron'" },
                    total: { show: true, label: 'MOBILE+', color: C.dim, fontSize: '9px', formatter: () => '63%' },
                },
            },
        },
        legend: { ...NX.base.legend, show: true, position: 'bottom', fontSize: '9px' },
    })

    const returnOpt = NX.merge(NX.base, {
        chart: { ...NX.base.chart, type: 'line', height: 240 },
        series: [{ name: 'Devolução %', data: D.sales.return_by_month.map((m) => m.return_rate) }],
        xaxis: {
            categories: D.sales.return_by_month.map((m) => m.label),
            tickAmount: 6,
            labels: { style: { fontSize: '8px', colors: C.mute } },
        },
        yaxis: { labels: { formatter: (v: number) => v.toFixed(0) + '%', style: { fontSize: '9px' } } },
        stroke: { curve: 'smooth', width: 2 },
        colors: [C.magenta],
        markers: { size: 0, hover: { size: 4 } },
        tooltip: { ...NX.base.tooltip, y: { formatter: (v: number) => v.toFixed(2) + '%' } },
    })

    return (
        <section className="nx-pane">
            <div className="nx-grid">
                {kpis.map((x, i) => (
                    <NxKpi key={x.lab} label={x.lab} value={x.val} sub={x.sub} variant={x.v} delay={i * 70} />
                ))}
            </div>
            <div className="nx-grid" style={{ marginTop: 14 }}>
                <NxPanel className="nx-col-8" title="RECEITA // SÉRIE TEMPORAL [2020—2026]" tag="MENSAL · USD">
                    <Apex options={revenueOpt} />
                </NxPanel>
                <NxPanel className="nx-col-4" variant="magenta" title="STATUS DOS PEDIDOS" tag={fmtNum(totalOrders)}>
                    <Apex options={statusOpt} />
                </NxPanel>
            </div>
            <div className="nx-grid" style={{ marginTop: 14 }}>
                <NxPanel className="nx-col-4" title="RECEITA POR ANO" tag="YOY">
                    <Apex options={yearOpt} />
                </NxPanel>
                <NxPanel className="nx-col-4" title="DISPOSITIVO" tag="SHARE">
                    <Apex options={deviceOpt} />
                </NxPanel>
                <NxPanel className="nx-col-4" variant="magenta" title="TAXA DE DEVOLUÇÃO" tag="% / MÊS">
                    <Apex options={returnOpt} />
                </NxPanel>
            </div>
        </section>
    )
}

/* ===================== SALES ===================== */
function Sales({ D }: { D: DashboardData }) {
    const catRows = D.sales.by_category.map((c) => ({ nm: c.name, v: c.revenue, label: fmtK(c.revenue) }))

    const payOpt = NX.merge(NX.base, {
        chart: { ...NX.base.chart, type: 'pie', height: 240 },
        series: D.sales.by_payment.map((p) => +p.revenue.toFixed(0)),
        labels: D.sales.by_payment.map((p) => p.name),
        colors: [C.magenta, C.cyan, C.violet, C.amber, C.blue, C.green, C.red],
        stroke: { colors: ['#05060a'], width: 2 },
        legend: { ...NX.base.legend, position: 'bottom', fontSize: '9px' },
        tooltip: { ...NX.base.tooltip, y: { formatter: (v: number) => fmtUSD(v) } },
    })

    // seasonality heatmap as styled table cells (opacity by value)
    const seasonality = useMemo(() => {
        const flat = D.sales.seasonality.flatMap((r) => r.months)
        const max = Math.max(...flat, 1)
        return { rows: [...D.sales.seasonality].reverse(), max }
    }, [D])

    const quarterOpt = NX.merge(NX.base, {
        chart: { ...NX.base.chart, type: 'bar', height: 300 },
        series: [{ name: 'Receita', data: D.sales.by_quarter.map((q) => +q.revenue.toFixed(0)) }],
        xaxis: { categories: D.sales.by_quarter.map((q) => q.name), labels: { style: { fontSize: '10px' } } },
        yaxis: { labels: { formatter: fmtK, style: { fontSize: '9px' } } },
        plotOptions: { bar: { borderRadius: 0, columnWidth: '50%', distributed: true } },
        colors: [C.cyan, C.violet, C.amber, C.magenta],
        legend: { show: false },
        tooltip: { ...NX.base.tooltip, y: { formatter: (v: number) => fmtUSD(v) } },
    })

    const dowOpt = NX.merge(NX.base, {
        chart: { ...NX.base.chart, type: 'bar', height: 300 },
        series: [{ name: 'Pedidos', data: D.sales.by_dow.map((d) => d.orders) }],
        xaxis: {
            categories: D.sales.by_dow.map((d) => d.name.substr(0, 3).toUpperCase()),
            labels: { style: { fontSize: '9px' } },
        },
        yaxis: { labels: { style: { fontSize: '9px' } } },
        plotOptions: { bar: { borderRadius: 0, columnWidth: '58%' } },
        colors: [C.magenta],
        fill: { type: 'gradient', gradient: { shade: 'dark', gradientToColors: [C.cyan], opacityFrom: 0.95, opacityTo: 0.95 } },
        legend: { show: false },
        tooltip: { ...NX.base.tooltip, y: { formatter: (v: number) => fmtNum(v) } },
    })

    const dv = [...D.sales.delivery_by_category].sort((a, b) => b.avg_delivery_days - a.avg_delivery_days)
    const delivOpt = NX.merge(NX.base, {
        chart: { ...NX.base.chart, type: 'bar', height: 220 },
        series: [{ name: 'Dias', data: dv.map((d) => d.avg_delivery_days) }],
        xaxis: { categories: dv.map((d) => d.name), labels: { style: { fontSize: '8px' }, rotate: -40, trim: true } },
        yaxis: { labels: { formatter: (v: number) => v.toFixed(1), style: { fontSize: '9px' } }, min: 3.7, max: 4.5 },
        plotOptions: { bar: { borderRadius: 0, columnWidth: '45%' } },
        colors: [C.amber],
        legend: { show: false },
        tooltip: { ...NX.base.tooltip, y: { formatter: (v: number) => v.toFixed(2) + ' dias' } },
    })

    return (
        <section className="nx-pane">
            <div className="nx-grid">
                <NxPanel className="nx-col-7" title="RECEITA POR CATEGORIA" tag="RANK">
                    <NxBars rows={catRows} />
                </NxPanel>
                <NxPanel className="nx-col-5" variant="magenta" title="MÉTODO DE PAGAMENTO" tag="USD">
                    <Apex options={payOpt} />
                </NxPanel>
            </div>
            <div className="nx-grid" style={{ marginTop: 14 }}>
                <NxPanel className="nx-col-6" title="SAZONALIDADE [HEATMAP ANO × MÊS]" tag="USD">
                    <table className="nx-heat">
                        <thead>
                            <tr>
                                <th />
                                {MONTHS.map((m) => (
                                    <th key={m}>{m}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {seasonality.rows.map((row) => (
                                <tr key={row.year}>
                                    <td className="yr">{row.year}</td>
                                    {row.months.map((v, i) => (
                                        <td
                                            className="cell"
                                            key={i}
                                            style={{ opacity: 0.12 + (v / seasonality.max) * 0.88 }}
                                            title={fmtUSD(v)}
                                        />
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </NxPanel>
                <NxPanel className="nx-col-3" title="POR TRIMESTRE" tag="Q">
                    <Apex options={quarterOpt} />
                </NxPanel>
                <NxPanel className="nx-col-3" variant="magenta" title="DIA DA SEMANA" tag="PEDIDOS">
                    <Apex options={dowOpt} />
                </NxPanel>
            </div>
            <div className="nx-grid" style={{ marginTop: 14 }}>
                <NxPanel className="nx-col-12" title="ENTREGA MÉDIA POR CATEGORIA" tag="DIAS">
                    <Apex options={delivOpt} />
                </NxPanel>
            </div>
        </section>
    )
}

/* ===================== CUSTOMERS ===================== */
function Customers({ D }: { D: DashboardData }) {
    const cu = D.customers

    const genderOpt = NX.merge(NX.base, {
        chart: { ...NX.base.chart, type: 'donut', height: 200 },
        series: cu.gender.map((g) => g.count),
        labels: cu.gender.map((g) => g.name),
        colors: [C.magenta, C.cyan, C.amber],
        stroke: { colors: ['#05060a'], width: 2 },
        plotOptions: { pie: { donut: { size: '64%' } } },
        legend: { ...NX.base.legend, position: 'bottom', fontSize: '9px' },
        tooltip: { ...NX.base.tooltip, y: { formatter: (v: number) => fmtNum(v) } },
    })

    const tierOpt = NX.merge(NX.base, {
        chart: { ...NX.base.chart, type: 'line', height: 300, stacked: false },
        series: [
            { name: 'Avg Spend', type: 'column', data: cu.by_tier.map((t) => +t.avg_spend.toFixed(0)) },
            { name: 'Churn %', type: 'line', data: cu.by_tier.map((t) => t.churn_rate) },
        ],
        xaxis: { categories: cu.by_tier.map((t) => t.name), labels: { style: { fontSize: '10px' } } },
        yaxis: [
            { labels: { formatter: fmtK, style: { fontSize: '9px' } } },
            { opposite: true, labels: { formatter: (v: number) => v.toFixed(0) + '%', style: { fontSize: '9px' } }, max: 14 },
        ],
        stroke: { width: [0, 3], curve: 'smooth' },
        plotOptions: { bar: { borderRadius: 0, columnWidth: '48%' } },
        fill: { opacity: [0.9, 1] },
        colors: [C.cyan, C.magenta],
        legend: { ...NX.base.legend, position: 'top', fontSize: '10px' },
        tooltip: { ...NX.base.tooltip },
    })

    const channelOpt = NX.merge(NX.base, {
        chart: { ...NX.base.chart, type: 'bar', height: 300 },
        series: [{ name: 'Clientes', data: cu.by_channel.map((c) => c.customers) }],
        xaxis: { categories: cu.by_channel.map((c) => c.name), labels: { style: { fontSize: '9px' } } },
        yaxis: { labels: { style: { fontSize: '9px' } } },
        plotOptions: { bar: { borderRadius: 0, horizontal: true, barHeight: '55%', distributed: true } },
        colors: [C.magenta, C.cyan, C.violet, C.amber, C.blue, C.green],
        legend: { show: false },
        tooltip: { ...NX.base.tooltip, y: { formatter: (v: number) => fmtNum(v) } },
    })

    const histOpt = (cats: string[], vals: number[], color: string) =>
        NX.merge(NX.base, {
            chart: { ...NX.base.chart, type: 'bar', height: 240 },
            series: [{ name: 'Clientes', data: vals }],
            xaxis: { categories: cats, labels: { style: { fontSize: '8px' } } },
            yaxis: { labels: { style: { fontSize: '8px' } } },
            plotOptions: { bar: { borderRadius: 0, columnWidth: '70%' } },
            colors: [color],
            fill: { type: 'gradient', gradient: { shade: 'dark', gradientToColors: [C.magenta], opacityFrom: 0.95, opacityTo: 0.6 } },
            legend: { show: false },
            tooltip: { ...NX.base.tooltip, y: { formatter: (v: number) => fmtNum(v) } },
        })

    const countryRows = cu.top_countries.map((c) => ({ nm: c.name, v: c.spend, label: fmtK(c.spend) }))

    return (
        <section className="nx-pane">
            <div className="nx-grid">
                <div className="nx-panel nx-col-3 nx-nblock">
                    <span className="nx-br tl" />
                    <span className="nx-br tr" />
                    <span className="nx-br bl" />
                    <span className="nx-br br2" />
                    <div className="cap">BASE TOTAL</div>
                    <div className="big">{fmtNum(cu.total)}</div>
                </div>
                <div className="nx-panel mag nx-col-3 nx-nblock mag">
                    <span className="nx-br tl" />
                    <span className="nx-br tr" />
                    <span className="nx-br bl" />
                    <span className="nx-br br2" />
                    <div className="cap">CHURN RATE</div>
                    <div className="big">{cu.churn_rate.toFixed(1)}%</div>
                </div>
                <div className="nx-panel nx-col-3 nx-nblock">
                    <span className="nx-br tl" />
                    <span className="nx-br tr" />
                    <span className="nx-br bl" />
                    <span className="nx-br br2" />
                    <div className="cap">NEWSLETTER OPT-IN</div>
                    <div className="big">{cu.newsletter_rate.toFixed(0)}%</div>
                </div>
                <NxPanel className="nx-col-3" title="GÊNERO">
                    <Apex options={genderOpt} />
                </NxPanel>
            </div>
            <div className="nx-grid" style={{ marginTop: 14 }}>
                <NxPanel className="nx-col-6" title="TIER × SPEND × CHURN" tag="SEGMENTOS">
                    <Apex options={tierOpt} />
                </NxPanel>
                <NxPanel className="nx-col-6" variant="magenta" title="CANAL DE AQUISIÇÃO" tag="CLIENTES">
                    <Apex options={channelOpt} />
                </NxPanel>
            </div>
            <div className="nx-grid" style={{ marginTop: 14 }}>
                <NxPanel className="nx-col-3" title="IDADE">
                    <Apex options={histOpt(cu.age_hist.map((x) => x.name), cu.age_hist.map((x) => x.count), C.cyan)} />
                </NxPanel>
                <NxPanel className="nx-col-3" title="RECÊNCIA">
                    <Apex options={histOpt(cu.recency_hist.map((x) => x.name), cu.recency_hist.map((x) => x.count), C.amber)} />
                </NxPanel>
                <NxPanel className="nx-col-3" title="FREQUÊNCIA">
                    <Apex options={histOpt(cu.frequency_hist.map((x) => x.name), cu.frequency_hist.map((x) => x.count), C.violet)} />
                </NxPanel>
                <NxPanel className="nx-col-3" title="LTV">
                    <Apex options={histOpt(cu.ltv_hist.map((x) => x.name), cu.ltv_hist.map((x) => x.count), C.green)} />
                </NxPanel>
            </div>
            <div className="nx-grid" style={{ marginTop: 14 }}>
                <NxPanel className="nx-col-12" title="TOP PAÍSES // RECEITA" tag="GEO">
                    <NxBars rows={countryRows} amber />
                </NxPanel>
            </div>
        </section>
    )
}

/* ===================== PRODUCTS ===================== */
function Scatter({ D }: { D: DashboardData }) {
    const pts = D.products.scatter
    const W = 1000
    const H = 360
    const pad = { l: 48, r: 16, t: 16, b: 36 }
    const xs = pts.map((p) => p.x)
    const ys = pts.map((p) => p.y)
    const zs = pts.map((p) => p.z)
    const xMin = Math.min(...xs, 3.6)
    const xMax = Math.max(...xs, 4.5)
    const yMin = 0
    const yMax = Math.max(...ys, 1) * 1.1
    const zMax = Math.max(...zs, 1)
    const sx = (x: number) => pad.l + ((x - xMin) / (xMax - xMin || 1)) * (W - pad.l - pad.r)
    const sy = (y: number) => H - pad.b - ((y - yMin) / (yMax - yMin || 1)) * (H - pad.t - pad.b)
    const colorBy = (y: number) => (y > 12 ? C.magenta : y >= 8 ? C.amber : C.cyan)
    const xTicks = [3.6, 3.8, 4.0, 4.2, 4.4]
    const yTicks = [0, 5, 10, 15, 20].filter((t) => t <= yMax)

    return (
        <>
            <svg className="nx-scatter" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet">
                {/* axes grid */}
                {yTicks.map((t) => (
                    <g key={'y' + t}>
                        <line className="ax" x1={pad.l} y1={sy(t)} x2={W - pad.r} y2={sy(t)} />
                        <text className="axtxt" x={pad.l - 8} y={sy(t) + 3} textAnchor="end">
                            {t}%
                        </text>
                    </g>
                ))}
                {xTicks.map((t) => (
                    <text key={'x' + t} className="axtxt" x={sx(t)} y={H - pad.b + 16} textAnchor="middle">
                        {t.toFixed(1)}
                    </text>
                ))}
                <text className="axtxt" x={(W - pad.r + pad.l) / 2} y={H - 4} textAnchor="middle">
                    RATING
                </text>
                {/* bubbles */}
                {pts.map((p, i) => (
                    <circle
                        key={i}
                        cx={sx(p.x)}
                        cy={sy(p.y)}
                        r={3 + (p.z / zMax) * 15}
                        fill={colorBy(p.y)}
                        fillOpacity={0.5}
                        stroke={colorBy(p.y)}
                        strokeOpacity={0.9}
                    >
                        <title>
                            {p.name} · RATING {p.x} · DEV {p.y}% · {p.z} ped.
                        </title>
                    </circle>
                ))}
            </svg>
            <div className="nx-legend">
                <span>
                    <i style={{ background: C.cyan }} />
                    RATING ALTO / RISCO BAIXO
                </span>
                <span>
                    <i style={{ background: C.amber }} />
                    ZONA NEUTRA
                </span>
                <span>
                    <i style={{ background: C.magenta }} />
                    ALERTA · DEVOLUÇÃO &gt;12%
                </span>
                <span style={{ color: C.mute }}>RAIO = VOLUME DE PEDIDOS</span>
            </div>
        </>
    )
}

function Products({ D }: { D: DashboardData }) {
    const priceOpt = NX.merge(NX.base, {
        chart: { ...NX.base.chart, type: 'bar', height: 240 },
        series: [{ name: 'Preço médio', data: D.products.avg_price_by_cat.map((c) => +c.avg_price.toFixed(2)) }],
        xaxis: { categories: D.products.avg_price_by_cat.map((c) => c.name), labels: { style: { fontSize: '8px' }, rotate: -40, trim: true } },
        yaxis: { labels: { formatter: (v: number) => '$' + v.toFixed(0), style: { fontSize: '9px' } } },
        plotOptions: { bar: { borderRadius: 0, columnWidth: '52%' } },
        colors: [C.cyan],
        fill: { type: 'gradient', gradient: { shade: 'dark', gradientToColors: [C.violet], opacityFrom: 0.95, opacityTo: 0.8 } },
        legend: { show: false },
        tooltip: { ...NX.base.tooltip, y: { formatter: (v: number) => '$' + v.toFixed(2) } },
    })

    return (
        <section className="nx-pane">
            <div className="nx-grid">
                <NxPanel className="nx-col-12" title="MATRIZ RATING × DEVOLUÇÃO × VOLUME" tag={`${D.products.scatter.length} SKUs`}>
                    <Scatter D={D} />
                </NxPanel>
            </div>
            <div className="nx-grid" style={{ marginTop: 14 }}>
                <NxPanel className="nx-col-7" title="TOP RECEITA // SKUs" tag="RANK">
                    <NxTable rows={D.products.top_revenue} fmtN={fmtNum} fmtK={fmtK} />
                </NxPanel>
                <NxPanel className="nx-col-5" variant="magenta" title="ALERTA // PIORES DEVOLUÇÕES" tag="RISCO">
                    <NxTable rows={D.products.worst_returns} risk fmtN={fmtNum} fmtK={fmtK} />
                </NxPanel>
            </div>
            <div className="nx-grid" style={{ marginTop: 14 }}>
                <NxPanel className="nx-col-12" title="PREÇO MÉDIO POR CATEGORIA" tag="USD">
                    <Apex options={priceOpt} />
                </NxPanel>
            </div>
        </section>
    )
}

/* ===================== APP SHELL ===================== */
function App() {
    const { data, loading, error } = useDashboard()
    const [tab, setTab] = useTab('overview')
    const [bootDone, setBootDone] = useState(false)
    const bootTimer = useRef<number | null>(null)

    // dismiss boot overlay once data resolves (min display time)
    useEffect(() => {
        if (loading) return
        bootTimer.current = window.setTimeout(() => setBootDone(true), 2600)
        return () => {
            if (bootTimer.current) clearTimeout(bootTimer.current)
        }
    }, [loading])

    if (loading) {
        return (
            <div className="nx-root">
                <Atmosphere />
                <Boot done={false} />
            </div>
        )
    }

    if (error || !data) {
        return (
            <div className="nx-root">
                <Atmosphere />
                <div className="nx-state">
                    <div className="mk">NEXUS//TERMINAL</div>
                    <div className="msg er">&gt; ERRO: FALHA AO CARREGAR DATASET</div>
                    <div className="msg">{error || 'SEM DADOS'}</div>
                </div>
            </div>
        )
    }

    const D = data

    return (
        <div className="nx-root">
            <Atmosphere />
            {!bootDone && <Boot done={bootDone} />}
            <div className="nx-wrap">
                <Header rec={fmtK(D.kpis.total_revenue)} />
                <Ticker D={D} />
                <nav className="nx-tabs">
                    {TAB_META.map((t) => (
                        <button
                            key={t.key}
                            className={`nx-tab${tab === t.key ? ' active' : ''}`}
                            onClick={() => {
                                setTab(t.key)
                                window.dispatchEvent(new Event('resize'))
                            }}
                        >
                            <span className="n">{t.n}</span>
                            {t.label}
                        </button>
                    ))}
                </nav>

                {tab === 'overview' && <Overview D={D} />}
                {tab === 'sales' && <Sales D={D} />}
                {tab === 'customers' && <Customers D={D} />}
                {tab === 'products' && <Products D={D} />}

                <footer className="nx-footer">
                    <div>NEXUS//TERMINAL · BUILD VAR-B · SYNTHWAVE OPS CONSOLE</div>
                    <div>DATASET {D.generated_from || 'OK'} · LOADED</div>
                    <div>© 2026 · DADOS SIMULADOS</div>
                </footer>
            </div>
        </div>
    )
}

const root = document.getElementById('root')
if (root) ReactDOM.createRoot(root).render(<React.StrictMode><App /></React.StrictMode>)
