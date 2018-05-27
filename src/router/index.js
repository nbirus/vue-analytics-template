import Vue from 'vue'
import Router from 'vue-router'

// common pages
// const NotFound = (resolve) => require(['@/pages/common/NotFoundPage'], resolve)
// const Unauthorized = (resolve) => require(['@/pages/common/UnauthorizedPage'], resolve)
const Login = (resolve) => require(['@/pages/common/Login'], resolve)

// pages
const Search = (resolve) => require(['@/pages/SearchPage'], resolve)
const StyleGuide = (resolve) => require(['@/pages/StyleGuidePage'], resolve)

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
    beforeEnter: requireAuth,
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
    beforeEnter: requireAuth,
    meta: {
      navBarLink: true,
      navBarTitle: 'Style Guide',
      icon: 'directions'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    beforeEnter: requireNoAuth,
    meta: {
      navBarLink: false,
      hasNav: false,
      navBarTitle: 'Login'
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


// before
router.beforeEach((to, from, next) => {

  // Start our vue-progressbar
  router.app.$Progress.start()

  // To set the title of each route
  document.title = `Analytics: ${to.meta.navBarTitle}`

  // go to next page
  next()

})

// after
router.afterEach((to, from) => {
  // End our vue-progressbar
  router.app.$Progress.finish()
})

// helper functions
let isAuthenticated = () => (router.app.$options.store.getters['auth/isAuthenticated'])

function requireAuth (to, from, next) {
  !isAuthenticated()
    ? next({name: 'login'})
    : next()
}

function requireNoAuth (to, from, next) {
  isAuthenticated()
    ? next({name: 'search'})
    : next()
}



export default router
