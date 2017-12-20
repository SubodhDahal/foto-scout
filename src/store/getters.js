export default {
  /**
   * Get the selected language for the system
   * @param  {State} state
   * @return {String}
   */
  language (state) {
    return state.language
  },

  /**
   * Get the name of the selected location
   * @param  {Object} state
   * @return {String}
   */
  locationName (state) {
    return state.location.id ? state.location.formatted_address : ''
  },

  /**
   * Get coordinates for the selected location
   * @param  {Object} state
   * @return {Object}
   */
  locationCoordinates (state) {
    if (state.location.id) {
      return {
        lat: state.location.geometry.location.lat,
        lng: state.location.geometry.location.lng
      }
    } else {
      return {
        lat: 51.1657,
        lng: 10.4515
      }
    }
  }
}
