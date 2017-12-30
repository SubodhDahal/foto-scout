<template>
  <header id="header" class="container">
    <div class="row mt-3 mb-1">
      <div class="col-md-8 offset-md-2 text-center">
        <img src="/static/images/logo.png" class="img-fluid" alt="Foto Scout">
      </div>

      <div class="col-12 col-md-2 text-center">
        <LanguageSelector />
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