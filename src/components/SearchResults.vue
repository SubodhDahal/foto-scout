<template>
  <div class="row">
    <div v-for="image in images" class="col-md-4 col-sm-4">
      <img :src="image">


    </div>


  </div>
</template>

<script>
  /* eslint-disable padded-blocks */

  export default {
    data () {
      return {
        images: [
          'https://dummyimage.com/350x350/000000/303bdb',
          'https://dummyimage.com/350x350/000000/303bdb',
          'https://dummyimage.com/350x350/000000/303bdb'

        ],
        index: null
      }

    }
  }
</script>

<style>

</style>
