<template>
  <div class="row">
    <div class="col-md-12">
      <div class="form-group form-inline mt-5">
        <gmap-autocomplete
          class="form-control p-3 mr-2 search-box"
          :placeholder="$t('searchText')"
          :value="locationName"
          @place_changed="changeLocation"
        >
        </gmap-autocomplete>

        <button class="btn btn-primary py-3 px-4" type="submit" @click.prevent="getImageResults">
          <i class="fa fa-search" aria-hidden="true"></i>
        </button>
      </div>
    </div>

    <SearchOptions />
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import SearchOptions from './SearchOptions'

  export default {
    computed: {
      ...mapGetters([
        'locationName',
        'locationCoordinates',
        'searchOptions'
      ])
    },

    components: {
      SearchOptions
    },

    methods: {
      /**
       * Change the location to the searched location
       * @param  {Object} addressData
       */
      changeLocation (addressData) {
        this.$store.commit('setLocation', {
          location: {
            lat: addressData.geometry.location.lat(),
            lng: addressData.geometry.location.lng(),
            name: addressData.formatted_address
          }
        })

        this.getImageResults()
      },

      /**
       * Get the images for the selected location
       */
      getImageResults () {
        console.log('here')
        let payload = {
          ...this.locationCoordinates,
          radius: this.searchOptions.radius,
          categories: this.searchOptions.categories
        }

        this.$store.dispatch('getImageResults', payload)
          .then((res) => {
            console.log('RES', res)
          })
          .catch((error) => {
            console.log('ERROR', error)
          })
      }
    }
  }
</script>

<style>
  .search-box {
    width: 90% !important;
  }
</style>