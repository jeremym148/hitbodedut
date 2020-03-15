import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    events: [{
        name: '',
        start: '2020-03-16'+ ' ' + '16' + ':' + '00'
      }],
    hebrewCal: [],
    hitNow:0
  },
  mutations: {
    addEvent(state, info) {
      state.events.push(info)
    },
    addEvents(state, info) {
      state.events = state.events.concat(info)
    },
    setEvents(state, info) {
      state.events = info
    },
    addHebCal(state, info) {
      state.hebrewCal = info
    },
    setHitNow(state, info) {
      state.hitNow = info
    },
  },
  actions: {
    addEvent(context, info) {
      context.commit('addEvent', info)
    },
    addEvents(context, info) {
      context.commit('addEvents', info)
    },
    setEvents(context, info) {
      context.commit('setEvents', info)
    },
    addHebCal(context, info) {
      context.commit('addHebCal', info)
    },
    setHitNow(context, info) {
      context.commit('setHitNow', info)
    }
  },
  modules: {
  }
})
