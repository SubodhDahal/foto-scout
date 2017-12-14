<template>
  <div class="form-group form-inline mt-5">
    <gmap-autocomplete
      class="form-control p-3 mr-2 search-box"
      placeholder="Enter location to search"
      :value="locationName"
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
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters([
        'locationName'
      ])
    },

    methods: {
      getAddressData (addressData) {
        this.$store.commit('setLocation', {
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
