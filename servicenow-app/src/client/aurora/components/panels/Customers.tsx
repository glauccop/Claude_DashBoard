import React from 'react'
import type { DashboardData } from '../../../shared/types'
import { fmtUSD, fmtNum } from '../../../shared/data'
import { Card } from '../Card'
import { VBars } from '../VBars'
import { Donut } from '../Donut'
import { HBars } from '../HBars'
import { GroupedBars } from '../GroupedBars'

const GENDER_COLORS = ['#f472b6', '#38bdf8', '#a78bfa']

export function Customers({ d }: { d: DashboardData }) {
    const c = d.customers
    return (
        <div className="grid12">
            <Card title="Faixa etária" className="md-4 lg-4">
                <VBars data={c.age_hist.map((x) => ({ name: x.name, value: x.count }))} height={260} color="#22d3ee" valFmt={fmtNum} />
            </Card>
            <Card title="Gênero" className="md-4 lg-4">
                <Donut
                    data={c.gender.map((x, i) => ({ name: x.name, value: x.count, color: GENDER_COLORS[i % GENDER_COLORS.length] }))}
                    centerTop={fmtNum(c.total)}
                    centerSub="clientes"
                    valFmt={fmtNum}
                />
            </Card>
            <Card title="Tier de assinatura" className="md-8 lg-4">
                <GroupedBars
                    data={c.by_tier}
                    nameKey="name"
                    series={[
                        { key: 'customers', name: 'Clientes', color: '#facc15', fmt: fmtNum },
                        { key: 'avg_spend', name: 'Gasto médio', color: '#34d399', fmt: (v) => fmtUSD(v) },
                    ]}
                    height={260}
                />
            </Card>
            <Card title="Top países por nº de clientes" className="md-8 lg-7">
                <HBars data={c.top_countries.map((x) => ({ name: x.name, value: x.customers }))} height={340} distributed valFmt={fmtNum} />
            </Card>
            <Card title="Canal de aquisição × churn" className="md-8 lg-5">
                <GroupedBars
                    data={c.by_channel}
                    nameKey="name"
                    series={[
                        { key: 'customers', name: 'Clientes', color: '#38bdf8', fmt: fmtNum },
                        { key: 'churn_rate', name: 'Churn %', color: '#fb7185', fmt: (v) => v.toFixed(1) + '%' },
                    ]}
                    height={340}
                />
            </Card>
            <Card title="RFM · Recência" className="md-4 lg-4">
                <VBars data={c.recency_hist.map((x) => ({ name: x.name, value: x.count }))} height={260} color="#fbbf24" valFmt={fmtNum} />
            </Card>
            <Card title="RFM · Frequência" className="md-4 lg-4">
                <VBars data={c.frequency_hist.map((x) => ({ name: x.name, value: x.count }))} height={260} color="#34d399" valFmt={fmtNum} />
            </Card>
            <Card title="RFM · Valor (LTV)" className="md-8 lg-4">
                <VBars data={c.ltv_hist.map((x) => ({ name: x.name, value: x.count }))} height={260} color="#a78bfa" valFmt={fmtNum} />
            </Card>
        </div>
    )
}
