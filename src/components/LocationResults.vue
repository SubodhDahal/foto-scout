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
  export default {
    computed: {
      location () {
        let center = {
          lat: 51.1657,
          lng: 10.4515
        }

        if (this.$store.state.location.id) {
          center = this.$store.getters.locationCoordinates
        }

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