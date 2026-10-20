// NEXUS // TERMINAL — ApexCharts theme (ported from nexus-terminal-kit/chart-theme.js)
// Usage:
//   const opt = NX.merge(NX.base, { chart:{type:'area',height:300}, series:[...] })

const C = {
    cyan: '#00f5d4',
    magenta: '#ff2d95',
    amber: '#ffb000',
    violet: '#9b5cff',
    blue: '#2de2ff',
    green: '#39ff88',
    red: '#ff3b6b',
    grid: 'rgba(0,255,200,.10)',
    dim: '#5d7d78',
    mute: '#3a534f',
}

// ordered palette for multi-series charts
const palette: string[] = [C.cyan, C.magenta, C.amber, C.violet, C.blue, C.green, C.red]

const base: any = {
    chart: {
        toolbar: { show: false },
        zoom: { enabled: false },
        fontFamily: "'JetBrains Mono',monospace",
        foreColor: C.dim,
        background: 'transparent',
        animations: { enabled: true, easing: 'easeinout', speed: 700 },
    },
    colors: palette,
    grid: { borderColor: C.grid, strokeDashArray: 3, padding: { left: 6, right: 6 } },
    tooltip: { theme: 'dark', style: { fontFamily: "'JetBrains Mono',monospace" } },
    dataLabels: { enabled: false },
    legend: { labels: { colors: C.dim }, fontFamily: "'JetBrains Mono',monospace" },
    stroke: { width: 2, curve: 'smooth' },
}

// a cyan->magenta gradient fill, handy for area/line series
const neonFill: any = {
    type: 'gradient',
    gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.45,
        opacityTo: 0.02,
        colorStops: [
            [
                { offset: 0, color: C.cyan, opacity: 0.55 },
                { offset: 100, color: C.magenta, opacity: 0.05 },
            ],
        ],
    },
}

// heatmap color scale (peaks glow magenta) — drop into plotOptions.heatmap.colorScale
function heatScale(max: number): any {
    return {
        ranges: [
            { from: 0, to: max * 0.25, color: '#06283d' },
            { from: max * 0.25, to: max * 0.5, color: '#0c5c6b' },
            { from: max * 0.5, to: max * 0.75, color: C.cyan },
            { from: max * 0.75, to: max * 1.01, color: C.magenta },
        ],
    }
}

// shallow-merge helper (one level deep for chart/grid/etc.)
function merge(a: any, b: any): any {
    const out: any = { ...a, ...b }
    for (const k of Object.keys(b || {})) {
        if (b[k] && typeof b[k] === 'object' && !Array.isArray(b[k]) && a[k]) {
            out[k] = { ...a[k], ...b[k] }
        }
    }
    return out
}

export const NX = { C, palette, base, neonFill, heatScale, merge }
