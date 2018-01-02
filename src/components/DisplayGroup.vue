<template>
  <div class="container">
    <div class="row">
      <div class="col-md-2 offset-md-8">
        <!--routes to CreateGroup component-->
        <router-link :to="{name:'CreateGroup'}">
          <b-button class="danger float-right">
            Create Group
          </b-button>
        </router-link>

      </div>
    </div>

    <div class="row">
      <div class="col-md-8 offset-2 mt-4">

        <b-card no-body>
          <b-tabs pills card vertical>
            <b-tab v-for="group in groups" :key="group._id">
             {{ group._id }}
            </b-tab>
          </b-tabs>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      /* get groups from VueX Store */
      ...mapGetters([
        'groups'
      ])
    }
  }
</script>
