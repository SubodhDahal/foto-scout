<template>
  <div class="container" v-if="isUserLoggedIn">
    <b-navbar toggleable="md" type="light" variant="info">

      <ul class="navbar-nav mr-auto">
        <li class="nav-item mr-4">
          <router-link :to="{name:'UploadImage'}">
            Upload Image
          </router-link>
        </li>

        <li class="nav-item mr-4">
          <router-link :to="{name:'DisplayGroup'}">
            Groups
          </router-link>
        </li>
      </ul>

      <ul class="navbar-nav mr-auto float-right">
        <li class="nav-item mr-4">
          Welcome {{ userDetails.firstname }}
        </li>
        <li class="nav-item mr-4">
          <a href="#" @click.prevent="logout">Logout</a>
        </li>
      </ul>
    </b-navbar>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters([
        'isUserLoggedIn',
        'userDetails'
      ])
    },

    methods: {
      logout () {
        this.$store.dispatch('logoutUser')
      }
    }
  }
</script>

<style>
  .navbar-nav, .navbar-nav a {
    color: #fff;
  }
  .navbar-nav a {
    text-decoration: underline;
  }
</style>