import React from 'react'
import type { DashboardData } from '../../../shared/types'
import { fmtNum, fmtCompact } from '../../../shared/data'
import { Card } from '../Card'
import { LineArea } from '../LineArea'
import { Donut } from '../Donut'
import { Heatmap } from '../Heatmap'
import { VBars } from '../VBars'
import { HBars } from '../HBars'
import { MONTHS } from '../palette'

const STATUS_COLORS = ['#34d399', '#fb7185', '#fbbf24', '#60a5fa', '#a78bfa', '#22d3ee']

export function Sales({ d }: { d: DashboardData }) {
    const m = d.monthly
    return (
        <div className="grid12">
            <Card title="Receita & ticket médio (AOV)" className="md-8 lg-8">
                <LineArea
                    series={[
                        { name: 'Receita', data: m.map((x) => x.revenue), color: '#22d3ee' },
                        { name: 'AOV', data: m.map((x) => x.aov), color: '#facc15', yFmt: (v) => '$' + Math.round(v) },
                    ]}
                    categories={m.map((x) => x.label)}
                    height={300}
                    dualAxis
                    yFmt={fmtCompact}
                />
            </Card>
            <Card title="Status dos pedidos" className="md-8 lg-4">
                <Donut
                    data={d.sales.by_status.map((x, i) => ({ name: x.name, value: x.orders, color: STATUS_COLORS[i % STATUS_COLORS.length] }))}
                    centerTop={fmtNum(d.kpis.total_orders)}
                    centerSub="pedidos"
                    valFmt={fmtNum}
                />
            </Card>
            <Card title="Sazonalidade — receita por ano × mês" className="md-8 lg-12">
                <Heatmap
                    rows={d.sales.seasonality.map((y) => ({ year: y.year, values: y.months }))}
                    months={MONTHS}
                    valFmt={fmtCompact}
                />
            </Card>
            <Card
                title={
                    <>
                        Taxa de devolução mensal <span className="ct-note amber">· recalculada do orders.csv</span>
                    </>
                }
                className="md-4 lg-7"
            >
                <LineArea
                    series={[{ name: 'Devolução', data: d.sales.return_by_month.map((x) => x.return_rate), color: '#fb7185' }]}
                    categories={d.sales.return_by_month.map((x) => x.label)}
                    height={280}
                    yFmt={(v) => v.toFixed(0) + '%'}
                />
            </Card>
            <Card title="Receita por ano" className="md-4 lg-5">
                <VBars
                    data={d.sales.by_year.map((x) => ({ name: x.name, value: x.revenue }))}
                    height={280}
                    distributed
                    valFmt={fmtCompact}
                />
            </Card>
            <Card title="Pedidos por dia da semana" className="md-4 lg-6">
                <VBars
                    data={d.sales.by_dow.map((x) => ({ name: x.name.slice(0, 3), value: x.orders }))}
                    height={280}
                    color="#34d399"
                    valFmt={fmtNum}
                />
            </Card>
            <Card title="Prazo médio de entrega por categoria" className="md-4 lg-6">
                <HBars
                    data={d.sales.delivery_by_category.map((x) => ({ name: x.name, value: x.avg_delivery_days }))}
                    height={300}
                    color="#a78bfa"
                    valFmt={(v) => v + ' d'}
                />
            </Card>
        </div>
    )
}
