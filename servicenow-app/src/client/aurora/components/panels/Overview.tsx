import React from 'react'
import type { DashboardData } from '../../../shared/types'
import { fmtUSD, fmtNum, fmtCompact } from '../../../shared/data'
import { Card } from '../Card'
import { LineArea } from '../LineArea'
import { Donut } from '../Donut'
import { HBars } from '../HBars'
import { Combo } from '../Combo'
import { VBars } from '../VBars'
import { color } from '../palette'

export function Overview({ d }: { d: DashboardData }) {
    const m = d.monthly
    return (
        <div className="grid12">
            <Card title="Receita mensal" className="md-8 lg-8">
                <LineArea
                    series={[{ name: 'Receita', data: m.map((x) => x.revenue), color: '#22d3ee' }]}
                    categories={m.map((x) => x.label)}
                    height={280}
                    yFmt={fmtCompact}
                />
            </Card>
            <Card title="Mix por dispositivo" className="md-8 lg-4">
                <Donut
                    data={d.sales.by_device.map((x, i) => ({ name: x.name, value: x.orders, color: color(i) }))}
                    centerTop={fmtNum(d.kpis.total_orders)}
                    centerSub="pedidos"
                    valFmt={fmtNum}
                />
            </Card>
            <Card title="Receita por categoria" className="md-4 lg-7">
                <HBars
                    data={d.sales.by_category.map((x) => ({ name: x.name, value: x.revenue }))}
                    height={330}
                    distributed
                    valFmt={fmtCompact}
                />
            </Card>
            <Card title="Pedidos vs. novos clientes" className="md-4 lg-5">
                <Combo
                    categories={m.map((x) => x.label)}
                    bar={{ name: 'Pedidos', data: m.map((x) => x.orders), color: '#38bdf8' }}
                    line={{ name: 'Novos clientes', data: m.map((x) => x.new_customers), color: '#facc15' }}
                    height={300}
                    barFmt={fmtNum}
                    lineFmt={fmtNum}
                />
            </Card>
            <Card title="Receita por método de pagamento" className="md-8 lg-12">
                <VBars
                    data={d.sales.by_payment.map((x) => ({ name: x.name, value: x.revenue }))}
                    height={300}
                    distributed
                    valFmt={fmtUSD}
                />
            </Card>
        </div>
    )
}
