<template>
  <div class="mt-3 float-right">
    <Language name="English" locale="en" flag="UK" />
    <Language name="Deutsch" locale="de" flag="DE" />
  </div>
</template>

<script>
  import Language from './Language'

  export default {
    components: {
      Language
    }
  }
</script>