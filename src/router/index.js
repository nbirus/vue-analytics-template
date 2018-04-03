import Vue from 'vue'
import Router from 'vue-router'

// common pages
import NotFound from '@/pages/common/NotFoundPage'
import Unauthorized from '@/pages/common/UnauthorizedPage'
import Login from '@/pages/common/Login'

// pages
import Home from '@/pages/HomePage'
import Search from '@/pages/SearchPage'
import StyleGuide from '@/pages/StyleGuidePage'


Vue.use(Router)

const routes = [

  // catch all
  {
    path: '*',
    redirect: '/not-found'
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Home,
    meta: {
      icon: 'grid'
    }
  },
  {
    path: '/search',
    name: 'Trial Search',
    component: Search,
    meta: {
      icon: 'book-open'
    }
  },
  {
    path: '/style-guide',
    name: 'Style Guide',
    component: StyleGuide,
    meta: {
      icon: 'directions'
    }
  },
  {
    path: '/not-found',
    component: NotFound,
    meta: {
      showHeader: false
    }
  },
  {
    path: '/unauthorized',
    component: Unauthorized,
    meta: {
      showHeader: false
    }
  },
  {
    path: '/login',
    component: Login,
    meta: {
      showHeader: false
    }
  }
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_HREF,
  routes,
  linkActiveClass: 'is-active'
})


export default router
