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
    return state.search.location.formatted_address
  },

  /**
   * Get coordinates for the selected location
   * @param  {Object} state
   * @return {Object}
   */
  locationCoordinates (state) {
    return {
      lat: state.search.location.lat,
      lng: state.search.location.lng
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
