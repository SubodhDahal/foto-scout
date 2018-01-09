<template>
  <div class="container">
    <b-carousel id="carousel1"
                style="text-shadow: 1px 1px 2px #333;"
                controls
                indicators
                background="#ababab"
                :interval="0"
                :value="currentSlide()"
    >
      <b-carousel-slide
        v-for="image in imagesList"
        :img-src="`http://localhost:3000/${image.path}`"
        :caption="image.description"
        :key="image.id">
      </b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      /* get images from VueX Store */
      ...mapGetters([
        'images',
        'userImages'
      ]),

      /**
       * Get the list of images
       * @return {Array}
       */
      imagesList () {
        if (this.$route.params.type === 'user') {
          return this.userImages
        } else {
          return this.images
        }
      }
    },

    methods: {
      /**
       * Get the index of current slide
       * @return {Integer}
       */
      currentSlide () {
        var found = this.imagesList.find((image) => {
          return image._id === this.$route.params.id
        })
        return this.imagesList.indexOf(found)
      }
    }
  }
</script>

<style>
  .carousel-item img {
    margin: 0 auto;
    height: 80vh;
    width: auto !important;
  }
</style>
