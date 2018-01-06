<template>
  <div class="row">
    <div class="col-md-12 mt-4">
      <h4 v-if="images.length == 0">
        No images found
      </h4>
    </div>

    <div v-for="image in images" class="mt-4 col-md-4">
      <router-link
        :to="{name:'EditImage',params:{id:image._id}}"
        v-if="image.userId==userDetails._id">
        <b-button>Edit</b-button>
      </router-link>

      <div class="image">
        <LikeImage :id="image._id" :likes="image.likes" />

        <router-link :to="{name:'CarouselImage',params:{id:image._id}}">
          <img :src="`http://localhost:3000/${image.path}`" class="img-fluid w-100" height="250"/>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import LikeImage from './LikeImage'

  export default {
    props: {
      images: {
        type: Array
      }
    },

    computed: {
      /* get user details from VueX Store */
      ...mapGetters([
        'userDetails'
      ])
    },

    components: {
      LikeImage
    }
  }
</script>

<style>
  .image {
    position: relative;
  }
</style>