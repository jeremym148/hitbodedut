import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    events: [],
    hebrewCal: []
  },
  mutations: {
    addEvent(state, info) {
      state.events.push(info)
    },
    addEvents(state, info) {
      state.events = state.events.concat(info)
    },
    addHebCal(state, info) {
      state.hebrewCal = info
    },
  },
  actions: {
    addEvent(context, info) {
      context.commit('addEvent', info)
    },
    addEvents(context, info) {
      context.commit('addEvents', info)
    },
    addHebCal(context, info) {
      context.commit('addHebCal', info)
    },
  },
  modules: {
  }
})
