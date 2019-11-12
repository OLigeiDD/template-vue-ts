import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { AppModule } from '@/store/modules/app'
import ElementUI from 'element-ui'
import i18n from '@/lang'
import SvgIcon from 'vue-svgicon'

import './registerServiceWorker'

// 路由守卫
import './permission'

// 样式
import 'normalize.css'
import '@/styles/index.scss'
// icons
import '@/icons/components'

Vue.use(ElementUI, {
  size: AppModule.size,
  i18n: (key: string, value: string) => i18n.t(key, value)
})

Vue.use(SvgIcon, {
  tagName: 'svg-icon',
  defaultWidth: '1em',
  defaultHeight: '1em'
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
