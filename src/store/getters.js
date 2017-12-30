export default {
  /**
   * Get the selected language for the system
   * @param  {State} state
   * @return {String}
   */
  language (state) {
    return state.language
  },

  groups (state) {
    return state.groups
  },

  /**
   * Get the name of the selected location
   * @param  {Object} state
   * @return {String}
   */
  locationName (state) {
    return state.search.location.id ? state.search.location.formatted_address : ''
  },

  /**
   * Get coordinates for the selected location
   * @param  {Object} state
   * @return {Object}
   */
  locationCoordinates (state) {
    if (state.search.location.id) {
      return {
        lat: state.search.location.geometry.location.lat(),
        lng: state.search.location.geometry.location.lng()
      }
    } else {
      return {
        lat: 51.1657,
        lng: 10.4515
      }
    }
  },

  /**
   * Get the selected search options
   * @param  {Object} state
   * @return {Object}
   */
  searchOptions (state) {
    return state.search.options
  },

  /**
   * Get the images search results
   * @param  {Object} state
   * @return {Object}
   */
  images (state) {
    return state.images
  }
}
