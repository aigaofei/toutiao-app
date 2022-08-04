import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/index.less'

import Vant from 'vant'
import 'vant/lib/index.css'

// rem的单位适配转换
import 'amfe-flexible'
import './utils/Dayjs'

Vue.use(Vant)
Vue.config.productionTip = false
Vue.filter('formatDate', () => {
  return 34443
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
