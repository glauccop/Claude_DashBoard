import { UiPage } from '@servicenow/sdk/core'
import html from '../../client/nexus/index.html'

export const x_snc_dashboard_se_nexus = UiPage({
    $id: Now.ID['ui_nexus'],
    endpoint: 'x_snc_dashboard_se_nexus.do',
    html: html,
    direct: true,
})
