<template>
  <div class="container">
    <b-carousel id="carousel1"
                style="text-shadow: 1px 1px 2px #333;"
                controls
                indicators
                background="#ababab"
                :interval="0"
                img-width="1024"
                img-height="480"
                :value="currentSlide()"
    >
      <b-carousel-slide v-for="image in images" :img-src="image.imageUrl" :key="image.id"></b-carousel-slide>
    </b-carousel>
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
    methods: {
      currentSlide () {
        var found = this.images.find((image) => {
          return image.id === this.$route.params.id
        })
        return this.images.indexOf(found)
      }
    }
  }
</script>
