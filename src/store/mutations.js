export default {
  /**
   * Set location
   * @param {Object} state
   * @param {Object} payload
   */
  setLocation (state, payload) {
    state.search.location = { ...state.search.location, ...payload.location }
  },

  /**
   * Set the selected search options
   * @param {Object} state
   * @param {Object} payload
   */
  setSearchOptions (state, payload) {
    state.search.options = {...state.search.options, ...payload.options}
  },

  /**
   * Change the system language
   * @param  {Object} state
   * @param  {Object} payload
   */
  changeLanguage (state, payload) {
    state.language = payload.language
  }
}