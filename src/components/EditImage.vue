<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 offset-3">
        <ImageDescriptionForm/>
        <b-form-group>
          <b-button type="submit" @click="editImage" variant="primary"> Edit </b-button>
        </b-form-group>
      </div>
    </div>

  </div>
</template>
<script>
  import ImageDescriptionForm from './ImageDescriptionForm'

  export default {
    components: {
      ImageDescriptionForm
    },
    methods: {
      editImage () {
      }
    }

  }

</script>
