<template>
  <header id="header">
    <div class="container">
      <div id="logo" class="pull-left">
        <router-link :to="{name:'Home'}">
          <img src="/static/images/logo.png" alt="" title=""/>
        </router-link>
      </div>

      <nav class="justify-content-end" id="nav-menu-container">
        <ul class="nav-menu">
          <li>
            <router-link :to="{name:'Home'}" title="Home" exact>
              <i class="fa fa-home" aria-hidden="true"></i>
            </router-link>
          </li>

          <template v-if="isUserLoggedIn">
            <li class="menu-has-children">
              <router-link :to="{name:'UserImages'}" exact>
                {{ $t('images') }}
              </router-link>

              <ul>
                <li>
                  <router-link :to="{name:'UserImages'}" exact>
                    {{ $t('my-images') }}
                  </router-link>
                </li>
                <li>
                  <router-link :to="{name:'UploadImage'}">
                    {{ $t('upload') }}
                  </router-link>
                </li>
              </ul>
            </li>

            <li>
              <router-link :to="{name:'DisplayGroup'}">
                {{ $t('groups') }}
              </router-link>
            </li>

            <li class="menu-has-children">
              <router-link :to="{name:'Profile'}" exact>
                {{ $t('profile') }}
              </router-link>
              <ul>
                <li>
                  <router-link :to="{name:'Profile'}">
                    {{ $t('my-account') }}
                  </router-link>
                </li>
                <li>
                  <a href="#" @click.prevent="logout">
                    {{ $t('logout') }}
                  </a>
                </li>
              </ul>
            </li>
          </template>

          <template v-if="!isUserLoggedIn">
            <li>
              <router-link :to="{name:'Registration'}">
                {{ $t('register') }}
              </router-link>
            </li>
            <li>
              <router-link :to="{name:'UserLogin'}">
                {{ $t('login') }}
              </router-link>
            </li>
          </template>

          <li class="ml-4">
            <LanguageSelector/>
          </li>
        </ul>

      </nav><!-- #nav-menu-container -->

      <div class="clearfix"></div>
    </div>
  </header>
</template>

<script>
  import { mapGetters } from 'vuex'
  import LanguageSelector from './LanguageSelector'

  export default {
    components: {
      LanguageSelector
    },

    computed: {
      ...mapGetters([
        'isUserLoggedIn'
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
  #header {
    padding: 15px 0 0 0;
    height: 92px;
    left: 0;
    top: 0;
    right: 0;
    transition: all 0.5s;
    z-index: 997;
  }

  #header #logo {
    float: left;
  }

  #header #logo h1 {
    font-size: 36px;
    margin: 0;
    padding: 6px 0;
    line-height: 1;
    font-family: "Poppins", sans-serif;
    font-weight: 700;
    letter-spacing: 3px;
    text-transform: uppercase;
  }

  #header #logo h1 a, #header #logo h1 a:hover {
    color: #fff;
  }

  #header #logo img {
    max-height: 70px;
    padding: 0;
    margin: 0;
  }

  @media (max-width: 768px) {
    #header #logo h1 {
      font-size: 16px;
    }

    #header #logo img {
      max-height: 20px;
    }

    #nav-menu-container {
      padding: 0px !important;
    }
  }


  /*--------------------------------------------------------------
# Navigation Menu
--------------------------------------------------------------*/
  /* Nav Menu Essentials */
  .nav-menu, .nav-menu * {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .nav-menu ul {
    position: absolute;
    display: none;
    top: 100%;
    left: 0;
    z-index: 99;
  }

  .nav-menu li {
    position: relative;
    white-space: nowrap;
  }

  .nav-menu > li {
    float: left;
  }

  .nav-menu li:hover > ul,
  .nav-menu li.sfHover > ul {
    display: block;
  }

  .nav-menu ul ul {
    top: 0;
    left: 100%;
  }

  .nav-menu ul li {
    min-width: 180px;
  }

  /* Nav Menu Arrows */
  .sf-arrows .sf-with-ul {
    padding-right: 30px;
  }

  .sf-arrows .sf-with-ul:after {
    content: "\f107";
    position: absolute;
    right: 15px;
    font-family: FontAwesome;
    font-style: normal;
    font-weight: normal;
  }

  .sf-arrows ul .sf-with-ul:after {
    content: "\f105";
  }

  /* Nav Meu Container */
  #nav-menu-container {
    padding: 15px;
    float: right;
    margin: 0;
  }

  /* Nav Meu Styling */
  .nav-menu a {
    padding: 0 8px 10px 8px;
    text-decoration: none;
    display: inline-block;
    color: #03a9f4;
    font-family: "Poppins", sans-serif;
    font-weight: 400;
    text-transform: uppercase;
    font-size: 13px;
    outline: none;
  }

  .nav-menu > li {
    margin-left: 10px;
  }

  .nav-menu > li > a:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: #2dc997;
    visibility: hidden;
    -webkit-transform: scaleX(0);
    transform: scaleX(0);
    -webkit-transition: all 0.3s ease-in-out 0s;
    transition: all 0.3s ease-in-out 0s;
  }

  .nav-menu a:hover:before, .nav-menu li:hover > a:before, .nav-menu .router-link-active:before {
    visibility: visible;
    -webkit-transform: scaleX(1);
    transform: scaleX(1);
  }

  .nav-menu ul {
    padding: 4px 0 0 0;
  }

  .nav-menu ul li {
    background: #fff;
    border-bottom: 1px solid #03a9f4;
  }

  .nav-menu ul li:first-child {
    border-top: 0;
  }

  .nav-menu ul li a {
    padding: 10px;
    color: #333;
    transition: 0.3s;
    display: block;
    font-size: 13px;
    text-transform: none;
  }

  .nav-menu ul li a:hover {
    background: #2dc997;
    color: #fff;
  }

  .nav-menu ul ul {
    margin: 0;
  }
</style>
