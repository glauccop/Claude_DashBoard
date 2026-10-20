import React from 'react'
import type { DashboardData } from '../../shared/types'
import { fmtUSD, fmtNum, fmtCompact } from '../../shared/data'
import { EChart } from './EChart'
import { Figure, BarList, Col, rk } from './primitives'
import {
    revTrendOption,
    catShareOption,
    seasonOption,
    deviceOption,
    dowOption,
    returnOption,
    ageOption,
    tierOption,
    channelOption,
    scatterOption,
} from './chartTheme'

const fmtK = fmtCompact

// ===================== I. OVERVIEW =====================
export function Overview({ data }: { data: DashboardData }) {
    const k = data.kpis
    return (
        <section className="spread">
            <div className="grid c12">
                <div className="span8 reveal">
                    <p className="kicker">A Edição em Números</p>
                    <h2 className="head">
                        Seis anos de <em>comércio</em>, em uma só página.
                    </h2>
                    <div className="lede" style={{ marginTop: 18 }}>
                        <p>
                            Entre janeiro de 2020 e março de 2026, a operação movimentou <b>{fmtUSD(k.total_revenue)}</b> em{' '}
                            <b>{fmtNum(k.total_orders)} pedidos</b> — um ticket médio de <b>{fmtUSD(k.aov, 2)}</b>. A casa
                            atravessou seis anos de comércio com notável estabilidade, sem o sobressalto de um único trimestre
                            dominante.
                        </p>
                        <p>
                            A fidelidade é o ativo silencioso: <b>{k.repeat_rate}%</b> dos clientes voltam para comprar de novo,
                            enquanto a devolução se mantém contida em <b>{k.return_rate}%</b>. A nota média de{' '}
                            <b>{k.avg_rating.toFixed(1)}</b> em 5 sugere uma clientela satisfeita, ainda que exigente — terreno
                            fértil para crescer sem queimar o caixa em descontos.
                        </p>
                    </div>
                </div>
                <div className="span4 reveal" style={{ animationDelay: '.08s' }}>
                    <Figure lbl="Receita total" big={<><small>USD</small>{fmtK(k.total_revenue)}</>} sub="Acumulado, 2020–2026" />
                    <div style={{ marginTop: 22 }}>
                        <Figure lbl="Pedidos" big={<><small>QTD</small>{fmtNum(k.total_orders)}</>} sub="Itens-pedido registrados" />
                    </div>
                </div>
            </div>

            <hr className="rule thick" style={{ margin: '36px 0 26px' }} />

            <div className="grid c12">
                <div className="span3 reveal" style={{ animationDelay: '.05s' }}>
                    <Figure lbl="Ticket Médio" big={fmtUSD(k.aov, 2)} sub="valor por pedido" />
                </div>
                <div className="span3 reveal" style={{ animationDelay: '.1s' }}>
                    <Figure lbl="Devolução" big={<>{k.return_rate}<small>%</small></>} sub="sobre o total de pedidos" />
                </div>
                <div className="span3 reveal" style={{ animationDelay: '.15s' }}>
                    <Figure lbl="Recompra" big={<>{k.repeat_rate}<small>%</small></>} sub="clientes que retornam" />
                </div>
                <div className="span3 reveal" style={{ animationDelay: '.2s' }}>
                    <Figure lbl="Avaliação" big={<>{k.avg_rating.toFixed(1)}<small>/5</small></>} sub="nota média do cliente" />
                </div>
            </div>

            <hr className="rule" style={{ margin: '34px 0 22px' }} />

            <div className="grid c12">
                <Col span="span8" src="Figura 1 — Receita mensal, jan/2020 → mar/2026" title="A maré da receita">
                    <div className="chart" style={{ marginTop: 6 }}>
                        <EChart option={revTrendOption(data.monthly)} height={330} />
                    </div>
                </Col>
                <Col span="span4" src="Figura 2 — Participação por categoria" title="De onde vem o dinheiro" delay={0.1}>
                    <div className="chart" style={{ marginTop: 6 }}>
                        <EChart option={catShareOption(data.sales.by_category)} height={330} />
                    </div>
                </Col>
            </div>

            <div className="grid c12" style={{ marginTop: 30 }}>
                <div className="span12 reveal">
                    <p className="pull">
                        “Mobile responde por mais da metade da receita; o cartão de crédito, por quase 40%. O futuro desta loja cabe
                        na palma da mão.”
                    </p>
                </div>
            </div>
        </section>
    )
}

// ===================== II. SALES =====================
export function Sales({ data }: { data: DashboardData }) {
    const cats = data.sales.by_category
    const payItems = data.sales.by_payment.map((p) => ({ nm: p.name, v: p.revenue, disp: fmtK(p.revenue) }))
    const delItems = [...data.sales.delivery_by_category]
        .sort((a, b) => b.avg_delivery_days - a.avg_delivery_days)
        .map((x) => ({ nm: x.name, v: x.avg_delivery_days, disp: x.avg_delivery_days.toFixed(1) + ' d' }))

    return (
        <section className="spread">
            <p className="kicker">Caderno II — Vendas</p>
            <h2 className="head">
                A anatomia de uma <em>compra</em>.
            </h2>
            <p className="deck">
                Como, quando e em que dispositivos o dinheiro troca de mãos — uma leitura por categoria, meio de pagamento, tela e
                estação do ano.
            </p>
            <hr className="rule thick" />

            <div className="grid c12">
                <Col span="span7" src="Quadro A — Receita por categoria (USD)" title="O ranking das prateleiras">
                    <table className="ed" style={{ marginTop: 8 }}>
                        <tbody>
                            <tr>
                                <th>Categoria</th>
                                <th>Receita</th>
                                <th>Pedidos</th>
                                <th>Ticket</th>
                                <th>Devol.</th>
                            </tr>
                            {cats.map((c, i) => (
                                <tr key={c.name}>
                                    <td>{rk(i)}{c.name}</td>
                                    <td>{fmtK(c.revenue)}</td>
                                    <td>{fmtNum(c.orders)}</td>
                                    <td>{fmtUSD(c.aov, 2)}</td>
                                    <td>{c.return_rate.toFixed(1)}%</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Col>
                <Col span="span5" src="Figura 3 — Calor sazonal por mês × ano" title="O calendário da demanda" delay={0.1}>
                    <div className="chart" style={{ marginTop: 6 }}>
                        <EChart option={seasonOption(data.sales.seasonality)} height={300} />
                    </div>
                    <p className="note">Quanto mais escuro, mais vendas naquele mês. Dezembros e marços puxam a fila.</p>
                </Col>
            </div>

            <hr className="rule" style={{ margin: '32px 0 24px' }} />

            <div className="grid c12">
                <Col span="span4" src="Figura 4 — Meio de pagamento" title="Na hora de pagar">
                    <div style={{ marginTop: 8 }}>
                        <BarList items={payItems} />
                    </div>
                </Col>
                <Col span="span4" src="Figura 5 — Dispositivo de compra" title="Em qual tela" delay={0.08}>
                    <div className="chart" style={{ marginTop: 6 }}>
                        <EChart option={deviceOption(data.sales.by_device)} height={240} />
                    </div>
                </Col>
                <Col span="span4" src="Figura 6 — Receita por dia da semana" title="O pulso da semana" delay={0.16}>
                    <div className="chart" style={{ marginTop: 6 }}>
                        <EChart option={dowOption(data.sales.by_dow)} height={240} />
                    </div>
                </Col>
            </div>

            <hr className="rule" style={{ margin: '32px 0 24px' }} />

            <div className="grid c12">
                <Col span="span8" src="Figura 7 — Taxa de devolução mês a mês (%)" title="O preço do arrependimento">
                    <div className="chart" style={{ marginTop: 6 }}>
                        <EChart option={returnOption(data.sales.return_by_month)} height={280} />
                    </div>
                </Col>
                <Col span="span4" src="Quadro B — Prazo médio de entrega por categoria" title="A espera" delay={0.1}>
                    <div style={{ marginTop: 8 }}>
                        <BarList items={delItems} />
                    </div>
                </Col>
            </div>
        </section>
    )
}

// ===================== III. CUSTOMERS =====================
export function Customers({ data }: { data: DashboardData }) {
    const c = data.customers
    const k = data.kpis
    return (
        <section className="spread">
            <p className="kicker">Caderno III — Clientes</p>
            <h2 className="head">
                Quem são os <em>oito mil</em>.
            </h2>
            <p className="deck">
                Um retrato demográfico e comportamental da base — idade, fidelidade, origem e o risco silencioso da evasão.
            </p>
            <hr className="rule thick" />

            <div className="grid c12">
                <div className="span3 reveal">
                    <Figure lbl="Base de clientes" big={fmtNum(c.total)} sub="clientes únicos" />
                </div>
                <div className="span3 reveal" style={{ animationDelay: '.06s' }}>
                    <Figure lbl="Evasão" big={<>{c.churn_rate}<small>%</small></>} sub="taxa de churn" />
                </div>
                <div className="span3 reveal" style={{ animationDelay: '.12s' }}>
                    <Figure lbl="Newsletter" big={<>{c.newsletter_rate.toFixed(0)}<small>%</small></>} sub="assinantes ativos" />
                </div>
                <div className="span3 reveal" style={{ animationDelay: '.18s' }}>
                    <Figure lbl="Recompra" big={<>{k.repeat_rate}<small>%</small></>} sub="voltam a comprar" />
                </div>
            </div>

            <hr className="rule" style={{ margin: '32px 0 24px' }} />

            <div className="grid c12">
                <Col span="span6" src="Figura 8 — Distribuição etária" title="As gerações que compram">
                    <div className="chart" style={{ marginTop: 6 }}>
                        <EChart option={ageOption(c.age_hist)} height={280} />
                    </div>
                </Col>
                <Col span="span6" src="Figura 9 — Gasto médio × evasão, por nível de assinatura" title="Lealdade tem preço" delay={0.1}>
                    <div className="chart" style={{ marginTop: 6 }}>
                        <EChart option={tierOption(c.by_tier)} height={280} />
                    </div>
                </Col>
            </div>

            <hr className="rule" style={{ margin: '32px 0 24px' }} />

            <div className="grid c12">
                <Col span="span5" src="Quadro C — Países por número de clientes" title="O mapa da clientela">
                    <table className="ed" style={{ marginTop: 8 }}>
                        <tbody>
                            <tr>
                                <th>País</th>
                                <th>Clientes</th>
                                <th>Gasto total</th>
                            </tr>
                            {c.top_countries.map((x, i) => (
                                <tr key={x.name}>
                                    <td>{rk(i)}{x.name}</td>
                                    <td>{fmtNum(x.customers)}</td>
                                    <td>{fmtK(x.spend)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Col>
                <Col span="span7" src="Figura 10 — Canais de aquisição: volume e gasto" title="Por onde eles chegam" delay={0.1}>
                    <div className="chart" style={{ marginTop: 6 }}>
                        <EChart option={channelOption(c.by_channel)} height={300} />
                    </div>
                </Col>
            </div>

            <div className="grid c12" style={{ marginTop: 30 }}>
                <div className="span12 reveal">
                    <p className="pull">
                        “Um em cada onze clientes some a cada ciclo — mas os {c.newsletter_rate.toFixed(0)}% inscritos na newsletter
                        são a corda que segura a base.”
                    </p>
                </div>
            </div>
        </section>
    )
}

// ===================== IV. PRODUCTS =====================
export function Products({ data }: { data: DashboardData }) {
    const p = data.products
    const priceItems = [...p.avg_price_by_cat]
        .sort((a, b) => b.avg_price - a.avg_price)
        .map((x) => ({ nm: x.name, v: x.avg_price, disp: fmtUSD(x.avg_price, 2) }))

    return (
        <section className="spread">
            <p className="kicker">Caderno IV — Produtos</p>
            <h2 className="head">
                Os <em>protagonistas</em> e os vilões.
            </h2>
            <p className="deck">
                Os itens que sustentam o caixa e aqueles que voltam pelo correio — cruzando preço, nota e devolução.
            </p>
            <hr className="rule thick" />

            <div className="grid c12">
                <Col span="span7" src="Quadro D — Maiores em receita (Top 15)" title="Os campeões de bilheteria">
                    <table className="ed" style={{ marginTop: 8 }}>
                        <tbody>
                            <tr>
                                <th>Produto</th>
                                <th>Pedidos</th>
                                <th>Receita</th>
                                <th>Nota</th>
                            </tr>
                            {p.top_revenue.map((x, i) => (
                                <tr key={x.name}>
                                    <td>
                                        {rk(i)}
                                        {x.name}
                                        <span className="cat">{x.category}</span>
                                    </td>
                                    <td>{fmtNum(x.orders)}</td>
                                    <td>{fmtK(x.revenue)}</td>
                                    <td>{x.avg_rating.toFixed(1)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Col>
                <Col span="span5" src="Quadro E — Piores em devolução" title="O hall da vergonha" delay={0.1}>
                    <table className="ed" style={{ marginTop: 8 }}>
                        <tbody>
                            <tr>
                                <th>Produto</th>
                                <th>Devol.</th>
                                <th>Nota</th>
                            </tr>
                            {p.worst_returns.map((x, i) => (
                                <tr key={x.name}>
                                    <td>
                                        {rk(i)}
                                        {x.name}
                                        <span className="cat">{x.category}</span>
                                    </td>
                                    <td>{x.return_rate.toFixed(1)}%</td>
                                    <td>{x.avg_rating.toFixed(1)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Col>
            </div>

            <hr className="rule" style={{ margin: '32px 0 24px' }} />

            <div className="grid c12">
                <Col span="span8" src="Figura 11 — Nota média × taxa de devolução (tamanho = pedidos)" title="Bom, bonito e barato?">
                    <div className="chart" style={{ marginTop: 6 }}>
                        <EChart option={scatterOption(p.scatter)} height={360} />
                    </div>
                    <p className="note">
                        Cada bolha é um produto. À direita, mais bem avaliados; embaixo, menos devolvidos — o canto inferior direito
                        é o paraíso.
                    </p>
                </Col>
                <Col span="span4" src="Figura 12 — Preço médio por categoria" title="O bolso por seção" delay={0.1}>
                    <div style={{ marginTop: 8 }}>
                        <BarList items={priceItems} />
                    </div>
                </Col>
            </div>
        </section>
    )
}
