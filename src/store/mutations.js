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
   * Set flash message
   * @param {Object} state
   * @param {Object} payload
   */
  setFlashMessage (state, payload) {
    state.flashMessage = payload.message
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
   * Set the images uploaded by current user
   * @param {Object} state
   * @param {Object} payload
   */
  setUserImages (state, payload) {
    state.userImages = payload.images
  },

  /**
   * Set the images search results
   * @param {Object} state
   * @param {Object} payload
   */
  setImages (state, payload) {
    state.images = payload.images
  },

  /**
   * Update a specific image details
   * @param  {Object} state
   * @param  {Object} payload
   */
  updateImage (state, payload) {
    let foundImage = state.images.find((image) => image._id === payload.image._id)
    let foundIndex = state.images.indexOf(foundImage)

    if (foundIndex > -1) {
      state.images[foundIndex] = payload.image
    }
  },

  /**
   * Remove the image with specified id from store
   * @param  {Object} state
   * @param  {Object} payload
   */
  removeImage (state, payload) {
    let getImageIndex = (images, imageId) => {
      let foundImage = images.find((image) => image._id === imageId)
      return images.indexOf(foundImage)
    }

    let foundImagesIndex = getImageIndex(state.images, payload.id)
    let foundUserImagesIndex = getImageIndex(state.userImages, payload.id)

    if (foundImagesIndex > -1) {
      state.images.splice(foundImagesIndex, 1)
    }

    if (foundUserImagesIndex > -1) {
      state.userImages.splice(foundUserImagesIndex, 1)
    }
  },

  /**
   * Set the user groups
   * @param {Object} state
   * @param {Object} payload
   */
  setGroups (state, payload) {
    state.groups = payload.groups
  },

  /**
   * Set the upload data for image
   * @param {Object} state
   * @param {Object} payload
   */
  setUploadData (state, payload) {
    state.imageUpload = {...state.imageUpload, ...payload}
  },

  /**
   * Set the image categories
   * @param {Object} state
   * @param {Object} payload
   */
  setImageCategory (state, payload) {
    state.imageCategories = payload.imageCategories
  }
}
