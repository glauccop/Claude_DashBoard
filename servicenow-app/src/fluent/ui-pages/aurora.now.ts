import { UiPage } from '@servicenow/sdk/core'
import html from '../../client/aurora/index.html'

export const x_snc_dashboard_se_aurora = UiPage({
    $id: Now.ID['ui_aurora'],
    endpoint: 'x_snc_dashboard_se_aurora.do',
    html: html,
    direct: true,
})
