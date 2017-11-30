<template>
  <div class="container">
    <div class="row">
      <Search />
    </div>
  </div>
</template>

<script>
  import Search from './Search'

  export default {
    name: 'home',

    components: {
      Search
    }
  }
</script>