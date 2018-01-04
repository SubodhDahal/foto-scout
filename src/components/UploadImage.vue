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
        <strong>{{ $t('labelforimagecategory') }}</strong>
        <!--using vue-select plugin for image category-->
        <v-select multiple :value.sync="category" :options="imageCategories"
                  :placeholder="$t('selectforimagecategory')"></v-select>
        <br>
        <b-form-group :label="$t('labelfordescription')">
          <!--textarea for description-->
          <b-form-textarea
            id="description"
            v-model="description"
            rows="4"
            :placeholder="$t('descriptiontext')"
          >
          </b-form-textarea>
        </b-form-group>

        <b-form-group :label="$t('labelforlocation')"
                      id="location"
                      v-model="location.name">
          <gmap-autocomplete
            class="form-control p-3 mr-2 search-box"
            :placeholder="$t('locationname')"
            :value="location.name"
            @place_changed="getAddressData"
          >
          </gmap-autocomplete>
        </b-form-group>

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
  import vSelect from 'vue-select'
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      /* get imageCategories and imageupload from VueX Store */
      ...mapGetters([
        'imageCategories',
        'imageUploadData'
      ]),

      description: {
        get () {
          return this.$store.state.imageUpload.description
        },

        set (value) {
          this.$store.commit('setUploadData', {
            description: value
          })
        }
      },
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
      errorMessage: {
        get () {
          return this.$store.state.imageUpload.errorMessage
        },

        set (value) {
          this.$store.commit('setUploadData', {
            errorMessage: value
          })
        }
      },
      location: {
        get () {
          return this.$store.state.imageUpload.location
        },

        set (value) {
          this.$store.commit('setUploadData', {
            location: value
          })
        }
      },
      category: {
        get () {
          return this.$store.state.imageUpload.category
        },

        set (value) {
          this.$store.commit('setUploadData', {
            category: value
          })
        }
      }
    },

    components: {
      vSelect
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
      },

      /**
       * save address data to location field
       * @param addressData
       */
      getAddressData (addressData) {
        this.$store.commit('setUploadData', {
          location: {
            lat: addressData.geometry.location.lat(),
            lng: addressData.geometry.location.lng(),
            name: addressData.formatted_address
          }
        })
      },

      mounted () {
        this.$store.dispatch('getImageCategories')
          .then((res) => {
            console.log('RES', res)
          })
          .catch((error) => {
            console.log('ERROR', error)
          })
      }
    }
  }
</script>
