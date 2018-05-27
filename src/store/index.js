import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

// modules
import grid from './modules/grid'
import auth from './modules/auth'

Vue.use(Vuex)

export default new Vuex.Store({

  // persist vuex to local storage
  plugins: [createPersistedState()],

  // modules
  modules: {
    grid,
    auth
  }

})
