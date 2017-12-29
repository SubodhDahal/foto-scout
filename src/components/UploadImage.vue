<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <b-form-group
          id="bformimageupload"
          :label="$t('labelforimage')">
          <b-form-file id="file_input1" v-model="file" accept="image/*" @change="onFilePicked"
                       ref="fileInput"></b-form-file>
        </b-form-group>

        <b-form-group :label="$t('labelfordescription')">
          <b-form-textarea
            id="description"
            v-model="text"
            rows="4"
            :placeholder="$t('descriptiontext')"
          >
          </b-form-textarea>
        </b-form-group>
        <b-form-group :label="$t('labelforlocation')"
                      id="location"
                      v-model="location">
          <gmap-autocomplete
            class="form-control p-3 mr-2 search-box"
            :placeholder="$t('locationname')"
            :value="locationName"
            @place_changed="getAddressData"
          >
          </gmap-autocomplete>
        </b-form-group>


        <b-form-group>
          <b-button type="submit" @click="uploadImage" variant="primary">
            {{$t('labelforsubmit')}}
          </b-button>

          <b-button type="reset" variant="danger" @click="onReset">
            {{$t('labelforreset')}}
          </b-button>
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
        text: '',
        location: ''
      }
    },
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

      onReset () {
        this.file = null
        this.text = ''
        this.imageUrl = ''
        this.$refs.fileInput.reset()
      },

      uploadImage () {
        let formData = new FormData()
        formData.append('image', this.file)

        axios.post('http://localhost:3000/upload', {
          formData
        })
          .then(response => console.log(response.data))
      },
      getAddressData (addressData) {
        this.location = addressData
      }
    }
  }
</script>
