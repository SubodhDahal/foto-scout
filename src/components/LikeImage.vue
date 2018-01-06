<template>
  <div class="like-image py-2 px-4">
    <a href="#" @click.prevent="toggle"  class="d-inline">
      <i class="fa fa-thumbs-o-up like-button" v-if="!isLiked" aria-hidden="true"></i>

      <i class="fa fa-thumbs-up like-button mr-2" v-if="isLiked" aria-hidden="true" title="Liked"></i>
    </a>

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
      },

      action () {
        return this.isLiked ? 'unlike' : 'like'
      }
    },

    methods: {
      toggle () {
        let authToken = localStorage.getItem('authToken')
        let config = {
          headers: {
            'x-auth': authToken
          }
        }

        axios.put(`http://localhost:3000/imageLike/${this.id}/${this.action}`, {}, config)
          .then((response) => {
            if (this.action === 'like') {
              // add current user to the list of likes for the image
              this.likes.push(this.userDetails._id)
            } else {
              // remove current user from the list of likes for the image
              this.likes.pop(this.userDetails._id)
            }
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