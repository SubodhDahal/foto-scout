<template>
  <gmap-map
    :center="location.center"
    :zoom="10"
    style="width: 100%; height: 350px"
    @click="changeLocation"
  >
    <gmap-marker
      :position="location.marker.position"
      :clickable="true"
      :draggable="true"
      @click="location.center=location.marker.position"
    >
    </gmap-marker>

    <gmap-info-window
      :options="infoOptions"
      :position="location.marker.position"
      :opened="true"
      @closeclick="infoWinOpen=false">
        <p></p>
        <p>{{ images.length }} image{{ images.length > 1 ? 's' : '' }}</p>
        <p>
          <router-link :to="{name:'SearchResults'}" v-if="images.length > 0">
            View images
          </router-link>
        </p>
    </gmap-info-window>
  </gmap-map>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    data () {
      return {
        // make the info window appear on top of the marker
        infoOptions: {
          pixelOffset: {
            width: 0,
            height: -35
          }
        }
      }
    },

    computed: {
      ...mapGetters([
        'locationCoordinates',
        'images',
        'searchOptions'
      ]),

      location () {
        let center = this.locationCoordinates

        return {
          center,
          marker: {
            position: center
          }
        }
      }
    },

    methods: {
      /**
       * Change the location based to the
       * position clicked on the map
       * @param  {Object} data
       */
      changeLocation (data) {
        this.$store.commit('setLocation', {
          location: {
            lat: data.latLng.lat(),
            lng: data.latLng.lng(),
            name: ''
          }
        })

        this.getImageResults()
      },

      /**
       * Get the images for the selected location
       */
      getImageResults () {
        let payload = {
          ...this.locationCoordinates,
          radius: this.searchOptions.radius
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