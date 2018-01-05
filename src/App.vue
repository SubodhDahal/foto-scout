<template>
  <div class="main">
    <AppHeader />

    <div class="mt-4">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import AppHeader from './components/AppHeader'

  export default {
    components: {
      AppHeader
    },

    mounted () {
      // get user details on app load if s/he
      // has already logged in previously
      this.$store.dispatch('getUserDetails')
    }
  }
</script>
