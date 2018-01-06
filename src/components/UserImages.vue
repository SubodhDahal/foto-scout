<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <h2>My images</h2>
      </div>
    </div>

    <ImageGallery :images="userImages" />
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import ImageGallery from './ImageGallery'

  export default {
    data () {
      return {
        images: []
      }
    },

    computed: {
      /* get user images from VueX Store */
      ...mapGetters([
        'userImages'
      ])
    },

    components: {
      ImageGallery
    },

    mounted () {
      this.$store.dispatch('getUserImages')
    }
  }
</script>