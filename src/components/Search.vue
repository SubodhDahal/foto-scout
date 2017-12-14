<template>
  <div class="form-group form-inline mt-5">
    <gmap-autocomplete
      class="form-control p-3 mr-2 search-box"
      placeholder="Enter location to search"
      @place_changed="getAddressData"
    >
    </gmap-autocomplete>

    <button class="btn btn-primary p-3"
            @click="getAddressData()"
            type="submit">
      Search
    </button>
  </div>
</template>

<script>
  export default {
    methods: {
      getAddressData (addressData) {
        // addressData = {
        //   id: 2,
        //   lat: 3,
        //   lng: 5
        // }
        this.$store.commit('SET_LOCATION', {
          location: addressData
        })
      }
    }
  }
</script>

<style>
  .search-box {
    width: 85%!important;
  }
</style>
