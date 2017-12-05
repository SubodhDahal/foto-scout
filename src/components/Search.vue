<template>
  <div class="col-8 offset-2">
    <div class="form-group form-inline mt-5">
      <gmap-autocomplete
        class="form-control p-3 mr-2 search-box"
        placeholder="Enter location to search"
        @place_changed="getAddressData"
      >
      </gmap-autocomplete>

      <button class="btn btn-primary p-3" type="submit">Search</button>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        address: {}
      }
    },

    methods: {
      getAddressData (addressData) {
        console.log(addressData)
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