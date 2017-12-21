export default {
  /**
   * Set location
   * @param {Object} state
   * @param {Object} payload
   */
  setLocation (state, payload) {
    state.location = { ...state.location, ...payload.location }
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