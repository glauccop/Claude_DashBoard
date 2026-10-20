import React from 'react'
import { color } from './palette'

export interface BarDatum {
    name: string
    value: number
}

interface HBarsProps {
    data: BarDatum[]
    color?: string
    distributed?: boolean
    height?: number
    valFmt?: (v: number) => string
}

export function HBars({ data, color: fixed, distributed, height = 300, valFmt = (v) => String(v) }: HBarsProps) {
    const max = Math.max(...data.map((d) => d.value)) || 1
    return (
        <div className="hbars" style={{ minHeight: height }}>
            {data.map((d, i) => {
                const c = distributed ? color(i) : fixed || '#22d3ee'
                const w = ((d.value / max) * 100).toFixed(1)
                return (
                    <div className="hbar-row" key={`${d.name}-${i}`} title={`${d.name}: ${valFmt(d.value)}`}>
                        <div className="hbar-name">{d.name}</div>
                        <div className="hbar-track">
                            <div className="hbar-fill hoverable" style={{ width: `${w}%`, background: c }} />
                        </div>
                        <div className="hbar-val">{valFmt(d.value)}</div>
                    </div>
                )
            })}
        </div>
    )
}
