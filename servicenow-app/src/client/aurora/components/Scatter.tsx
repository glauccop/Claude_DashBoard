import React from 'react'
import { color as palColor } from './palette'

export interface ScatterPoint {
    x: number
    y: number
    z: number
    name: string
    category: string
}

interface ScatterProps {
    points: ScatterPoint[]
    height?: number
    xLabel: string
    yLabel: string
    xMin: number
    xMax: number
}

export function Scatter({ points, height = 360, xLabel, yLabel, xMin, xMax }: ScatterProps) {
    const VW = 1000
    const P = { l: 54, r: 20, t: 16, b: 40 }
    const ys = points.map((p) => p.y)
    const yMax = Math.max(...ys) * 1.1 || 1
    const yMin = 0
    const zMax = Math.max(...points.map((p) => p.z)) || 1
    const xx = (v: number) => P.l + ((v - xMin) / (xMax - xMin || 1)) * (VW - P.l - P.r)
    const yy = (v: number) => P.t + (1 - (v - yMin) / (yMax - yMin || 1)) * (height - P.t - P.b)

    const grid: React.ReactNode[] = []
    const yLabels: React.ReactNode[] = []
    for (let g = 0; g <= 4; g++) {
        const val = yMin + (yMax - yMin) * (g / 4)
        const y = yy(val)
        grid.push(
            <line
                key={`g${g}`}
                x1={P.l}
                y1={y}
                x2={VW - P.r}
                y2={y}
                stroke="rgba(255,255,255,.08)"
                vectorEffect="non-scaling-stroke"
            />,
        )
        yLabels.push(
            <div className="ylab" key={`yl${g}`} style={{ left: 0, top: `${(y / height) * 100}%` }}>
                {val.toFixed(0)}%
            </div>,
        )
    }
    const xLabels: React.ReactNode[] = []
    for (let g = 0; g <= 5; g++) {
        const val = xMin + (xMax - xMin) * (g / 5)
        xLabels.push(
            <span key={`x${g}`} style={{ left: `${(xx(val) / VW) * 100}%` }}>
                {val.toFixed(1)}
            </span>,
        )
    }
    const circles = points.map((p, i) => {
        const r = 6 + Math.sqrt(p.z / zMax) * 26
        const c = palColor(i)
        return (
            <circle
                key={`${p.name}-${i}`}
                cx={xx(p.x)}
                cy={yy(p.y)}
                r={r}
                fill={c}
                fillOpacity={0.55}
                stroke={c}
                strokeWidth={1.2}
                className="hoverable"
            >
                <title>{`${p.name} · ${p.category} — ${p.x} estrelas · ${p.y}% dev · ${p.z} pedidos`}</title>
            </circle>
        )
    })

    return (
        <div className="scatter" style={{ height }}>
            <svg viewBox={`0 0 ${VW} ${height}`} style={{ width: '100%', height }}>
                {grid}
                {circles}
            </svg>
            {yLabels}
            <div className="xlabs" style={{ bottom: 18 }}>
                {xLabels}
            </div>
            <div className="x-title">{xLabel}</div>
            <div className="y-title">{yLabel}</div>
        </div>
    )
}
