import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// import iView from 'iview'
import { Radio, Icon, RadioGroup, FormItem, Form, Scroll, Message, Button, BackTop, Page, Divider, Rate } from 'iview'
import VueRouter from 'vue-router'
import 'iview/dist/styles/iview.css'
import 'assets/reset.styl'

Vue.config.productionTip = false
Vue.prototype.$Message = Message
Vue.use(VueRouter)
Vue.component('Rate', Rate)
Vue.component('Divider', Divider)
Vue.component('Page', Page)
Vue.component('BackTop', BackTop)
Vue.component('Button', Button)
Vue.component('RadioGroup', RadioGroup)
Vue.component('Radio', Radio)
Vue.component('Icon', Icon)
Vue.component('Form', Form)
Vue.component('FormItem', FormItem)
Vue.component('Scroll', Scroll)
// Vue.use(iView)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
