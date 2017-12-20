<template>
  <header id="header">
    <div class="display-3 text-center mt-3 mb-1">
      <img src="/static/images/logo.png" alt="Foto Scout">
    </div>

    <div class="float-right">
      <LanguageSelector />
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