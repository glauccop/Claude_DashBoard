import React from 'react'

interface ComboSeries {
    name: string
    data: number[]
    color: string
}

interface ComboProps {
    categories: string[]
    bar: ComboSeries
    line: ComboSeries
    height?: number
    barFmt?: (v: number) => string
    lineFmt?: (v: number) => string
}

export function Combo({
    categories,
    bar,
    line,
    height = 300,
    barFmt = (v) => String(v),
    lineFmt = (v) => String(v),
}: ComboProps) {
    const VW = 1000
    const P = { l: 46, r: 16, t: 14, b: 30 }
    const n = categories.length
    const plot = height - P.b
    const barMax = Math.max(...bar.data) || 1
    const lineMax = Math.max(...line.data) || 1
    const xs = (i: number) => P.l + (n <= 1 ? 0 : i / (n - 1)) * (VW - P.l - P.r)
    const lys = (v: number) => P.t + (1 - v / (lineMax * 1.1)) * (plot - P.t)
    const lpts = line.data.map((v, i) => `${xs(i)},${lys(v)}`).join(' ')

    const step = Math.max(1, Math.ceil(n / 7))
    const xLabels: React.ReactNode[] = []
    for (let i = 0; i < n; i += step) {
        xLabels.push(
            <span key={`x${i}`} style={{ left: `${(xs(i) / VW) * 100}%` }}>
                {categories[i]}
            </span>,
        )
    }

    return (
        <div>
            <div className="legend">
                <span className="li">
                    <i className="sw" style={{ background: bar.color }} />
                    {bar.name}
                </span>
                <span className="li">
                    <i className="sw line" style={{ background: line.color }} />
                    {line.name}
                </span>
            </div>
            <div className="chart-rel" style={{ height }}>
                <div
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 14,
                        height: plot - 14,
                        display: 'flex',
                        alignItems: 'flex-end',
                        gap: 4,
                        padding: `0 ${P.r}px 0 ${P.l}px`,
                    }}
                >
                    {bar.data.map((v, i) => {
                        const h = ((v / barMax) * 100).toFixed(1)
                        return (
                            <div
                                key={i}
                                style={{ flex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', height: '100%' }}
                            >
                                <div
                                    className="vbar-fill hoverable"
                                    style={{ width: '60%', height: `${h}%`, background: bar.color, borderRadius: '4px 4px 0 0' }}
                                    title={`${categories[i]} — ${bar.name}: ${barFmt(v)} · ${line.name}: ${lineFmt(line.data[i])}`}
                                />
                            </div>
                        )
                    })}
                </div>
                <svg
                    viewBox={`0 0 ${VW} ${height}`}
                    preserveAspectRatio="none"
                    style={{ position: 'absolute', inset: 0, height, pointerEvents: 'none' }}
                >
                    <polyline
                        points={lpts}
                        fill="none"
                        stroke={line.color}
                        strokeWidth={2.5}
                        vectorEffect="non-scaling-stroke"
                        strokeLinejoin="round"
                    />
                </svg>
                <div className="xlabs" style={{ bottom: 0 }}>
                    {xLabels}
                </div>
            </div>
        </div>
    )
}
