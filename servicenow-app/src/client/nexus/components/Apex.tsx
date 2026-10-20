import React, { useEffect, useRef } from 'react'
import ApexCharts from 'apexcharts'

// ---- ApexCharts wrapper (always destroys on unmount) ----
export function Apex({ options }: { options: any }) {
    const ref = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (!ref.current) return
        const chart = new ApexCharts(ref.current, options)
        chart.render()
        return () => chart.destroy()
    }, [options])
    return <div ref={ref} />
}

// ---- HUD panel with corner brackets + LED ----
interface NxPanelProps {
    title?: string
    tag?: string
    variant?: 'cyan' | 'magenta'
    className?: string
    children: React.ReactNode
}

export function NxPanel({ title, tag, variant = 'cyan', className = '', children }: NxPanelProps) {
    const mag = variant === 'magenta' ? ' mag' : ''
    return (
        <div className={`nx-panel${mag} ${className}`.trim()}>
            <span className="nx-br tl" />
            <span className="nx-br tr" />
            <span className="nx-br bl" />
            <span className="nx-br br2" />
            {(title || tag) && (
                <div className="nx-phead">
                    <span className="nx-led" />
                    {title && <h3>{title}</h3>}
                    {tag && <span className="nx-tag">{tag}</span>}
                </div>
            )}
            {children}
        </div>
    )
}

// ---- KPI block (rendered inside its own panel) ----
interface NxKpiProps {
    label: string
    value: string
    sub?: React.ReactNode
    variant?: 'cyan' | 'magenta'
    delay?: number
}

export function NxKpi({ label, value, sub, variant = 'cyan', delay = 0 }: NxKpiProps) {
    const mag = variant === 'magenta' ? ' mag' : ''
    return (
        <div
            className={`nx-panel${mag} nx-kpi${mag} nx-col-4 nx-reveal`}
            style={{ animationDelay: `${delay}ms` }}
        >
            <span className="nx-br tl" />
            <span className="nx-br tr" />
            <span className="nx-br bl" />
            <span className="nx-br br2" />
            <div className="lab">{label}</div>
            <div className="val">{value}</div>
            {sub && <div className="sub">{sub}</div>}
        </div>
    )
}

// ---- custom animated bar list ----
export interface NxBarRow {
    nm: string
    v: number
    label: string
}

export function NxBars({ rows, amber = false }: { rows: NxBarRow[]; amber?: boolean }) {
    const max = Math.max(...rows.map((r) => r.v), 1)
    return (
        <div className="nx-bars">
            {rows.map((r, i) => (
                <div className="nx-bar" key={r.nm + i}>
                    <span className="nm">{r.nm}</span>
                    <span className="track">
                        <span
                            className={`fill${amber ? ' amber' : ''}`}
                            style={{
                                width: `${((r.v / max) * 100).toFixed(1)}%`,
                                transitionDelay: `${i * 60}ms`,
                            }}
                        />
                    </span>
                    <span className="vv">{r.label}</span>
                </div>
            ))}
        </div>
    )
}

// ---- data table (top revenue / worst returns) ----
export interface NxTableRow {
    name: string
    category: string
    orders: number
    revenue: number
    avg_rating: number
    return_rate: number
}

interface NxTableProps {
    rows: NxTableRow[]
    risk?: boolean
    fmtN: (v: number) => string
    fmtK: (v: number) => string
}

export function NxTable({ rows, risk = false, fmtN, fmtK }: NxTableProps) {
    return (
        <div className="nx-scroll">
            <table className="nx-table">
                <thead>
                    <tr>
                        <th>SKU</th>
                        <th className="r">PED</th>
                        <th className="r">RECEITA</th>
                        <th className="r">★</th>
                        <th className="r">DEV%</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((p, i) => (
                        <tr key={p.name + i}>
                            <td>
                                <span className="pn">{p.name}</span>
                                <br />
                                <span className="nx-pill">{p.category}</span>
                            </td>
                            <td className="r">{fmtN(p.orders)}</td>
                            <td className="r" style={{ color: '#fff' }}>
                                {fmtK(p.revenue)}
                            </td>
                            <td className="r">{p.avg_rating.toFixed(1)}</td>
                            <td className={`r ${risk || p.return_rate > 10 ? 'nx-hot' : 'nx-good'}`}>
                                {p.return_rate.toFixed(0)}%
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
