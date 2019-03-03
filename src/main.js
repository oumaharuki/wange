import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// import iView from 'iview'
import { Radio, Icon, RadioGroup } from 'iview'
import VueRouter from 'vue-router'
import 'iview/dist/styles/iview.css'
import 'assets/reset.styl'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.component('RadioGroup', RadioGroup)
Vue.component('Radio', Radio)
Vue.component('Icon', Icon)
// Vue.use(iView)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
