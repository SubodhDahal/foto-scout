export default {
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
  }
}
