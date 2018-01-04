export function getImageResults (addressData) {
  this.$store.commit('setLocation', {
    location: {
      lat: addressData.geometry.location.lat(),
      lng: addressData.geometry.location.lng(),
      name: addressData.formatted_address
    }
  })

  let payload = {
    ...this.locationCoordinates,
    radius: this.$store.getters.searchOptions.radius
  }

  this.$store.dispatch('getImageResults', payload)
    .then((res) => {
      console.log('RES', res)
    })
    .catch((error) => {
      console.log('ERROR', error)
    })
}