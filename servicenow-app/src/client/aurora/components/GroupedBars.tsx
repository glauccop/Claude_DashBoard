import React from 'react'

interface SeriesDef<T> {
    key: keyof T
    name: string
    color: string
    fmt: (v: number) => string
}

interface GroupedBarsProps<T> {
    data: T[]
    nameKey: keyof T
    series: SeriesDef<T>[]
    height?: number
}

export function GroupedBars<T extends Record<string, unknown>>({
    data,
    nameKey,
    series,
    height = 280,
}: GroupedBarsProps<T>) {
    const maxes = series.map((s) => Math.max(...data.map((d) => Number(d[s.key]))) || 1)
    const plot = height - 30
    return (
        <div>
            <div className="legend">
                {series.map((s) => (
                    <span className="li" key={s.name}>
                        <i className="sw" style={{ background: s.color }} />
                        {s.name}
                    </span>
                ))}
            </div>
            <div className="vbars-plot" style={{ height: plot, gap: 16 }}>
                {data.map((d, i) => (
                    <div className="vbar-col" key={`${String(d[nameKey])}-${i}`} style={{ justifyContent: 'flex-end' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, width: '100%', height: '100%' }}>
                            {series.map((s, si) => {
                                const v = Number(d[s.key])
                                const h = ((v / maxes[si]) * 100).toFixed(1)
                                return (
                                    <div
                                        key={s.name}
                                        className="vbar-fill hoverable"
                                        style={{ flex: 1, minWidth: 6, height: `${h}%`, background: s.color }}
                                        title={`${String(d[nameKey])} — ${s.name}: ${s.fmt(v)}`}
                                    />
                                )
                            })}
                        </div>
                    </div>
                ))}
            </div>
            <div className="vbars-labels">
                {data.map((d, i) => (
                    <div className="vbar-label truncate" key={`${String(d[nameKey])}-l-${i}`} title={String(d[nameKey])}>
                        {String(d[nameKey])}
                    </div>
                ))}
            </div>
        </div>
    )
}
