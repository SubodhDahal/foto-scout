<template>
  <div>
    <strong>{{ $t('labelforimagecategory') }}</strong>
    <!--using vue-select plugin for image category-->
    <v-select multiple :value.sync="category" :options="imageCategories"
              :placeholder="$t('selectforimagecategory')"></v-select>
    <br>
    <b-form-group :label="$t('labelfordescription')">
      <!--textarea for description-->
      <b-form-textarea
        id="description"
        v-model="description"
        rows="4"
        :placeholder="$t('descriptiontext')"
      >
      </b-form-textarea>
    </b-form-group>

    <b-form-group :label="$t('labelforlocation')"
                  id="location"
                  v-model="location.name">
      <gmap-autocomplete
        class="form-control px-3 py-2 mr-2 w-100"
        :placeholder="$t('locationname')"
        :value="location.name"
        @place_changed="getAddressData"
      >
      </gmap-autocomplete>
    </b-form-group>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import vSelect from 'vue-select'

  export default {
    components: {
      vSelect
    },

    computed: {
      /* get imageCategories and imageupload from VueX Store */
      ...mapGetters([
        'imageCategories',
        'imageUploadData'
      ]),

      description: {
        get () {
          return this.$store.state.imageUpload.description
        },

        set (value) {
          this.$store.commit('setUploadData', {
            description: value
          })
        }
      },
      imageUrl: {
        get () {
          return this.$store.state.imageUpload.imageUrl
        },

        set (value) {
          this.$store.commit('setUploadData', {
            imageUrl: value
          })
        }
      },
      location: {
        get () {
          return this.$store.state.imageUpload.location
        },

        set (value) {
          this.$store.commit('setUploadData', {
            location: value
          })
        }
      },
      category: {
        get () {
          return this.$store.state.imageUpload.category
        },

        set (value) {
          this.$store.commit('setUploadData', {
            category: value
          })
        }
      }
    },

    mounted () {
      this.$store.dispatch('getImageCategories')
    },

    methods: {
      /**
       * save address data to location field
       * @param addressData
       */
      getAddressData (addressData) {
        this.$store.commit('setUploadData', {
          location: {
            lat: addressData.geometry.location.lat(),
            lng: addressData.geometry.location.lng(),
            name: addressData.formatted_address
          }
        })
      }
    }
  }
</script>
