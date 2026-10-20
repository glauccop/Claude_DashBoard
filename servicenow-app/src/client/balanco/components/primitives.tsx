import React from 'react'

// Drop-figure / big stat block
export function Figure({ lbl, big, sub }: { lbl: string; big: React.ReactNode; sub?: string }) {
    return (
        <div className="figure-block">
            <div className="lbl">{lbl}</div>
            <div className="big">{big}</div>
            {sub ? <div className="sub">{sub}</div> : null}
        </div>
    )
}

export interface BarItem {
    nm: string
    v: number
    disp: string
}

// Editorial bar list with animated tracks
export function BarList({ items }: { items: BarItem[] }) {
    const mx = Math.max(...items.map((i) => i.v), 1)
    return (
        <ul className="barlist">
            {items.map((i) => (
                <li key={i.nm}>
                    <span className="nm">{i.nm}</span>
                    <span className="vl">{i.disp}</span>
                    <span className="track">
                        <i style={{ ['--w' as any]: `${((i.v / mx) * 100).toFixed(1)}%` }} />
                    </span>
                </li>
            ))}
        </ul>
    )
}

// Column wrapper: hairline frame, source label + headline
export function Col({
    span,
    src,
    title,
    children,
    delay = 0,
}: {
    span: string
    src: string
    title: string
    children: React.ReactNode
    delay?: number
}) {
    return (
        <div className={`${span} reveal col`} style={{ animationDelay: `${delay}s` }}>
            <span className="src">{src}</span>
            <h3>{title}</h3>
            {children}
        </div>
    )
}

export function rk(i: number) {
    return <span className="rk">{String(i + 1).padStart(2, '0')}</span>
}
