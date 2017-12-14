import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    location: {}
  },

  mutations: {
    SET_LOCATION (state, payload) {
        state.location = { ...state.location, ...payload.location }
    }
  }
})
export default store