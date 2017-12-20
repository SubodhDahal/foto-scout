<template>
  <div>
     <a href="#" @click.prevent="changeLanguage('en')">English</a>

     <a href="#" @click.prevent="changeLanguage('de')">Deutsch</a>
  </div>
</template>

<script>
  export default {
    methods: {
      /**
       * Change the system language
       * @param  {String} language
       */
      changeLanguage (language) {
        this.$store.commit('changeLanguage', {
          language
        })

        this.$i18n.set(language)
      }
    }
  }
</script>