import React from 'react'
import { color as palColor } from './palette'

export interface DonutDatum {
    name: string
    value: number
    color?: string
}

interface DonutProps {
    data: DonutDatum[]
    centerTop?: string
    centerSub?: string
    valFmt?: (v: number) => string
}

export function Donut({ data, centerTop, centerSub, valFmt = (v) => String(v) }: DonutProps) {
    const total = data.reduce((a, d) => a + d.value, 0) || 1
    const R = 70
    const C = 90
    const CIRC = 2 * Math.PI * R
    let off = 0
    const segs = data.map((d, i) => {
        const frac = d.value / total
        const len = frac * CIRC
        const c = d.color || palColor(i)
        const node = (
            <circle
                key={`${d.name}-${i}`}
                cx={C}
                cy={C}
                r={R}
                fill="none"
                stroke={c}
                strokeWidth={26}
                strokeDasharray={`${len} ${CIRC - len}`}
                strokeDashoffset={-off}
                transform={`rotate(-90 ${C} ${C})`}
                className="hoverable"
            >
                <title>{`${d.name}: ${valFmt(d.value)} (${(frac * 100).toFixed(1)}%)`}</title>
            </circle>
        )
        off += len
        return node
    })

    return (
        <div className="donut">
            <div className="donut-ring">
                <svg viewBox="0 0 180 180" style={{ width: 180, height: 180 }}>
                    {segs}
                </svg>
                <div className="donut-center">
                    <div className="dc-top">{centerTop ?? total.toLocaleString('pt-BR')}</div>
                    <div className="dc-sub">{centerSub ?? ''}</div>
                </div>
            </div>
            <div className="donut-legend">
                {data.map((d, i) => (
                    <div className="row" key={`${d.name}-l-${i}`}>
                        <span className="name">
                            <i className="sw" style={{ background: d.color || palColor(i), width: 10, height: 10, borderRadius: 3, display: 'inline-block' }} />
                            {d.name}
                        </span>
                        <span className="pct">{((d.value / total) * 100).toFixed(1)}%</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
