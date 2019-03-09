import Vue from 'vue'
import Router from 'vue-router'
import Home from 'page/home'
import BookStore from 'page/bookStore'
import Bookcase from 'page/bookcase'
import Find from 'page/find'
import Notice from 'page/notice'
import Rank from 'page/rank'
import Seting from 'page/seting'
import BookClassify from 'page/book-classify'
import BookClassifyList from 'page/book-classify-list'
import BookDes from 'page/book-des'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', redirect: '/home'},
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children: [{
        path: '/home/bookStore',
        name: 'BookStore',
        component: BookStore
      }, {
        path: '/home/bookcase',
        name: 'bookcase',
        component: Bookcase
      }, {
        path: '/home/find',
        name: 'find',
        component: Find
      }]
    },
    {
      path: '/notice',
      name: 'notice',
      component: Notice
    },
    {
      path: '/rank',
      name: 'rank',
      component: Rank
    },
    {
      path: '/bookClassify',
      name: 'bookClassify',
      component: BookClassify
    },
    {
      path: '/seting',
      name: 'seting',
      component: Seting
    },
    {
      path: '/bookClassifyList/:gender/:major',
      name: 'bookClassifyList',
      component: BookClassifyList
    },
    {
      path: '/bookDes/:id',
      name: 'bookDes',
      component: BookDes
    }
  ]
})
