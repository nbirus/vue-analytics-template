import Vue from 'vue'
import Router from 'vue-router'

// common pages
// const NotFound = (resolve) => require(['@/pages/common/NotFoundPage'], resolve)
// const Unauthorized = (resolve) => require(['@/pages/common/UnauthorizedPage'], resolve)
// const Login = (resolve) => require(['@/pages/common/Login'], resolve)

// pages
const Search = (resolve) => require(['@/pages/SearchPage'], resolve)
const StyleGuide = (resolve) => require(['@/pages/StyleGuidePage'], resolve)

// import Search from '@/pages/SearchPage'
// import StyleGuide from '@/pages/StyleGuidePage'

Vue.use(Router)

const routes = [

  // catch all
  {
    path: '*',
    redirect: '/search',
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
      navBarTitle: 'Search',
      icon: 'book-open'
    }
  },
  {
    path: '/style-guide',
    name: 'style-guide',
    component: StyleGuide,
    meta: {
      navBarLink: true,
      navBarTitle: 'Style Guide',
      icon: 'directions'
    }
  }
  // {
  //   path: '/not-found',
  //   component: NotFound,
  //   meta: {
  //     navBarLink: false,
  //     showHeader: false
  //   }
  // },
  // {
  //   path: '/unauthorized',
  //   component: Unauthorized,
  //   meta: {
  //     navBarLink: false,
  //     showHeader: false
  //   }
  // },
  // {
  //   path: '/login',
  //   component: Login,
  //   meta: {
  //     navBarLink: false,
  //     showHeader: false
  //   }
  // }
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_HREF,
  routes,
  linkActiveClass: 'is-active',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})


export default router
