<template>
  <div class="col-8 offset-2">
    <div class="form-group form-inline mt-5">
      <vue-google-autocomplete
        id="map"
        types=""
        ref="address"
        classname="form-control p-3 mr-2 search-box"
        placeholder="Enter location to search"
        @placechanged="getAddressData"
      />
      <button class="btn btn-primary p-3" type="submit">Search</button>
    </div>
  </div>
</template>

<script>
  import VueGoogleAutocomplete from 'vue-google-autocomplete'

  export default {
    data () {
      return {
        address: {}
      }
    },

    components: {
      VueGoogleAutocomplete
    },

    mounted () {
      this.$refs.address.focus()
    },

    methods: {
      /**
      * When the location found
      * @param {Object} addressData Data of the found location
      * @param {Object} placeResultData PlaceResult object
      * @param {String} id Input container ID
      */
      getAddressData (addressData, placeResultData, id) {
        console.log(addressData)
        console.log(placeResultData)
        this.address = addressData
      }
    }
  }
</script>

<style>
  .search-box {
    width: 85%!important;
  }
</style>