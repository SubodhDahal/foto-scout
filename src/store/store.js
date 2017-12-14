import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    location: {}
  },

  getters: {
    /**
     * Get coordinates for the selected location
     * @param  {Object} state
     * @return {Object}
     */
    locationCoordinates (state) {
      return {
        lat: state.location.geometry.location.lat,
        lng: state.location.geometry.location.lng
      }
    }
  },

  mutations: {
    /**
     * Set location
     * @param {Object} state
     * @param {Object} payload
     */
    setLocation (state, payload) {
      state.location = { ...state.location, ...payload.location }
    }
  }
})

export default store