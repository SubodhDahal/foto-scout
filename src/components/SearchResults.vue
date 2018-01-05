<template>
  <div class="container">
    <div class="row">
      <div class="col-md-4">
        <strong><u>Image results in:</u></strong> {{ locationName }}
      <div v-for="image in images" :key="image._id">
        <router-link :to="{name:'EditImage',params:{id:image._id}}">
          <b-button>Edit</b-button>
        </router-link>
        <router-link :to="{name:'CarouselImage',params:{id:image._id}}">
          <img :src="`http://localhost:3000/${image.path}`" class="img-fluid" height="250"/>
        </router-link>
      </div>
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
        'images',
        'locationName'
      ])

    }
  }
</script>


