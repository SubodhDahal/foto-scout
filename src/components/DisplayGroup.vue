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

      <div class="col-md-8 offset-2 mt-4" v-if="isGroupDeleted">
        <b-alert :show="isGroupDeleted">
          Group deleted successfully
        </b-alert>
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

      <div class="col-md-5 white-bg br-5">
        <div class="py-3">
          <div class="float-right"v-if="activeGroup.admins.indexOf(userDetails._id)!==-1">
            <router-link
              class="btn btn-light"
              title="Edit"
              :to="{name:'EditGroup',params:{id:activeGroup._id}}">
              <i class="fa fa-pencil" aria-hidden="true"></i>
            </router-link>

            <a href="#" class="btn btn-light" title="Delete" @click.prevent="deleteGroup(activeGroup._id)">
              <i class="fa fa-trash" aria-hidden="true"></i>
            </a>
          </div>
          <div class="clearfix"></div>

          <p>{{ activeGroup.description }}</p>

          <p>
            <strong>Members:</strong>
          </p>
        </div>
      </div>
    </div>

    <simplert :useRadius="true"
              :useIcon="true"
              ref="simplert">
    </simplert>
  </div>
</template>

<script>
  import axios from 'axios'
  import { mapGetters } from 'vuex'
  import Simplert from 'vue2-simplert'

  export default {
    data () {
      return {
        isGroupDeleted: false,

        activeGroup: {
          _id: 0,
          name: '',
          description: ''
        }
      }
    },

    components: {
      Simplert
    },

    computed: {
      /* get groups from VueX Store */
      ...mapGetters([
        'groups',
        'userDetails'
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
      },

      deleteGroup (id) {
        let obj = {
          title: 'Are you sure you want to delete the group?',
          type: 'warning',
          useConfirmBtn: true,
          customConfirmBtnText: 'Yes',
          onConfirm: () => {
            let authToken = localStorage.getItem('authToken')

            let config = {
              headers: {
                'x-auth': authToken
              }
            }

            axios.delete(`http://localhost:3000/group/${id}`, config)
              .then((response) => {
                this.$store.dispatch('getGroupList')
                  .then((response) => {
                    this.isGroupDeleted = true

                    this.setActive(this.groups[0])
                  })
              })
              .catch((error) => {
                console.log(error)
              })
          }
        }

        this.$refs.simplert.openSimplert(obj)
      }
    }
  }
</script>
