export default {
  /**
   * Get the selected language for the system
   * @param  {State} state
   * @return {String}
   */
  language (state) {
    return state.language
  },

  flashMessage (state) {
    return state.flashMessage
  },

  /**
   * Get the list of groups
   * @param  {Object} state
   * @return {Array}
   */
  groups (state) {
    return state.groups
  },

  /**
   * Get the name of the selected location
   * @param  {Object} state
   * @return {String}
   */
  locationName (state) {
    return state.search.location.name
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
  },

  /**
   * Get the image categories
   * @param  {Object} state
   * @return {Object}
   */
  imageCategories (state) {
    let categories = [{
      label: 'All',
      text: 'All',
      value: '0'
    }]

    state.imageCategories.forEach((category) => {
      categories.push({
        label: category.categoryName,
        text: category.categoryName,
        value: category._id
      })
    })

    return categories
  },

  /**
   * Get data regarding current image to
   * be uploaded/updated
   * @param  {Object} state
   * @return {Object}
   */
  imageUploadData (state) {
    let categoryIds = []

    state.imageUpload.category.forEach((category) => {
      categoryIds.push(category.value)
    })

    return {...state.imageUpload, categoryIds}
  },

  /**
   * Get details about the logged in user
   * @param  {Object} state
   * @return {Object}
   */
  userDetails (state) {
    return state.user
  },

  /**
   * Get the images uploaded by user
   * @param  {Object} state
   * @return {Array}
   */
  userImages (state) {
    return state.userImages
  },

  /**
   * Is a user currently logged in or not
   * @param  {Object}  state
   * @return {Boolean}
   */
  isUserLoggedIn (state) {
    return state.isUserLoggedIn
  }
}
