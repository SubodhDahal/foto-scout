<template>
  <gmap-map
    :center="location.center"
    :zoom="10"
    style="width: 100%; height: 350px"
  >
    <gmap-marker
      :key="index"
      v-for="(m, index) in location.markers"
      :position="m.position"
      :clickable="true"
      :draggable="true"
      @click="location.center=m.position"
    ></gmap-marker>
  </gmap-map>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters([
        'locationCoordinates'
      ]),

      location () {
        let center = this.locationCoordinates

        return {
          center,
          markers: [{
            position: center
          }]
        }
      }
    }
  }
</script>