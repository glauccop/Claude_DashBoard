import { UiPage } from '@servicenow/sdk/core'
import html from '../../client/balanco/index.html'

export const x_snc_dashboard_se_balanco = UiPage({
    $id: Now.ID['ui_balanco'],
    endpoint: 'x_snc_dashboard_se_balanco.do',
    html: html,
    direct: true,
})
