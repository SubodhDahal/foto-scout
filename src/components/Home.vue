<template>
  <div class="container">
    <div class="row">
      <div class="col-8 offset-2">
        <Search />
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <LocationResults />
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <SearchResults />
      </div>
    </div>
  </div>
</template>

<script>
  import Search from './Search'
  import LocationResults from './LocationResults'
  import SearchResults from './SearchResults'

  export default {
    name: 'home',

    components: {
      Search,
      LocationResults,
      SearchResults
    }
  }
</script>
