import Vue from 'vue'
import Router from 'vue-router'
import Home from 'page/home'
import BookStore from 'page/bookStore'
import Bookcase from 'page/bookcase'
import Notice from 'page/notice'
import Rank from 'page/rank'
import Seting from 'page/seting'
import BookClassify from 'page/book-classify'
import BookClassifyList from 'page/book-classify-list'
import BookDes from 'page/book-des'
import bookRead from 'page/bookRead'

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
        component: () => import('page/find')
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
      component: () => import('page/rank')
    },
    {
      path: '/bookClassify',
      name: 'bookClassify',
      component: () => import('page/book-classify')
    },
    {
      path: '/seting',
      name: 'seting',
      component: () => import('page/seting')
    },
    {
      path: '/book-classify-list/:gender/:major',
      name: 'bookClassifyList',
      component: () => import('page/book-classify-list')
    },
    {
      path: '/book-des/:id',
      name: 'bookDes',
      component: () => import('page/book-des')
    },
    {
      path: '/ready',
      name: 'readyDes',
      component: () => import('page/ready-des')
    },
    {
      path: '/bookRead',
      name: 'bookRead',
      component: bookRead
    }
  ]
})
