<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <b-alert :show="isImageuploaded" dismissible>
          Image uploaded successfully
        </b-alert>

        <b-alert :show="errorMessage!=''" class="alert-danger" dismissible>
          ERROR: {{ errorMessage }}
        </b-alert>

        <h2 class="mb-4">{{ $t('upload-image') }}</h2>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6">
        <!--Form-group for entities-->
        <b-form-group
          id="bformimageupload"
          :label="$t('labelforimage')">
          <!--to choose file to upload pic-->
          <b-form-file
            id="file_input1"
            v-model="file"
            accept="image/*"
            @change="onFilePicked"
            ref="fileInput">
          </b-form-file>
        </b-form-group>

        <ImageDescriptionForm />

        <b-form-group>
          <b-button type="submit" @click="uploadImage" variant="primary">{{ $t('labelforsubmit') }}</b-button>
          <b-button type="reset" variant="danger" @click="resetForm">{{ $t('labelforreset') }}</b-button>
        </b-form-group>
      </div>

      <div class="col-md-6">
        <img :src="imageUrl" class="img-fluid" v-if="imageUrl">
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import { mapGetters } from 'vuex'
  import ImageDescriptionForm from './ImageDescriptionForm'

  export default {
    components: {
      ImageDescriptionForm
    },

    computed: {
      /* get imageCategories and imageupload from VueX Store */
      ...mapGetters([
        'imageCategories',
        'imageUploadData'
      ]),

      file: {
        get () {
          return this.$store.state.imageUpload.file
        },

        set (value) {
          this.$store.commit('setUploadData', {
            file: value
          })
        }

      },

      isImageuploaded: {
        get () {
          return this.$store.state.imageUpload.isImageuploaded
        },

        set (value) {
          this.$store.commit('setUploadData', {
            isImageuploaded: value
          })
        }
      },

      imageUrl: {
        get () {
          return this.$store.state.imageUpload.imageUrl
        },

        set (value) {
          this.$store.commit('setUploadData', {
            imageUrl: value
          })
        }
      },

      errorMessage: {
        get () {
          return this.$store.state.imageUpload.errorMessage
        },

        set (value) {
          this.$store.commit('setUploadData', {
            errorMessage: value
          })
        }
      }
    },

    mounted () {
      this.resetForm()
    },

    /* function to preview upload images */
    methods: {
      onFilePicked (event) {
        const files = event.target.files
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          this.$store.commit('setUploadData', {
            imageUrl: fileReader.result
          })
          // this.imageUploadData.imageUrl = fileReader.result
        })
        fileReader.readAsDataURL(files[0])
        this.$store.commit('setUploadData', {
          image: files[0]
        })
      },

      /**
       *  reset the field of upload images
       **/
      resetForm () {
        this.$store.commit('setUploadData', {
          file: null,
          description: '',
          imageUrl: '',
          category: [],
          location: {
            lat: '',
            lng: ''
          },
          errorMessage: '',
          isImageuploaded: false
        })
        this.$refs.fileInput.reset()
      },

      /**
       * Upload image to server
       */
      uploadImage () {
        let authToken = localStorage.getItem('authToken')

        let formData = new FormData()
        formData.append('image', this.file)
        formData.append('description', this.imageUploadData.description)
        formData.append('latitude', this.imageUploadData.location.lat)
        formData.append('longitude', this.imageUploadData.location.lng)
        formData.append('category', this.imageUploadData.categoryIds)

        const config = {
          headers: {
            'content-type': 'multipart/form-data',
            'x-auth': authToken
          }
        }

        axios.post('http://localhost:3000/upload', formData, config)
          .then((response) => {
            this.resetForm()

            this.$store.commit('setUploadData', {
              isImageuploaded: true
            })
          })
          .catch((error) => {
            this.$store.commit('setUploadData', {
              errorMessage: error.response.data.message
            })
          })
      }
    }
  }
</script>
