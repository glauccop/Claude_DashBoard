import React from 'react'

export interface LineSeries {
    name: string
    data: number[]
    color: string
    yFmt?: (v: number) => string
}

interface LineAreaProps {
    series: LineSeries[]
    categories: string[]
    height?: number
    area?: boolean
    dualAxis?: boolean
    yFmt?: (v: number) => string
    valFmt?: (v: number) => string
}

interface Scale {
    mx: number
    mn: number
}

export function LineArea({
    series,
    categories,
    height = 260,
    area = true,
    dualAxis = false,
    yFmt = (v) => String(Math.round(v)),
}: LineAreaProps) {
    const VW = 1000
    const P = { l: 54, r: dualAxis ? 54 : 16, t: 14, b: 34 }
    const n = categories.length

    const xs = (i: number) => P.l + (n <= 1 ? 0 : i / (n - 1)) * (VW - P.l - P.r)

    const scaleOf = (s: LineSeries): Scale => {
        let mx = Math.max(...s.data)
        const mn = Math.min(0, ...s.data)
        const sp = mx - mn || 1
        mx += sp * 0.08
        return { mx, mn }
    }
    const shared: Scale = (() => {
        const all = series.flatMap((s) => s.data)
        let mx = Math.max(...all)
        const mn = Math.min(0, ...all)
        const sp = mx - mn || 1
        mx += sp * 0.08
        return { mx, mn }
    })()
    const sc: Scale[] = series.map((s) => (dualAxis ? scaleOf(s) : shared))
    const ysOf = (v: number, si: number) =>
        P.t + (1 - (v - sc[si].mn) / (sc[si].mx - sc[si].mn || 1)) * (height - P.t - P.b)

    const GL = 4
    const gridLines: React.ReactNode[] = []
    const yLabels: React.ReactNode[] = []
    for (let g = 0; g <= GL; g++) {
        const y = P.t + (1 - g / GL) * (height - P.t - P.b)
        gridLines.push(
            <line
                key={`g${g}`}
                x1={P.l}
                y1={y}
                x2={VW - P.r}
                y2={y}
                stroke="rgba(255,255,255,.08)"
                strokeWidth={1}
                vectorEffect="non-scaling-stroke"
            />,
        )
        const lval = sc[0].mn + (sc[0].mx - sc[0].mn) * (g / GL)
        yLabels.push(
            <div className="ylab" key={`yl${g}`} style={{ left: 0, top: `${(y / height) * 100}%` }}>
                {yFmt(lval)}
            </div>,
        )
        if (dualAxis && series[1]) {
            const rval = sc[1].mn + (sc[1].mx - sc[1].mn) * (g / GL)
            yLabels.push(
                <div
                    className="ylab"
                    key={`yr${g}`}
                    style={{ right: 0, left: 'auto', top: `${(y / height) * 100}%`, color: series[1].color }}
                >
                    {(series[1].yFmt || yFmt)(rval)}
                </div>,
            )
        }
    }

    const paths: React.ReactNode[] = []
    series.forEach((s, si) => {
        const pts = s.data.map((v, i) => `${xs(i)},${ysOf(v, si)}`).join(' ')
        if (area && si === 0) {
            const base = ysOf(sc[si].mn, si)
            const ap =
                `M ${xs(0)},${base} L ` +
                s.data.map((v, i) => `${xs(i)},${ysOf(v, si)}`).join(' L ') +
                ` L ${xs(n - 1)},${base} Z`
            paths.push(<path className="area" key={`a${si}`} d={ap} fill={s.color} />)
        }
        paths.push(
            <polyline
                key={`p${si}`}
                points={pts}
                fill="none"
                stroke={s.color}
                strokeWidth={2.5}
                vectorEffect="non-scaling-stroke"
                strokeLinejoin="round"
                strokeLinecap="round"
            />,
        )
    })

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
            {series.length > 1 ? (
                <div className="legend">
                    {series.map((s) => (
                        <span className="li" key={s.name}>
                            <i className="sw" style={{ background: s.color }} />
                            {s.name}
                        </span>
                    ))}
                </div>
            ) : null}
            <div className="chart-rel" style={{ height }}>
                <svg viewBox={`0 0 ${VW} ${height}`} preserveAspectRatio="none" style={{ height }}>
                    {gridLines}
                    {paths}
                </svg>
                {yLabels}
                <div className="xlabs">{xLabels}</div>
            </div>
        </div>
    )
}
