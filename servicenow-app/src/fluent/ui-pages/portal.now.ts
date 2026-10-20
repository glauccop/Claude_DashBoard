import { UiPage } from '@servicenow/sdk/core'
import html from '../../client/portal/index.html'

export const x_snc_dashboard_se_portal = UiPage({
    $id: Now.ID['ui_portal'],
    endpoint: 'x_snc_dashboard_se_portal.do',
    html: html,
    direct: true,
})
