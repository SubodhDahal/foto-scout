<template>
  <div class="like-image">
    <a href="#" @click.prevent="toggle" class="d-inline btn btn-light p-2">
      <i class="fa fa-thumbs-o-up like-button" v-if="!isLiked" aria-hidden="true"></i>

      <i class="fa fa-thumbs-up like-button" v-if="isLiked" aria-hidden="true" title="Liked"></i>

      <span class="d-inline ml-2 likes-count">
        {{ likes.length }}
      </span>
    </a>
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
    bottom: 15px;
    left: 10px;
    width: 100%;
  }

  .like-button {
    font-size: 1.5rem;
  }
</style>