export default {
  /**
   * Get details about the user
   * @param  {Object} context
   * @param  {Object} payload
   * @return {Promise}
   */
  getUserDetails (context, payload) {
    return new Promise((resolve, reject) => {
      let authToken = localStorage.getItem('authToken')

      if (!authToken) {
        reject({
          message: 'No user logged in'
        })
      }

      console.log('User has already logged in')

      let config = {
        headers: {
          'x-auth': authToken
        }
      }

      console.log('Getting user information')
      axios.get('http://localhost:3000/user/me', config)
        .then(function (response) {
          context.commit('setUser', {
            isUserLoggedIn: true,
            user: response.data
          })
          resolve(response)
        })
        .catch(function (error) {
          console.log(error)
          reject(error)
        })
    })
  },

  /**
   * Get the image search results from the server
   * @param  {Object} context
   * @param  {Object} payload
   * @return {Promise}
   */
  getImageResults (context, payload) {
    return new Promise((resolve, reject) => {
      axios.get('http://localhost:3000/images/search', {
          params: {
            latitude: payload.lat,
            longitude: payload.lng,
            radius: payload.radius
          }
        })
        .then(function (response) {
          // Save images data to Vuex store
          context.commit('setImages', {
            images: response.data.images
          })
          resolve(response)
        })
        .catch(function (error) {
          console.log(error)
          reject(error)
        })
    })
  },

  /**
   * Get the list of froups
   * @param  {Object} context
   * @return {Promise}
   */
  getGroupList (context) {
    return new Promise((resolve, reject) => {
      axios.get('http://localhost:3000/group')
        .then(function (response) {
          // Save groups data to Vuex store
          context.commit('setGroups', {
            groups: response.data
          })
          resolve(response)
        })
        .catch(function (error) {
          console.log(error)
          reject(error)
        })
    })
  },

  /**
   * Get the list of image categories
   * @param  {Object} context
   * @return {Promise}
   */
  getImageCategories (context) {
    return new Promise((resolve, reject) => {
      axios.get('http://localhost:3000/ImageCategory')
        .then(function (response) {
          // Save imageCategory to Vuex store
          context.commit('setImageCategory', {
            imageCategories: response.data.imageCategories
          })
          resolve(response)
        })
        .catch(function (error) {
          console.log(error)
          reject(error)
        })
    })
  },
}
