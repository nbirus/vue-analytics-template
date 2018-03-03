import Vue from 'vue'
import Router from 'vue-router'

// pages
import Home from '@/pages/HomePage'
import Search from '@/pages/SearchPage'
import StyleGuide from '@/pages/StyleGuidePage'
import NotFound from '@/pages/NotFoundPage'
import Unauthorized from '@/pages/UnauthorizedPage'

Vue.use(Router)

const routes = [

  // catch all
  {
    path: '*',
    redirect: '/style-guide'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/style-guide',
    name: 'StyleGuide',
    component: StyleGuide
  },
  {
    path: '/not-found',
    component: NotFound
  },
  {
    path: '/unauthorized',
    component: Unauthorized
  }
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_HREF,
  routes,
  linkActiveClass: 'is-active'
})


export default router
