import React from 'react'

export interface HeatRow {
    year: number
    values: number[]
}

interface HeatmapProps {
    rows: HeatRow[]
    months: string[]
    valFmt?: (v: number) => string
}

export function Heatmap({ rows, months, valFmt = (v) => String(v) }: HeatmapProps) {
    const all = rows.flatMap((r) => r.values).filter((v) => v > 0)
    const max = Math.max(...all) || 1
    const min = Math.min(...all) || 0
    return (
        <div className="heatmap">
            <table>
                <thead>
                    <tr>
                        <th />
                        {months.map((m) => (
                            <th key={m}>{m}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((r) => (
                        <tr key={r.year}>
                            <td className="yr">{r.year}</td>
                            {r.values.map((v, i) => {
                                if (v <= 0) {
                                    return (
                                        <td key={i}>
                                            <div className="cell" style={{ background: 'rgba(255,255,255,.04)' }} />
                                        </td>
                                    )
                                }
                                const t = (v - min) / (max - min || 1)
                                const op = (0.18 + t * 0.82).toFixed(2)
                                return (
                                    <td key={i}>
                                        <div
                                            className="cell hoverable"
                                            style={{ background: `rgba(34,211,238,${op})` }}
                                            title={`${months[i]} ${r.year}: ${valFmt(v)}`}
                                        />
                                    </td>
                                )
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
