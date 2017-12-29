<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <b-form-group
          id="bformimageupload"
          label="Choose Image to upload">
          <b-form-file
            id="file_input1"
            v-model="file"
            accept="image/*"
            @change="onFilePicked"
           ref="fileInput">
         </b-form-file>
        </b-form-group>

        <b-form-group label="Description">
          <b-form-textarea
            id="descriptiontext"
            v-model="text"
            rows="4"
            placeholder="Write description about this image"
          >
          </b-form-textarea>
        </b-form-group>

        <b-form-group>
          <b-button type="submit" @click="uploadImage" variant="primary">Submit</b-button>
          <b-button type="reset" variant="danger" @click="onReset">Reset</b-button>
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
        text: ''
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

        const config = {
          headers: { 'content-type': 'multipart/form-data' }
        }

        axios.post('http://localhost:3000/upload', formData, config)
          .then(response => console.log(response.data))
      }
    }
  }
</script>
