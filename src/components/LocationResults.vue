<template>
  <gmap-map
    :center="location.center"
    :zoom="8"
    style="width: 100%; height: 400px"
    @click="changeLocation"
  >
    <gmap-marker
      :position="location.marker.position"
      :clickable="true"
      :draggable="true"
      @drag="changeLocation"
    >
   </gmap-marker>

    <gmap-circle
      :center="location.marker.position"
      :radius="overlayCircleRadius"
      :options="circleOptions"
    >
    </gmap-circle>

    <gmap-info-window
      :options="infoOptions"
      :position="location.marker.position"
      :opened="true">
        <p></p>
        <p>
          {{ images.length }}
          <template v-if="images.length <=1 ">{{ $t('image') }}</template>
          <template v-if="images.length > 1">{{ $t('images') }}</template>
        </p>
        <p>
          <router-link :to="{name:'SearchResults', query: {lat: locationCoordinates.lat, lng: locationCoordinates.lng, radius: searchOptions.radius, name: locationName, 'categories[]': searchOptions.categories }}" v-if="images.length > 0">
            {{ $t('images-view') }}
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
        },

        circleOptions: {
          strokeColor: '#069',
          strokeOpacity: 0.35,
          fillColor: '#069',
          fillOpacity: 0.35
        }
      }
    },

    computed: {
      ...mapGetters([
        'locationCoordinates',
        'locationName',
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
      },

      overlayCircleRadius () {
        return (this.searchOptions.radius) * 1000
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

<style>
  .gm-style .gm-style-iw {
    color: #333;
  }
  /* Hide the close button on info window */
  .gm-style .gm-style-iw + div {
    display: none; /* <-- this will generally work on the fly. */
    visibility: hidden; /* this 2 lines below are just for hard hiding. :) */
    opacity: 0;
  }
</style>