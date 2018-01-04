<template>
  <div class="container">
    <div class="row">
      <div v-for="image in images" class="col-md-4">
        <router-link :to="{name:'CarouselImage',params:{id:image._id}}">
          <img :src="`http://localhost:3000/${image.path}`" class="img-fluid" height="250"/>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      /* get images from VueX Store */
      ...mapGetters([
        'images'
      ])
    },

    mounted () {
      // If there are no images in Vuex store, probably the page
      // is reloaded so get images from the server
      if (this.images.length === 0) {
        let payload = {
          lat: this.$route.query.lat,
          lng: this.$route.query.lng,
          radius: this.$route.query.radius
        }

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


