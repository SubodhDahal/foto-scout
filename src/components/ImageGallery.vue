<template>
  <div>
    <div class="row">
      <div class="col-md-12 mt-4">
        <h4 v-if="images.length == 0">
          No images found
        </h4>
      </div>

      <div class="col-md-6" v-if="isImageDeleted">
        <b-alert :show="isImageDeleted">
          Image deleted successfully
        </b-alert>
      </div>
      <div class="col-md-6" v-if="isImageDeleted"></div>
    </div>

    <div class="card-columns mt-2">
      <div v-for="image in images" class="card mt-2">
        <div class="image">
          <div class="user-controls">
            <router-link
              class="btn btn-light"
              title="Edit"
              :to="{name:'EditImage',params:{id:image._id}}"
              v-if="image.userId==userDetails._id">
              <i class="fa fa-pencil" aria-hidden="true"></i>
            </router-link>

            <a href="#"
              class="btn btn-light"
              title="Delete"
              v-if="image.userId==userDetails._id"
              @click.prevent="deleteImage(image._id)">
              <i class="fa fa-trash" aria-hidden="true"></i>
            </a>
          </div>

          <LikeImage :id="image._id" :likes="image.likes" />

          <router-link :to="{name:'CarouselImage',params:{id:image._id, type:galleryType}}">
            <img :src="`http://localhost:3000/${image.path}`" class="img-fluid w-100" height="250"/>
          </router-link>
        </div>
      </div>

      <simplert :useRadius="true"
                :useIcon="true"
                ref="simplert">
      </simplert>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import { mapGetters } from 'vuex'
  import Simplert from 'vue2-simplert'

  import LikeImage from './LikeImage'

  export default {
    props: {
      images: {
        type: Array
      },
      galleryType: {
        type: String,
        default: 'search'
      }
    },

    computed: {
      /* get user details from VueX Store */
      ...mapGetters([
        'userDetails'
      ])
    },

    data () {
      return {
        isImageDeleted: false
      }
    },

    components: {
      LikeImage,
      Simplert
    },

    methods: {
      deleteImage (id) {
        let obj = {
          title: 'Are you sure you want to delete the image?',
          type: 'warning',
          useConfirmBtn: true,
          customConfirmBtnText: 'Yes',
          onConfirm: () => {
            let authToken = localStorage.getItem('authToken')

            let config = {
              headers: {
                'x-auth': authToken
              }
            }

            axios.delete(`http://localhost:3000/upload/${id}`, config)
              .then((response) => {
                this.$store.commit('removeImage', {id})

                this.isImageDeleted = true
              })
              .catch((error) => {
                console.log(error)
              })
          }
        }

        this.$refs.simplert.openSimplert(obj)
      }
    }
  }
</script>

<style>
  .image {
    position: relative;
  }

  .user-controls {
    position: absolute;
    right: 5px;
    top: 5px;
  }
</style>