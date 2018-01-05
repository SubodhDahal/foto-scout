<template>
  <div>
    <b-button @click.prevent="like" v-if="!isLiked">
      Like
    </b-button>

    <div v-if="isLiked">
      <p>Liked</p>
      <p>{{ likes.length }} like{{ likes.length > 1 ? 's' : '' }}</p>
    </div>
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
