import router from '@/router'

export default {

  namespaced: true,

  state: {
    user: null,
    token: null
  },

  getters: {
    getToken: state => state.token,
    getUser: state => state.user,
    isAuthenticated: state => !(state.token === null)
  },

  mutations: {

    setToken (state, token) {
      state.token = token
    },

    setUser (state, user) {
      state.user = user
    },

    clearAuth (state) {
      state.token = null
      state.user = null
    }

  },

  actions: {

    login (context) {
      context.commit('setToken', 'TEST_TOKEN')
      context.commit('setUser', 'Nathan Birus')

      router.push({name: 'search'})
    },

    logout (context) {
      context.commit('clearAuth')

      router.push({name: 'login'})
    }

  }

}
