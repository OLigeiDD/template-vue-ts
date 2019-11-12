import router from './router'
import { Route } from 'vue-router'
import { UserModule } from '@/store/modules/user'
import Nprogress from 'nprogress'

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
      next()
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
