import { RestApi, Acl } from '@servicenow/sdk/core'
import { getDashboardData } from '../../server/dashboard-handler'

// ACL: qualquer usuário autenticado (não-guest) pode ler o endpoint
const dashboardReadAcl = Acl({
    $id: Now.ID['acl_dashboard_read'],
    type: 'rest_endpoint',
    name: 'x_snc_dashboard_se_dashboard_read',
    operation: 'execute',
    active: true,
    script: `answer = !gs.getUser().isGuest();`,
})

// GET /api/x_snc_dashboard_se/dashboard/data
RestApi({
    $id: Now.ID['rest_dashboard'],
    name: 'Dashboard Data API',
    serviceId: 'dashboard',
    produces: 'application/json',
    routes: [
        {
            $id: Now.ID['rest_dashboard_data'],
            name: 'Get dashboard data',
            path: '/data',
            method: 'GET',
            script: getDashboardData,
            authentication: true,
            authorization: true,
            enforceAcl: [dashboardReadAcl],
        },
    ],
})
