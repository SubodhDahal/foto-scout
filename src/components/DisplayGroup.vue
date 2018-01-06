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

    <div class="row mt-4">
      <div class="col-md-3 offset-2">
        <b-list-group>
          <b-list-group-item
            href="#"
            v-for="group in groups"
            :key="group._id"
            :active="group._id==activeGroup._id"
            @click.prevent="setActive(group)">
            {{ group.name }}
          </b-list-group-item>
        </b-list-group>
      </div>

      <div class="col-md-5 white-bg br-5 p-3">
        <p>{{ activeGroup.description }}</p>

        <p>
          <strong>Members:</strong>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    data () {
      return {
        activeGroup: {
          _id: 0,
          name: '',
          description: ''
        }
      }
    },

    computed: {
      /* get groups from VueX Store */
      ...mapGetters([
        'groups'
      ])
    },

    mounted () {
      this.$store.dispatch('getGroupList')
        .then((res) => {
          this.activeGroup = this.groups.length ? this.groups[0] : {}
          console.log('RES', res)
        })
        .catch((error) => {
          console.log('ERROR', error)
        })
    },

    methods: {
      setActive (group) {
        this.activeGroup = group
      }
    }
  }
</script>
