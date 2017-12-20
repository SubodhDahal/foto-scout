<template>
  <a href="#" @click.prevent="change(locale)">
    {{ name }}
  </a>
</template>

<script>
  export default {
    props: {
      locale: {
        type: String,
        default: 'en'
      },
      name: {
        type: String,
        default: 'English'
      }
    },

    methods: {
      /**
       * Change the system language
       * @param  {String} language
       */
      change (language) {
        this.$store.commit('changeLanguage', {
          language
        })

        this.$i18n.set(language)
      }
    }
  }
</script>