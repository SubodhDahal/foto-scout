<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <b-alert :show="isImageuploaded">
          Image uploaded successfully
        </b-alert>
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

  export default {
    data () {
      return {
        file: null,
        imageUrl: null,
        description: '',
        isImageuploaded: false,
        errorMessage: '',
        location: {}
      }
    },
    /* function to preview upload images */
    methods: {
      onFilePicked (event) {
        const files = event.target.files
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          this.imageUrl = fileReader.result
        })
        fileReader.readAsDataURL(files[0])
        this.image = files[0]
      },

      /**
       *  reset the field of upload images
       **/
      onReset () {
        this.file = null
        this.text = ''
        this.imageUrl = ''
        this.$refs.fileInput.reset()
        this.isImageuploaded = false
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
              this.isImageuploaded = true
            } else {
              this.errorMessage = response.data.message
            }
          })
      },

      /**
       * save address data to location field
       * @param addressData
       */
      getAddressData (addressData) {
        this.location = {
          lat: addressData.geometry.location.lat(),
          lng: addressData.geometry.location.lng(),
          name: addressData.formatted_address
        }
      }
    }
  }
</script>
