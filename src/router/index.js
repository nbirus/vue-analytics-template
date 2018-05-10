import Vue from 'vue'
import Router from 'vue-router'

// common pages
import NotFound from '@/pages/common/NotFoundPage'
import Unauthorized from '@/pages/common/UnauthorizedPage'
import Login from '@/pages/common/Login'

// pages
import Search from '@/pages/SearchPage'
import StyleGuide from '@/pages/StyleGuidePage'


Vue.use(Router)

const routes = [

  // catch all
  {
    path: '*',
    redirect: '/not-found',
    meta: {
      navBarLink: false
    }
  },
  {
    path: '/search',
    name: 'search',
    component: Search,
    meta: {
      navBarLink: true,
      pageHeaderName: 'Search',
      icon: 'book-open'
    }
  },
  {
    path: '/style-guide',
    name: 'style-guide',
    component: StyleGuide,
    meta: {
      navBarLink: true,
      pageHeaderName: 'Style Guide',
      icon: 'directions'
    }
  },
  {
    path: '/not-found',
    component: NotFound,
    meta: {
      navBarLink: false,
      showHeader: false
    }
  },
  {
    path: '/unauthorized',
    component: Unauthorized,
    meta: {
      navBarLink: false,
      showHeader: false
    }
  },
  {
    path: '/login',
    component: Login,
    meta: {
      navBarLink: false,
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
