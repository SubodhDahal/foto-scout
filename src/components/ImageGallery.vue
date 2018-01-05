<template>
  <div class="row">
    <div v-for="image in images" class="mt-4 col-md-4">
      <router-link
        :to="{name:'EditImage',params:{id:image._id}}"
        v-if="image.userId==userDetails._id">
        <b-button>Edit</b-button>
      </router-link>

      <router-link :to="{name:'CarouselImage',params:{id:image._id}}">
        <img :src="`http://localhost:3000/${image.path}`" class="img-fluid" height="250"/>
      </router-link>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

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
    }
  }
</script>
