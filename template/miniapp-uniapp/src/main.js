import Vue from 'vue'
import App from './App'

// 引入uview
import uView from 'library/uview-uiv1'
Vue.use(uView)

import yboot from '@/utils/yboot'
uni.$y = yboot

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
