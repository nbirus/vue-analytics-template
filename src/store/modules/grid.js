const initialGridState = {
  pageSize: 20,
  pageNumber: 0
}

export default {

  namespaced: true,

  state: {
    gridStateMap: {}
  },
  getters: {
    hasGridState: state => {
      return id => !(state.gridStateMap[id] === undefined)
    },
    getGridState: state => {
      return id => state.gridStateMap[id]
    }
  },
  mutations: {
    createState (state, id) {
      state.gridStateMap[id] = initialGridState
    },
    saveState (state, context) {
      state.gridStateMap[context.id] = context.state
    }
  },
  actions: {

    initializeGridState ({ commit, getters }, id) {
      if (!getters.hasGridState(id)) {
        commit('createState', id)
      }
    },

    saveGridState ({ commit }, context) {
      commit('saveState', context)
    }
  }

}
