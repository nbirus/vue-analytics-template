import Vue from 'vue'
import Router from 'vue-router'

// pages
import StyleGuide from '@/pages/StyleGuide'
import NotFound from '@/pages/NotFound'
import Unauthorized from '@/pages/Unauthorized'

Vue.use(Router)

const routes = [

  // catch all
  {
    path: '*',
    redirect: '/style-guide'
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
