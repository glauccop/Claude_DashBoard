import React from 'react'
import { color } from './palette'
import type { BarDatum } from './HBars'

interface VBarsProps {
    data: BarDatum[]
    color?: string
    distributed?: boolean
    height?: number
    valFmt?: (v: number) => string
    truncate?: boolean
}

export function VBars({
    data,
    color: fixed,
    distributed,
    height = 280,
    valFmt = (v) => String(v),
    truncate,
}: VBarsProps) {
    const max = Math.max(...data.map((d) => d.value)) || 1
    const plot = height - 30
    return (
        <div>
            <div className="vbars-plot" style={{ height: plot }}>
                {data.map((d, i) => {
                    const c = distributed ? color(i) : fixed || '#22d3ee'
                    const h = ((d.value / max) * 100).toFixed(1)
                    return (
                        <div className="vbar-col" key={`${d.name}-${i}`} title={`${d.name}: ${valFmt(d.value)}`}>
                            <div className="vbar-fill hoverable" style={{ height: `${h}%`, background: c }} />
                        </div>
                    )
                })}
            </div>
            <div className="vbars-labels">
                {data.map((d, i) => (
                    <div className={`vbar-label${truncate ? ' truncate' : ''}`} key={`${d.name}-l-${i}`} title={d.name}>
                        {d.name}
                    </div>
                ))}
            </div>
        </div>
    )
}
