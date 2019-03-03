import Vue from 'vue'
import Router from 'vue-router'
import Home from 'page/home'
import BookStore from 'page/bookStore'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', redirect: '/home'},
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children:[{
        path: '/home/bookStore',
        name: 'BookStore',
        component: BookStore,
      }]
    }
  ]
})
