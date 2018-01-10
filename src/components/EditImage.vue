<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <b-alert :show="imageUploadData.isImageuploaded" dismissible>
          Image updated successfully
        </b-alert>

        <b-alert :show="imageUploadData.errorMessage!=''" class="alert-danger" dismissible>
          ERROR: {{ imageUploadData.errorMessage }}
        </b-alert>

        <h2 class="mb-4">Update image information</h2>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6">
        <ImageDescriptionForm/>

        <b-form-group>
          <b-button type="submit" @click="editImage" variant="primary"> Update </b-button>
        </b-form-group>
      </div>

      <div class="col-md-6">
        <img :src="imageUploadData.imageUrl" class="img-fluid" v-if="imageUploadData.imageUrl">
      </div>
    </div>
  </div>
</template>

<script>
  import ImageDescriptionForm from './ImageDescriptionForm'
  import { mapGetters } from 'vuex'
  import axios from 'axios'

  export default {
    components: {
      ImageDescriptionForm
    },

    data () {
      return {
        imageId: this.$route.params.id
      }
    },

    mounted () {
      this.$store.commit('setUploadData', {
        isImageuploaded: false,
        errorMessage: ''
      })

      // Get the image details on image edit page load
      axios.get(`http://localhost:3000/upload/${this.imageId}`)
        .then((response) => {
          this.$store.commit('setUploadData', {
            file: null,
            description: response.data.description,
            imageUrl: 'http://localhost:3000/' + response.data.path,
            isImageuploaded: false
          })
        })
        .catch((error) => {
          this.$store.commit('setUploadData', {
            errorMessage: error.message
          })
        })
    },

    computed: {
      /* get images from VueX Store */
      ...mapGetters([
        'imageUploadData'
      ])
    },

    methods: {
      editImage () {
        let authToken = localStorage.getItem('authToken')

        let data = {
          description: this.imageUploadData.description,
          latitude: this.imageUploadData.location.lat,
          longitude: this.imageUploadData.location.lng,
          category: this.imageUploadData.categoryIds
        }

        const config = {
          headers: {
            'x-auth': authToken
          }
        }

        axios.put(`http://localhost:3000/upload/${this.imageId}`, data, config)
          .then((response) => {
            this.$store.commit('setUploadData', {
              isImageuploaded: true
            })
          })
          .catch((error) => {
            this.$store.commit('setUploadData', {
              errorMessage: error.message
            })
          })
      }
    }
  }
</script>
