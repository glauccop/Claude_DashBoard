import React from 'react'
import ReactDOM from 'react-dom/client'
import { fmtNum } from '../shared/data'
import { PREVIEW_AURORA, PREVIEW_BALANCO, PREVIEW_NEXUS } from './previews'
import './styles.css'

interface Card {
    href: string
    eyebrow: string
    title: string
    desc: string
    tags: string[]
    cls: string
    preview: string
}

const CARDS: Card[] = [
    {
        href: '/x_snc_dashboard_se_aurora.do',
        eyebrow: 'Design System',
        title: 'Aurora',
        desc: 'Glassmorphism em tema escuro, cartões translúcidos e gráficos SVG desenhados à mão. Visual limpo e moderno.',
        tags: ['Glassmorphism', 'SVG', 'Dark'],
        cls: 'c-aurora',
        preview: PREVIEW_AURORA,
    },
    {
        href: '/x_snc_dashboard_se_balanco.do',
        eyebrow: 'Editorial',
        title: 'O Balanço',
        desc: 'Estética de revista impressa: tipografia serifada, colunas justificadas e gráficos ECharts. Data journalism.',
        tags: ['Editorial', 'ECharts', 'Serif'],
        cls: 'c-balanco',
        preview: PREVIEW_BALANCO,
    },
    {
        href: '/x_snc_dashboard_se_nexus.do',
        eyebrow: 'Synthwave',
        title: 'NEXUS // Terminal',
        desc: 'HUD retro-futurista: neon ciano + magenta, scanlines, brackets e ApexCharts. Terminal de trading sci-fi.',
        tags: ['Neon', 'ApexCharts', 'HUD'],
        cls: 'c-nexus',
        preview: PREVIEW_NEXUS,
    },
]

const STATS = [
    { v: fmtNum(25000), l: 'pedidos' },
    { v: fmtNum(8000), l: 'clientes' },
    { v: '$3.13M', l: 'receita' },
    { v: 'Jan 2020 – Mar 2026', l: 'período' },
]

function Portal() {
    return (
        <div className="portal">
            <div className="fx fx-a" />
            <div className="fx fx-b" />
            <div className="fx fx-c" />
            <div className="grain" />
            <main className="wrap">
                <header className="head">
                    <p className="kicker">ServiceNow · Dashboard ServiceNow</p>
                    <h1>
                        Mesmo dado, <em>três interpretações</em> de design
                    </h1>
                    <p className="lede">
                        Um único dataset de e-commerce, reconstruído ao vivo a partir das tabelas do ServiceNow e
                        renderizado em três linguagens visuais distintas.
                    </p>
                    <ul className="stats">
                        {STATS.map((s) => (
                            <li key={s.l}>
                                <span className="sv">{s.v}</span>
                                <span className="sl">{s.l}</span>
                            </li>
                        ))}
                    </ul>
                </header>
                <section className="cards">
                    {CARDS.map((c, i) => (
                        <a key={c.title} className={`card ${c.cls}`} href={c.href} style={{ animationDelay: `${i * 90}ms` }}>
                            <div className="shot">
                                <img src={c.preview} alt={`Preview ${c.title}`} loading="lazy" />
                            </div>
                            <div className="card-glow" />
                            <p className="eyebrow">{c.eyebrow}</p>
                            <h2>{c.title}</h2>
                            <p className="desc">{c.desc}</p>
                            <ul className="tags">
                                {c.tags.map((t) => (
                                    <li key={t}>{t}</li>
                                ))}
                            </ul>
                            <span className="open">Abrir dashboard →</span>
                        </a>
                    ))}
                </section>
            </main>
        </div>
    )
}

const root = document.getElementById('root')
if (root) ReactDOM.createRoot(root).render(<React.StrictMode><Portal /></React.StrictMode>)
