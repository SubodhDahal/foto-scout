export default {
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
}
