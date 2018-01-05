<template>
  <div class="main">
    <AppHeader />

    <NavigationMenu />

    <div class="mt-4">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import AppHeader from './components/AppHeader'
  import NavigationMenu from './components/NavigationMenu'

  export default {
    components: {
      AppHeader,
      NavigationMenu
    },

    mounted () {
      // get user details on app load if s/he
      // has already logged in previously
      this.$store.dispatch('getUserDetails')
    }
  }
</script>
