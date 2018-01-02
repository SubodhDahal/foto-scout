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

    }
  }
</script>


