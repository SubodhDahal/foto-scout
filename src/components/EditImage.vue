<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <b-alert :show="imageUploadData.isImageuploaded">
          Edit image successfully
        </b-alert>
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

    mounted () {
      let imageId = this.$route.params.id

      axios.get(`http://localhost:3000/upload/${imageId}`)
        .then((response) => {
          console.log(response)
          this.$store.commit('setUploadData', {
            file: null,
            text: response.data.description,
            imageUrl: 'http://localhost:3000/' + response.data.path,
            isImageuploaded: false
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
        let imageId = this.$route.params.id

        let formData = new FormData()
        formData.append('description', this.imageUploadData.description)
        formData.append('latitude', this.imageUploadData.location.lat)
        formData.append('longitude', this.imageUploadData.location.lng)
        const config = {
          headers: {'content-type': 'multipart/form-data'}
        }

        axios.put(`http://localhost:3000/upload/${imageId}`, formData, config)
          .then((response) => {
            if (response.data.success === 'true') {
              this.$store.commit('setUploadData', {
                isImageuploaded: true
              })
            } else {
              this.$store.commit('setUploadData', {
                errorMessage: response.data.message
              })
            }
          })
      }
    }
  }

</script>
