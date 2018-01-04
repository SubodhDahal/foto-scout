<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <b-alert :show="isImageuploaded">
          Image uploaded successfully
        </b-alert>
        <!--Throw error message while uploading the image-->
        <b-alert :show="errorMessage!=''" class="alert-danger">
          ERROR: {{ errorMessage }}
        </b-alert>
        <div class="col-md-10 offset-2">
          <h1 style="color:Green;"><u>Upload your Image:</u></h1>
        </div>
        <br>
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
          <b-button type="reset" variant="danger" @click="onReset">{{ $t('labelforreset') }}</b-button>
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
      onReset () {
        this.$store.commit('setUploadData', {
          file: null,
          text: '',
          imageUrl: '',
          isImageuploaded: false
        })
        this.$refs.fileInput.reset()
      },

      uploadImage () {
        let formData = new FormData()
        formData.append('image', this.file)
        formData.append('description', this.description)
        formData.append('latitude', this.location.lat)
        formData.append('longitude', this.location.lng)

        const config = {
          headers: {'content-type': 'multipart/form-data'}
        }

        axios.post('http://localhost:3000/upload', formData, config)
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
