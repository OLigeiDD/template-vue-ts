import router from './router'
import { Route } from 'vue-router'
import { UserModule } from '@/store/modules/user'

import Nprogress from 'nprogress'
import { PermissionModule } from './store/modules/permission'

const whiteList = ['/login', '/auth-redirect']

// const getPageTitle = (key: string) => {
//   const hasKey = i18n.te(`route.${key}`)
//   if (hasKey) {
//     const pageName = i18n.t(`route.${key}`)
//     return `${pageName} - ${settings.title}`
//   }
//   return `${settings.title}`
// }

router.beforeEach(async (to: Route, from: Route, next: any) => {
  Nprogress.start()
  if (UserModule.token) {
    if (to.path === '/login') {
      next({ path: '/' })
      Nprogress.done()
    } else {
      // console.log('已有token') //

      if (UserModule.roles.length === 0) {
        // 没有用户权限信息
        try {
          await UserModule.GetUserInfo()
          const rolse = UserModule.roles
          // 生成路由信息
          PermissionModule.GenerateRoutes(rolse)
          // 动态添加路由
          router.addRoutes(PermissionModule.dynamicRoutes)

          next({ ...to, replace: true }) // replace: true加上后路由不会留下历史记录
        } catch (err) {}
      } else {
        next()
      }
      // if (UserModule.roles.length === 0) {
      //   try {
      //   } catch (err) {}
      // } else {
      //   next()
      // }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      Nprogress.done()
    }
  }
})

router.afterEach((to: Route) => {
  Nprogress.done()
  // document.title = getPageTitle(to.meta.title)
})
