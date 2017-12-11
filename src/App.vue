<template>
  <div>
    <header id="header" class="display-3 text-center mt-3 mb-3">
      <img src="/static/images/logo.png" alt="Foto Scout">
    </header><!-- /header -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>
