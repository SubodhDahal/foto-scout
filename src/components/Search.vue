<template>
  <div class="row">
    <div class="col-md-12">
      <div class="form-group form-inline mt-5">
        <gmap-autocomplete
          class="form-control p-3 mr-2 search-box"
          :placeholder="$t('searchText')"
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
    </div>

    <div class="col-md-4">
      <SearchOptions />
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import SearchOptions from './SearchOptions'

  export default {
    computed: {
      ...mapGetters([
        'locationName'
      ])
    },

    components: {
      SearchOptions
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
