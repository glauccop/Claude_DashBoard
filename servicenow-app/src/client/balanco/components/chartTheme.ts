import * as echarts from 'echarts'
import { fmtNum, fmtCompact } from '../../shared/data'
import type { DashboardData } from '../../shared/types'

export const PAL = [
    '#b3331f',
    '#2f5d57',
    '#b88a2e',
    '#33506e',
    '#5a3550',
    '#7a6f5d',
    '#9e5b3a',
    '#3f6b4c',
    '#8a4257',
    '#566e8a',
]
export const INK = '#1b1714'
export const SOFT = '#4a423a'
export const RULE = '#c9bba4'
export const PAPER = '#f3ece0'
export const RED = '#b3331f'

export const baseTextStyle = { fontFamily: 'Archivo, sans-serif', color: SOFT, fontSize: 11 }

export const axisCommon: any = {
    axisLine: { lineStyle: { color: INK } },
    axisTick: { show: false },
    axisLabel: { fontFamily: 'Archivo, sans-serif', color: SOFT, fontSize: 11 },
    splitLine: { lineStyle: { color: RULE, type: 'dashed' } },
}

export const tooltipStyle: any = {
    backgroundColor: '#1b1714',
    borderWidth: 0,
    padding: [8, 12],
    textStyle: { color: '#f3ece0', fontFamily: 'Archivo, sans-serif', fontSize: 12 },
    extraCssText: 'border-radius:2px;box-shadow:none;',
}

const fmtK = fmtCompact

// ---------- OVERVIEW ----------
export function revTrendOption(monthly: DashboardData['monthly']): any {
    return {
        grid: { left: 54, right: 18, top: 24, bottom: 40 },
        tooltip: { trigger: 'axis', ...tooltipStyle, valueFormatter: (v: number) => fmtK(v) },
        xAxis: {
            type: 'category',
            data: monthly.map((x) => x.label),
            ...axisCommon,
            axisLabel: { ...axisCommon.axisLabel, interval: 11, formatter: (v: string) => v.split(' ')[1] },
        },
        yAxis: { type: 'value', ...axisCommon, axisLabel: { ...axisCommon.axisLabel, formatter: (v: number) => fmtK(v) } },
        series: [
            {
                type: 'line',
                data: monthly.map((x) => x.revenue),
                smooth: true,
                symbol: 'none',
                lineStyle: { color: RED, width: 2.4 },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: 'rgba(179,51,31,0.22)' },
                        { offset: 1, color: 'rgba(179,51,31,0)' },
                    ]),
                },
            },
        ],
    }
}

export function catShareOption(cats: DashboardData['sales']['by_category']): any {
    return {
        tooltip: { ...tooltipStyle, trigger: 'item', valueFormatter: (v: number) => fmtK(v) },
        series: [
            {
                type: 'pie',
                radius: ['48%', '78%'],
                center: ['50%', '48%'],
                data: cats.map((c, i) => ({ name: c.name, value: c.revenue, itemStyle: { color: PAL[i % PAL.length] } })),
                label: { show: false },
                itemStyle: { borderColor: PAPER, borderWidth: 2 },
            },
        ],
    }
}

// ---------- SALES ----------
export function seasonOption(s: DashboardData['sales']['seasonality']): any {
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
    const hd: number[][] = []
    let mn = Infinity
    let mx = -Infinity
    s.forEach((row, yi) =>
        row.months.forEach((v, mi) => {
            hd.push([mi, yi, v])
            mn = Math.min(mn, v)
            mx = Math.max(mx, v)
        })
    )
    return {
        grid: { left: 46, right: 14, top: 14, bottom: 50 },
        tooltip: {
            ...tooltipStyle,
            formatter: (p: any) => `${months[p.value[0]]} ${s[p.value[1]].year}<br>${fmtK(p.value[2])}`,
        },
        xAxis: { type: 'category', data: months, ...axisCommon, splitLine: { show: false } },
        yAxis: { type: 'category', data: s.map((r) => r.year), ...axisCommon, splitLine: { show: false } },
        visualMap: {
            min: mn,
            max: mx,
            show: false,
            inRange: { color: ['#f0e7d8', '#d8c8ab', '#b88a2e', '#9e5b3a', '#b3331f'] },
        },
        series: [{ type: 'heatmap', data: hd, itemStyle: { borderColor: PAPER, borderWidth: 1.5 } }],
    }
}

export function deviceOption(dev: DashboardData['sales']['by_device']): any {
    return {
        tooltip: { ...tooltipStyle, trigger: 'item', valueFormatter: (v: number) => fmtK(v) },
        series: [
            {
                type: 'pie',
                radius: ['0%', '72%'],
                center: ['50%', '50%'],
                roseType: 'radius',
                data: dev.map((c, i) => ({
                    name: c.name,
                    value: c.revenue,
                    itemStyle: { color: [RED, '#2f5d57', '#b88a2e'][i % 3] },
                })),
                label: { fontFamily: 'Archivo', color: INK, fontSize: 11, formatter: '{b}' },
                itemStyle: { borderColor: PAPER, borderWidth: 2 },
            },
        ],
    }
}

export function dowOption(dw: DashboardData['sales']['by_dow']): any {
    const dlbl: Record<string, string> = {
        Monday: 'Seg',
        Tuesday: 'Ter',
        Wednesday: 'Qua',
        Thursday: 'Qui',
        Friday: 'Sex',
        Saturday: 'Sáb',
        Sunday: 'Dom',
    }
    return {
        grid: { left: 8, right: 8, top: 14, bottom: 24 },
        tooltip: { ...tooltipStyle, trigger: 'axis', valueFormatter: (v: number) => fmtK(v) },
        xAxis: {
            type: 'category',
            data: dw.map((x) => dlbl[x.name] || x.name),
            ...axisCommon,
            splitLine: { show: false },
        },
        yAxis: { type: 'value', show: false, scale: true },
        series: [{ type: 'bar', data: dw.map((x) => x.revenue), itemStyle: { color: INK }, barWidth: '58%' }],
    }
}

export function returnOption(rm: DashboardData['sales']['return_by_month']): any {
    return {
        grid: { left: 44, right: 16, top: 20, bottom: 40 },
        tooltip: { ...tooltipStyle, trigger: 'axis', valueFormatter: (v: number) => v + '%' },
        xAxis: {
            type: 'category',
            data: rm.map((x) => x.label),
            ...axisCommon,
            axisLabel: { ...axisCommon.axisLabel, interval: 11, formatter: (v: string) => v.split(' ')[1] },
        },
        yAxis: { type: 'value', ...axisCommon, axisLabel: { ...axisCommon.axisLabel, formatter: (v: number) => v + '%' } },
        series: [
            {
                type: 'line',
                data: rm.map((x) => x.return_rate),
                smooth: true,
                symbol: 'none',
                lineStyle: { color: '#5a3550', width: 2.2 },
                markLine: {
                    silent: true,
                    symbol: 'none',
                    data: [{ type: 'average' }],
                    lineStyle: { color: RED, type: 'dashed' },
                    label: { fontFamily: 'Archivo', fontSize: 10, color: RED, formatter: 'média' },
                },
            },
        ],
    }
}

// ---------- CUSTOMERS ----------
export function ageOption(ah: DashboardData['customers']['age_hist']): any {
    return {
        grid: { left: 46, right: 14, top: 20, bottom: 30 },
        tooltip: { ...tooltipStyle, trigger: 'axis', valueFormatter: (v: number) => fmtNum(v) + ' clientes' },
        xAxis: { type: 'category', data: ah.map((x) => x.name), ...axisCommon, splitLine: { show: false } },
        yAxis: { type: 'value', ...axisCommon, axisLabel: { ...axisCommon.axisLabel, formatter: (v: number) => fmtNum(v) } },
        series: [
            {
                type: 'bar',
                data: ah.map((x) => x.count),
                barWidth: '62%',
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#2f5d57' },
                        { offset: 1, color: '#1b3f3a' },
                    ]),
                },
            },
        ],
    }
}

export function tierOption(t: DashboardData['customers']['by_tier']): any {
    return {
        grid: { left: 56, right: 48, top: 24, bottom: 30 },
        tooltip: { ...tooltipStyle, trigger: 'axis' },
        legend: { data: ['Gasto médio', 'Evasão'], textStyle: baseTextStyle, bottom: 0, itemWidth: 14, itemHeight: 8 },
        xAxis: { type: 'category', data: t.map((x) => x.name), ...axisCommon, splitLine: { show: false } },
        yAxis: [
            { type: 'value', ...axisCommon, axisLabel: { ...axisCommon.axisLabel, formatter: (v: number) => fmtK(v) } },
            {
                type: 'value',
                ...axisCommon,
                splitLine: { show: false },
                axisLabel: { ...axisCommon.axisLabel, formatter: (v: number) => v + '%' },
            },
        ],
        series: [
            { name: 'Gasto médio', type: 'bar', data: t.map((x) => x.avg_spend), barWidth: '46%', itemStyle: { color: '#b88a2e' } },
            {
                name: 'Evasão',
                type: 'line',
                yAxisIndex: 1,
                data: t.map((x) => x.churn_rate),
                symbol: 'circle',
                symbolSize: 8,
                lineStyle: { color: RED, width: 2.4 },
                itemStyle: { color: RED },
            },
        ],
    }
}

export function channelOption(ch: DashboardData['customers']['by_channel']): any {
    return {
        grid: { left: 60, right: 54, top: 24, bottom: 46 },
        tooltip: { ...tooltipStyle, trigger: 'axis' },
        legend: { data: ['Clientes', 'Gasto médio'], textStyle: baseTextStyle, bottom: 0, itemWidth: 14, itemHeight: 8 },
        xAxis: {
            type: 'category',
            data: ch.map((x) => x.name),
            ...axisCommon,
            splitLine: { show: false },
            axisLabel: { ...axisCommon.axisLabel, interval: 0, rotate: 18 },
        },
        yAxis: [
            { type: 'value', ...axisCommon, axisLabel: { ...axisCommon.axisLabel, formatter: (v: number) => fmtNum(v) } },
            {
                type: 'value',
                ...axisCommon,
                splitLine: { show: false },
                axisLabel: { ...axisCommon.axisLabel, formatter: (v: number) => fmtK(v) },
            },
        ],
        series: [
            { name: 'Clientes', type: 'bar', data: ch.map((x) => x.customers), barWidth: '44%', itemStyle: { color: INK } },
            {
                name: 'Gasto médio',
                type: 'line',
                yAxisIndex: 1,
                data: ch.map((x) => x.avg_spend),
                symbol: 'diamond',
                symbolSize: 9,
                lineStyle: { color: '#33506e', width: 2.4 },
                itemStyle: { color: '#33506e' },
            },
        ],
    }
}

// ---------- PRODUCTS ----------
export function scatterOption(sc: DashboardData['products']['scatter']): any {
    const catList = [...new Set(sc.map((d) => d.category))]
    const colorOf = (cn: string) => PAL[catList.indexOf(cn) % PAL.length]
    const maxZ = Math.max(...sc.map((d) => d.z), 1)
    return {
        grid: { left: 54, right: 20, top: 24, bottom: 44 },
        tooltip: {
            ...tooltipStyle,
            formatter: (o: any) =>
                `<b>${o.data[3]}</b><br>${o.data[4]}<br>Nota ${o.data[0]} · Devol. ${o.data[1]}% · ${fmtNum(o.data[2])} ped.`,
        },
        xAxis: {
            name: 'Nota média',
            nameLocation: 'middle',
            nameGap: 28,
            nameTextStyle: baseTextStyle,
            type: 'value',
            min: 2.5,
            max: 5,
            ...axisCommon,
        },
        yAxis: {
            name: 'Devolução %',
            nameLocation: 'middle',
            nameGap: 36,
            nameTextStyle: baseTextStyle,
            type: 'value',
            ...axisCommon,
        },
        series: [
            {
                type: 'scatter',
                data: sc.map((d) => [d.x, d.y, d.z, d.name, d.category]),
                symbolSize: (v: any) => 8 + (v[2] / maxZ) * 34,
                itemStyle: { color: (p: any) => colorOf(p.data[4]), opacity: 0.72, borderColor: INK, borderWidth: 0.5 },
            },
        ],
    }
}
