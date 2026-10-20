import React from 'react'
import ReactDOM from 'react-dom/client'
import { useDashboard, useTab } from '../shared/data'
import type { TabKey } from '../shared/types'
import { Overview, Sales, Customers, Products } from './components/sections'
import './styles.css'

const NAV: { key: TabKey; no: string; label: string }[] = [
    { key: 'overview', no: 'I.', label: 'Panorama' },
    { key: 'sales', no: 'II.', label: 'Vendas' },
    { key: 'customers', no: 'III.', label: 'Clientes' },
    { key: 'products', no: 'IV.', label: 'Produtos' },
]

function Balanco() {
    const { data, loading, error } = useDashboard()
    const [tab, setTab] = useTab('overview')

    return (
        <div className="balanco">
            <div className="grain" />

            <header className="masthead">
                <div className="wrap">
                    <div className="dateline">
                        <span>Vol. VI · No. 25.000</span>
                        <span>Edição Anual · MMXXVI</span>
                        <span>Comércio &amp; Consumo</span>
                    </div>
                    <h1>
                        O Balanço<em>.</em>
                    </h1>
                    <div className="subhead">
                        <b>Revista de Dados</b>
                        <span>Uma análise editorial de 25 mil pedidos, oito mil clientes e seis anos de comércio.</span>
                        <b>USD</b>
                    </div>
                </div>
            </header>

            <nav className="tabs">
                <div className="wrap">
                    {NAV.map((n) => (
                        <button
                            key={n.key}
                            className={tab === n.key ? 'active' : ''}
                            onClick={() => {
                                setTab(n.key)
                                window.scrollTo({ top: 0, behavior: 'smooth' })
                            }}
                        >
                            <span className="no">{n.no}</span>
                            {n.label}
                        </button>
                    ))}
                </div>
            </nav>

            {loading ? (
                <div className="loading">Preparando a edição…</div>
            ) : error || !data ? (
                <div className="loading">Não foi possível carregar os dados.</div>
            ) : (
                <main className="wrap">
                    {tab === 'overview' && <Overview data={data} />}
                    {tab === 'sales' && <Sales data={data} />}
                    {tab === 'customers' && <Customers data={data} />}
                    {tab === 'products' && <Products data={data} />}
                </main>
            )}

            <footer>
                <div className="wrap">
                    <span>O Balanço — Revista de Dados do Comércio</span>
                    <span>Composto em Fraunces &amp; Newsreader</span>
                    <span>Fonte: ServiceNow · © MMXXVI</span>
                </div>
            </footer>
        </div>
    )
}

const root = document.getElementById('root')
if (root)
    ReactDOM.createRoot(root).render(
        <React.StrictMode>
            <Balanco />
        </React.StrictMode>
    )
