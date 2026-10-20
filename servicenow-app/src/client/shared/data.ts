import { useEffect, useState } from 'react'
import type { DashboardData, TabKey } from './types'
import { TABS } from './types'

export const DATA_URL = '/api/x_snc_dashboard_se/dashboard/data'

export async function fetchDashboard(): Promise<DashboardData> {
    const token = window.g_ck || ''
    const res = await fetch(DATA_URL, {
        headers: { 'X-UserToken': token, Accept: 'application/json' },
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return res.json()
}

export interface DashboardState {
    data: DashboardData | null
    loading: boolean
    error: string | null
}

export function useDashboard(): DashboardState {
    const [state, setState] = useState<DashboardState>({ data: null, loading: true, error: null })
    useEffect(() => {
        let alive = true
        fetchDashboard()
            .then((data) => alive && setState({ data, loading: false, error: null }))
            .catch((e) => alive && setState({ data: null, loading: false, error: String(e?.message || e) }))
        return () => {
            alive = false
        }
    }, [])
    return state
}

// Aba atual via ?tab=  (URLSearchParams)
export function useTab(initial: TabKey = 'overview'): [TabKey, (t: TabKey) => void] {
    const read = (): TabKey => {
        const t = new URLSearchParams(window.location.search).get('tab') as TabKey
        return TABS.includes(t) ? t : initial
    }
    const [tab, setTabState] = useState<TabKey>(read)
    const setTab = (t: TabKey) => {
        const url = new URL(window.location.href)
        url.searchParams.set('tab', t)
        window.history.replaceState({}, '', url.toString())
        setTabState(t)
    }
    return [tab, setTab]
}

// Regex-based formatters — locale-independent (avoids pt-BR dot-as-thousands from browser Intl)
function addCommas(int: string): string {
    return int.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const fmtNum = (v: number): string => addCommas(Math.round(v).toString())

export const fmtUSD = (v: number, frac = 0): string => {
    const fixed = Math.abs(v).toFixed(frac)
    const [int, dec] = fixed.split('.')
    const body = addCommas(int) + (dec !== undefined ? '.' + dec : '')
    return (v < 0 ? '-$' : '$') + body
}

export const fmtPct = (v: number, frac = 1) => `${v.toFixed(frac)}%`
export const fmtCompact = (v: number) =>
    v >= 1e6 ? `$${(v / 1e6).toFixed(2)}M` : v >= 1e3 ? `$${(v / 1e3).toFixed(1)}k` : `$${v.toFixed(0)}`
