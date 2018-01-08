<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 offset-2">
        <h2>{{ $t('groups') }}</h2>
        <hr>
      </div>
    </div>

    <div class="row">
      <div class="col-md-2 offset-md-8">
        <!--routes to CreateGroup component-->
        <router-link :to="{name:'CreateGroup'}">
          <b-button class="danger float-right w-100">
            {{ $t('group-create') }}
          </b-button>
        </router-link>
      </div>

      <div class="col-md-8 offset-2 mt-4" v-if="isAlertShown">
        <b-alert :show="isAlertShown">
          {{ alertMessage }}
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

      <div class="col-md-5">
        <div class="white-bg p-3 br-5 group-desc">
          <div class="float-right">
            <router-link
              class="btn btn-light"
              title="Start Chat"
              v-if="isUserInGroup(activeGroup) || isUserAdmin(activeGroup)"
              :to="{name:'Chat', params:{groupId:activeGroup._id}}">
              <i class="fa fa-comments" aria-hidden="true"></i>
            </router-link>

            <a href="#"
              title="Join Group"
              class="btn btn-light"
              @click.prevent="joinGroup(activeGroup)"
              v-if="!isUserInGroup(activeGroup) && !isUserAdmin(activeGroup)">
              <i class="fa fa-user-plus"></i>
            </a>

            <a href="#"
              title="Leave Group"
              class="btn btn-light"
              @click.prevent="leaveGroup(activeGroup)"
              v-if="isUserInGroup(activeGroup)">
              <i class="fa fa-sign-out" aria-hidden="true"></i>
            </a>

            <template v-if="isUserAdmin(activeGroup)">
              <router-link
                class="btn btn-light"
                title="Edit"
                :to="{name:'EditGroup',params:{id:activeGroup._id}}">
                <i class="fa fa-pencil" aria-hidden="true"></i>
              </router-link>

              <a href="#" class="btn btn-light" title="Delete" @click.prevent="deleteGroup(activeGroup._id)">
                <i class="fa fa-trash" aria-hidden="true"></i>
              </a>
            </template>
          </div>


          <div class="clearfix"></div>

          <p>{{ activeGroup.description }}</p>
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
        isAlertShown: false,
        alertMessage: '',

        axiosConfig: {
          headers: {
            'x-auth': localStorage.getItem('authToken')
          }
        },

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
      this.getGroups()
    },

    methods: {
      getGroups () {
        this.$store.dispatch('getGroupList')
          .then((res) => {
            this.activeGroup = this.groups.length ? this.groups[0] : {}
            console.log('RES', res)
          })
          .catch((error) => {
            console.log('ERROR', error)
          })
      },

      setActive (group) {
        this.activeGroup = group
      },

      isUserInGroup (group) {
        if (typeof group.users === 'undefined') {
          return false
        }

        return group.users.indexOf(this.userDetails._id) !== -1
      },

      isUserAdmin (group) {
        if (typeof group.admins === 'undefined') {
          return false
        }

        return group.admins.indexOf(this.userDetails._id) !== -1
      },

      joinGroup (group) {
        axios.post(`http://localhost:3000/group/${group._id}/users`, {}, this.axiosConfig)
          .then((response) => {
            this.alertMessage = 'Successfully added to group'
            this.isAlertShown = true

            this.getGroups()

            this.setActive(response.data.group)
          })
      },

      leaveGroup (group) {
        let performLeave = () => {
          axios.delete(`http://localhost:3000/group/${group._id}/users`, this.axiosConfig)
            .then((response) => {
              this.alertMessage = 'Successfully left the group'
              this.isAlertShown = true

              this.getGroups()
            })
        }

        let obj = {
          title: 'Are you sure you want to leave the group?',
          type: 'warning',
          useConfirmBtn: true,
          customConfirmBtnText: 'Yes',
          onConfirm: performLeave
        }

        this.$refs.simplert.openSimplert(obj)
      },

      deleteGroup (id) {
        let performDelete = () => {
          axios.delete(`http://localhost:3000/group/${id}`, this.axiosConfig)
            .then((response) => {
              this.$store.dispatch('getGroupList')
                .then((response) => {
                  this.alertMessage = 'Group deleted successfully'
                  this.isAlertShown = true

                  this.setActive(this.groups[0])
                })
            })
            .catch((error) => {
              console.log(error)
            })
        }

        let obj = {
          title: 'Are you sure you want to delete the group?',
          type: 'warning',
          useConfirmBtn: true,
          customConfirmBtnText: 'Yes',
          onConfirm: performDelete
        }

        this.$refs.simplert.openSimplert(obj)
      }
    }
  }
</script>

<style>
  .group-desc {
    min-height: 200px;
  }
</style>