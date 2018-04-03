import Vue from 'vue'
import Router from 'vue-router'

// pages
import Home from '@/pages/HomePage'
import Search from '@/pages/SearchPage'
import StyleGuide from '@/pages/StyleGuidePage'
import NotFound from '@/pages/common/NotFoundPage'
import Unauthorized from '@/pages/common/UnauthorizedPage'
import Login from '@/pages/common/Login'

Vue.use(Router)

const routes = [

  // catch all
  {
    path: '*',
    redirect: '/style-guide'
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Home,
    meta: {
      breadcrumb: 'Dashboard'
    }
  },
  {
    path: '/search',
    name: 'Trial Search',
    component: Search
  },
  {
    path: '/style-guide',
    name: 'Style Guide',
    component: StyleGuide
  },
  {
    path: '/not-found',
    component: NotFound
  },
  {
    path: '/unauthorized',
    component: Unauthorized
  },
  {
    path: '/login',
    component: Login
  }
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_HREF,
  routes,
  linkActiveClass: 'is-active'
})


export default router
