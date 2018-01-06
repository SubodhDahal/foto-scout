<template>
  <div class="container">
    <b-navbar toggleable="md" type="light" class="py-3 main-nav">
      <template v-if="isUserLoggedIn">
        <ul class="nav navbar-nav">
          <li class="nav-item mr-4">
            <router-link :to="{name:'Home'}">
              <i class="fa fa-home" aria-hidden="true"></i>
            </router-link>
          </li>
          <li class="nav-item mr-4">
            <router-link :to="{name:'UploadImage'}">
              Upload Image
            </router-link>
          </li>

          <li class="nav-item mr-4">
            <router-link :to="{name:'UserImages'}">
              My Images
            </router-link>
          </li>

          <li class="nav-item mr-4">
            <router-link :to="{name:'DisplayGroup'}">
              Groups
            </router-link>
          </li>
        </ul>

        <ul class="nav navbar-nav justify-content-end">
          <li class="nav-item mr-4">
            Welcome {{ userDetails.firstname }}
          </li>
          <li class="nav-item mr-4">
            <a href="#" @click.prevent="logout">Logout</a>
          </li>
        </ul>
      </template>

      <template v-if="!isUserLoggedIn">
        <ul class="nav navbar-nav justify-content-end">
          <li class="nav-item mr-4">
            <router-link :to="{name:'Registration'}">{{ $t('register') }}</router-link>
          </li>
          <li class="nav-item mr-4">
            <router-link :to="{name:'UserLogin'}">{{ $t('login') }}</router-link>
          </li>
        </ul>
      </template>
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
          .then(() => {
            this.$router.push({name: 'Home'})
          })
      }
    }
  }
</script>

<style>
  .main-nav {
    border-radius: 5px;
    background-color: #dd823a !important;
  }
  .navbar-nav, .navbar-nav a {
    color: #fff;
  }
  .navbar-nav a {
    text-decoration: underline;
  }
</style>