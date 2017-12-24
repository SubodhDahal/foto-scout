<template>
  <div>
    <a href="#" @click.prevent="toggle">Advanced options</a>

    <div class="row" v-if="isVisible">
      <div class="col-md-4">
        <b-form-group label="Categories:">
          <b-form-checkbox-group
            id="categories"
            name="categories"
            v-model="options.categories"
            :options="categoriesList">
          </b-form-checkbox-group>
        </b-form-group>
      </div>

      <div class="col-md-4"></div>

      <div class="col-md-4"></div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    data () {
      return {
        isVisible: false,
        categoriesList: {
          'architecture': 'Architecture',
          'landscape': 'Landscape',
          'portait': 'Portait',
          'cityscape': 'Cityscape'
        },

        options: {
          categories: []
        }
      }
    },

    computed: {
      ...mapGetters([
        'searchOptions'
      ])
    },

    methods: {
      /**
       * Toggle the visibility of options
       */
      toggle () {
        this.isVisible = !this.isVisible
      }
    },

    watch: {
      /**
       * Change the options in Vuex state as well
       * if options are changed
       * @type {Object}
       */
      options: {
        handler (newOptions) {
          this.$store.commit('setSearchOptions', {
            options: newOptions
          })
        },

        deep: true
      }
    }
  }
</script>