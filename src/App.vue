<template>
  <div class="main">
    <AppHeader />

    <div class="mt-4">
      <div class="container">
        <div class="row">
          <div class="col-md-8 offset-2" v-if="flashMessage !== ''">
            <b-alert
              dismissible
              :show="true"
              @dismissed="dismissFlashMessage">
              {{ flashMessage }}
            </b-alert>
          </div>
        </div>
      </div>

      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import AppHeader from './components/AppHeader'

  export default {
    components: {
      AppHeader
    },

    computed: {
      ...mapGetters([
        'flashMessage'
      ])
    },

    mounted () {
      // get user details on app load if s/he
      // has already logged in previously
      this.$store.dispatch('getUserDetails')
    },

    methods: {
      dismissFlashMessage () {
        this.$store.commit('setFlashMessage', {
          message: ''
        })
      }
    }
  }
</script>
