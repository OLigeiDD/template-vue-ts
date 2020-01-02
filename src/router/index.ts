import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'
import tableRouter from './modules/table'

Vue.use(VueRouter)

// 无需权限可访问的页面
export const constantRoutes: RouteConfig[] = [
  {
    path: '/login',
    name: 'login',
    meta: {
      hidden: true
    },
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue')
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue'),
        meta: {
          title: 'dashboard',
          icon: 'dashboard',
          affix: true
        }
      }
    ]
  }
]

// 异步路由
export const asyncRoutes: RouteConfig[] = [
  tableRouter,
  {
    path: '*',
    redirect: '/404',
    meta: { hidden: true }
  }
]

export const createRouter = () =>
  new VueRouter({
    routes: constantRoutes
  })

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
// 不刷新页面更新路由
export const resetRouter = () => {
  const newRouter = createRouter()
  ;(router as any).matcher = (newRouter as any).matcher // reset router
}

const router = createRouter()

export default router
