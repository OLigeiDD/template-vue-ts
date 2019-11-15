import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const tableRoutes: RouteConfig = {
  path: '/table',
  component: Layout,
  redirect: '/table/complex-table',
  name: 'Table',
  meta: {
    title: 'table',
    icon: 'table'
  },
  children: [
    {
      path: 'complex-table',
      component: () =>
        import(/* webpackChunkName: "complex-table" */ '@/views/table/complex-table.vue')
    }
  ]
}

export default tableRoutes
