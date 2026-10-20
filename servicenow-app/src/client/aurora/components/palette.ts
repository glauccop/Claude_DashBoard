// Shared accent palette + small helpers for the Aurora charts.

export const PAL = [
    '#22d3ee',
    '#34d399',
    '#facc15',
    '#38bdf8',
    '#fbbf24',
    '#a78bfa',
    '#f472b6',
    '#4ade80',
    '#fb923c',
    '#60a5fa',
    '#e879f9',
    '#2dd4bf',
    '#fb7185',
    '#c084fc',
]

export const MONTHS = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']

export const color = (i: number) => PAL[i % PAL.length]
