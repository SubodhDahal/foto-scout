<template>
  <div class="container">
    <div class="row">
      <Search />
      <
    </div>

    <div class="row">
      <SearchResults/>
    </div>
  </div>
</template>

<script>
  import Search from './Search'
  import SearchResults from './SearchResults'

  export default {
    name: 'home',

    components: {
      Search,
      SearchResults

    }
  }
</script>
