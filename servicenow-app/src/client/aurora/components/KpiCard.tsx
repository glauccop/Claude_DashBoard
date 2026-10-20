import React from 'react'

export type Accent = 'cyan' | 'sky' | 'yellow' | 'emerald' | 'rose' | 'violet'

interface KpiCardProps {
    label: string
    value: string
    sub?: string
    accent: Accent
}

export function KpiCard({ label, value, sub, accent }: KpiCardProps) {
    return (
        <div className={`kpi acc-${accent}`}>
            <div className="kpi-top">
                <span className="kpi-label">{label}</span>
            </div>
            <div>
                <div className="kpi-value">{value}</div>
                {sub ? <div className="kpi-sub">{sub}</div> : null}
            </div>
        </div>
    )
}
