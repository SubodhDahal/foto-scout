<template>
  <div class="like-image py-2 px-4">
    <a href="#" @click.prevent="like" v-if="!isLiked" class="d-inline">
      <i class="fa fa-thumbs-o-up like-button" aria-hidden="true"></i>
    </a>

    <div v-if="isLiked" class="d-inline">
      <i class="fa fa-thumbs-up like-button mr-2" aria-hidden="true" title="Liked"></i>
    </div>

    <span class="d-inline ml-3 likes-count">
      {{ likes.length }} like{{ likes.length > 1 ? 's' : '' }}
    </span>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import axios from 'axios'

  export default {
    props: {
      id: {
        type: String
      },
      likes: {
        type: Array
      }
    },

    computed: {
      ...mapGetters([
        'userDetails'
      ]),

      isLiked: {
        get () {
          // check if current user is in list
          // of likes of the image
          return this.likes.indexOf(this.userDetails._id) !== -1
        },

        set (value) {
          return value
        }
      }
    },

    methods: {
      like () {
        let authToken = localStorage.getItem('authToken')
        let config = {
          headers: {
            'x-auth': authToken
          }
        }

        axios.put(`http://localhost:3000/imageLike/${this.id}`, {}, config)
          .then((response) => {
            this.isLiked = true
          })
      }
    }
  }
</script>

<style>
  .like-image {
    position: absolute;
    bottom: 0;
    width: 100%;
    background: linear-gradient(to bottom, rgba(255,255,255,0.2) 0%,rgba(255,255,255,1) 100%);
  }

  .like-button {
    font-size: 2.5rem;
  }
</style>