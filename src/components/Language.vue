<template>
  <a href="#" @click.prevent="change(locale)" :class="{'selected-language': isSelected}">
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

    computed: {
      isSelected () {
        return this.locale === this.$store.getters.language
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

<style>
  .selected-language {
    font-weight: bold;
  }
</style>