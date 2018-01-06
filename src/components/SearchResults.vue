<template>
  <div class="container">
    <div class="row">
      <div class="col-md-4">
        <h2 class="d-inline">Image results in:</h2> {{ locationName }}
      </div>
    </div>

    <ImageGallery :images="images" />
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import ImageGallery from './ImageGallery'

  export default {
    computed: {
      /* get images from VueX Store */
      ...mapGetters([
        'images',
        'locationName'
      ])
    },

    components: {
      ImageGallery
    },

    mounted () {
      // If there are no images in Vuex store, probably the page
      // is reloaded so get images from the server
      if (this.images.length === 0) {
        let lat = parseFloat(this.$route.query.lat)
        let lng = parseFloat(this.$route.query.lng)
        let radius = parseInt(this.$route.query.radius)
        let name = this.$route.query.name

        this.$store.commit('setLocation', {
          location: {lat, lng, name}
        })

        let payload = {lat, lng, radius}
        this.$store.dispatch('getImageResults', payload)
          .then((res) => {
            console.log('RES', res)
          })
          .catch((error) => {
            console.log('ERROR', error)
          })
      }
    }
  }
</script>
