export default {
  /**
   * Set location
   * @param {Object} state
   * @param {Object} payload
   */
  setLocation (state, payload) {
    state.search.location = {...state.search.location, ...payload.location}
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
  },

  /**
   * Save user data
   * @param {Object} state
   * @param {Object} payload
   */
  setUser (state, payload) {
    state.isUserLoggedIn = payload.isUserLoggedIn
    state.user = payload.user
  },

  /**
   * Set the images search results
   * @param {Object} state
   * @param {Object} payload
   */
  setImages (state, payload) {
    state.images = payload.images
  },

  setGroups (state, payload) {
    state.groups = payload.groups
  },

  setUploadData (state, payload) {
    state.imageUpload = {...state.imageUpload, ...payload}
  },

  setImageCategory (state, payload) {
    state.imageCategories = payload.imageCategories
  }
}
