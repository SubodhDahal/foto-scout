<template>
  <a href="#" @click.prevent="change(locale)" :class="{'selected-language': isSelected}">
    <img :src="`/static/images/flags/${flag}.png`" :alt="name">
  </a>
</template>

<script>
  export default {
    props: {
      locale: {
        type: String,
        default: 'en'
      },
      flag: {
        type: String,
        default: 'UK'
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
        localStorage.setItem('language', language)

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
    padding: 0 1px 2px 1px;
    box-shadow: 1px 1px 0px #fff, 1px 1px 4px #000;
    border-radius: 2px; padding: 2px!important;
  }
</style>
