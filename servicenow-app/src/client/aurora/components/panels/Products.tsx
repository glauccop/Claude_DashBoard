import React from 'react'
import type { DashboardData } from '../../../shared/types'
import { fmtUSD, fmtNum, fmtCompact } from '../../../shared/data'
import { Card } from '../Card'
import { HBars } from '../HBars'
import { Scatter } from '../Scatter'
import { VBars } from '../VBars'
import { Table } from '../Table'

export function Products({ d }: { d: DashboardData }) {
    const p = d.products
    return (
        <div className="grid12">
            <Card title="Top 15 produtos por receita" className="md-8 lg-7">
                <HBars
                    data={p.top_revenue.slice(0, 15).map((x) => ({ name: x.name, value: x.revenue }))}
                    height={420}
                    distributed
                    valFmt={fmtCompact}
                />
            </Card>
            <Card title="Preço médio por categoria" className="md-8 lg-5">
                <HBars
                    data={p.avg_price_by_cat.map((x) => ({ name: x.name, value: x.avg_price }))}
                    height={420}
                    color="#34d399"
                    valFmt={(v) => fmtUSD(v, 2)}
                />
            </Card>
            <Card
                title={
                    <>
                        Avaliação × devolução <span className="ct-note">· tamanho da bolha = nº de pedidos</span>
                    </>
                }
                className="md-8 lg-12"
            >
                <Scatter points={p.scatter} height={380} xLabel="Avaliação média" yLabel="Devolução %" xMin={3.4} xMax={4.4} />
            </Card>
            <Card title="Maiores taxas de devolução" className="md-8 lg-6">
                <VBars
                    data={p.worst_returns.map((x) => ({ name: x.name, value: x.return_rate }))}
                    height={320}
                    distributed
                    truncate
                    valFmt={(v) => v.toFixed(1) + '%'}
                />
            </Card>
            <Card title="Detalhe — maiores devoluções" className="md-8 lg-6">
                <Table
                    rows={p.worst_returns}
                    rowKey={(r, i) => `${r.name}-${i}`}
                    columns={[
                        { header: 'Produto', render: (r) => r.name },
                        { header: 'Categoria', render: (r) => r.category },
                        { header: 'Pedidos', numeric: true, render: (r) => fmtNum(r.orders) },
                        { header: 'Devolução', numeric: true, render: (r) => r.return_rate.toFixed(1) + '%' },
                    ]}
                />
            </Card>
        </div>
    )
}
