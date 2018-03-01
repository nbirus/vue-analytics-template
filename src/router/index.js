import Vue from 'vue'
import Router from 'vue-router'

// pages
import Home from '@/pages/Home'
import NotFound from '@/pages/NotFound'
import Unauthorized from '@/pages/Unauthorized'

Vue.use(Router)

const routes = [

  // catch all
  {
    path: '*',
    redirect: '/not-found'
  },

  {
    path: '/',
    name: 'Home',
    component: Home
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
