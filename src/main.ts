import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { AppModule } from '@/store/modules/app'
import ElementUI from 'element-ui'
import i18n from '@/lang'

import './registerServiceWorker'

// 路由守卫
import './permission'

// 样式
import 'normalize.css'
import '@/styles/index.scss'

Vue.use(ElementUI, {
  size: AppModule.size,
  i18n: (key: string, value: string) => i18n.t(key, value)
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
