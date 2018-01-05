<template>
  <header id="header" class="container">
    <div class="row mt-3 mb-1">
      <div class="col-md-6 offset-md-3 text-center">
        <router-link :to="{name:'Home'}">
          <img src="/static/images/logo.png" class="img-fluid" alt="Foto Scout">
        </router-link>
      </div>

      <div class="col-12 col-md-2 text-center">
        <LanguageSelector />
        <br>
        <router-link :to="{name:'Registration'}">{{ $t('register') }}</router-link>
        <router-link :to="{name:'UserLogin'}">{{ $t('login') }}</router-link>
      </div>
    </div>
  </header><!-- /header -->
</template>

<script>
  import LanguageSelector from './LanguageSelector'

  export default {
    components: {
      LanguageSelector
    }
  }
</script>