import React from 'react'
import ReactDOM from 'react-dom/client'
import { useDashboard, useTab, fmtUSD, fmtNum, fmtPct } from '../shared/data'
import type { DashboardData, TabKey } from '../shared/types'
import { KpiCard } from './components/KpiCard'
import type { Accent } from './components/KpiCard'
import { Overview } from './components/panels/Overview'
import { Sales } from './components/panels/Sales'
import { Customers } from './components/panels/Customers'
import { Products } from './components/panels/Products'
import './styles.css'

const TAB_LABELS: { key: TabKey; label: string }[] = [
    { key: 'overview', label: 'Visão Geral' },
    { key: 'sales', label: 'Vendas' },
    { key: 'customers', label: 'Clientes' },
    { key: 'products', label: 'Produtos' },
]

function Background() {
    return (
        <div className="aurora-bg" aria-hidden="true">
            <span className="b1" />
            <span className="b2" />
            <span className="b3" />
        </div>
    )
}

function Kpis({ d }: { d: DashboardData }) {
    const k = d.kpis
    const cards: { label: string; value: string; sub: string; accent: Accent }[] = [
        { label: 'Receita total', value: fmtUSD(k.total_revenue), sub: 'todo o período', accent: 'cyan' },
        { label: 'Pedidos', value: fmtNum(k.total_orders), sub: 'itens-de-pedido', accent: 'sky' },
        { label: 'Ticket médio', value: fmtUSD(k.aov, 2), sub: 'por pedido', accent: 'yellow' },
        { label: 'Clientes', value: fmtNum(d.customers.total), sub: 'base cadastrada', accent: 'emerald' },
        { label: 'Taxa devolução', value: fmtPct(k.return_rate), sub: 'pedidos devolvidos', accent: 'rose' },
        { label: 'Recompra', value: fmtPct(k.repeat_rate), sub: 'clientes recorrentes', accent: 'violet' },
    ]
    return (
        <section className="kpis">
            {cards.map((c) => (
                <KpiCard key={c.label} label={c.label} value={c.value} sub={c.sub} accent={c.accent} />
            ))}
        </section>
    )
}

function Panel({ tab, d }: { tab: TabKey; d: DashboardData }) {
    switch (tab) {
        case 'sales':
            return <Sales d={d} />
        case 'customers':
            return <Customers d={d} />
        case 'products':
            return <Products d={d} />
        case 'overview':
        default:
            return <Overview d={d} />
    }
}

function App() {
    const { data, loading, error } = useDashboard()
    const [tab, setTab] = useTab('overview')

    if (loading) {
        return (
            <div className="state">
                <div className="spinner" />
                <div className="msg">Carregando dados…</div>
            </div>
        )
    }
    if (error || !data) {
        return (
            <div className="state">
                <div className="msg err">Erro ao carregar dados</div>
                <div className="msg">{error || 'Sem dados disponíveis.'}</div>
            </div>
        )
    }

    const sub = `${fmtNum(data.kpis.total_orders)} pedidos · ${fmtNum(data.customers.total)} clientes · jan/2020 – mar/2026`

    return (
        <div className="aurora">
            <Background />
            <main className="wrap">
                <header className="head">
                    <div>
                        <p className="kicker">E-commerce Analytics</p>
                        <h1>Insights Dashboard</h1>
                        <p className="sub">{sub}</p>
                    </div>
                    <nav className="tabs">
                        {TAB_LABELS.map((t) => (
                            <button
                                key={t.key}
                                type="button"
                                className="tab-btn"
                                data-active={String(tab === t.key)}
                                onClick={() => setTab(t.key)}
                            >
                                {t.label}
                            </button>
                        ))}
                    </nav>
                </header>

                <Kpis d={data} />

                <Panel tab={tab} d={data} />

                <footer className="foot">
                    Fonte: tabelas do ServiceNow · agregado server-side · gráficos hand-drawn em SVG/CSS (sem biblioteca)
                </footer>
            </main>
        </div>
    )
}

const root = document.getElementById('root')
if (root)
    ReactDOM.createRoot(root).render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
    )
