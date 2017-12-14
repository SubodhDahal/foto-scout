import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import getters from './getters'
import setters from './setters'
import mutations from './mutations'

const store = new Vuex.Store({
  state: {
    location: {}
  },

  getters,
  setters,
  mutations
})

export default store