import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    events: []
  },
  mutations: {
    addEvent(state, info) {
      state.events.push(info)
    },
    addEvents(state, info) {
      state.events = state.events.concat(info)
    },
  },
  actions: {
    addEvent(context, info) {
      context.commit('addEvent', info)
    },
    addEvents(context, info) {
      context.commit('addEvents', info)
    },
  },
  modules: {
  }
})
