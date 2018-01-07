<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <h2>Group chat</h2>
      </div>
    </div>

    <div class="row">
      <div class="col-md-3 offset-md-2">
        <h4>Active users</h4>

        <b-list-group>
          <b-list-group-item
            href="#"
            v-for="user in activeUsers">
            {{ user }}
          </b-list-group-item>
        </b-list-group>
      </div>

      <div class="col-md-5">
        <h4>Messages:</h4>

        <b-form-group>
          <b-form-textarea v-model="messageText" rows="4">
          </b-form-textarea>
        </b-form-group>

        <b-form-group>
          <b-button type="submit" @click.prevent="sendMessage" variant="primary" class="float-right">
            Send
          </b-button>
          <div class="clearfix"></div>
        </b-form-group>

        <ul>
          <li v-for="message in messages">
            <strong>{{ message.user }}</strong> {{ message.msg }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import io from 'socket.io-client'

  export default {
    data () {
      return {
        groupId: this.$route.params.groupId,
        messageText: '',
        messages: [],
        activeUsers: [],
        socket: null
      }
    },

    computed: {
      ...mapGetters([
        'userDetails'
      ])
    },

    created () {
      this.socket = io('http://localhost:3030/')

      // listen for new messges
      this.socket.on('new message', (data) => {
        this.messages.push(data)
      })

      this.getActiveUsers()
    },

    methods: {
      sendMessage () {
        this.socket.emit('send message', this.messageText)
        this.messageText = ''
      },

      getActiveUsers () {
        this.socket.on('get users', (user) => {
          this.activeUsers = user
        })
      }
    },

    watch: {
      userDetails (user) {
        let userName = `${user.firstname} ${user.lastname}`

        this.socket.emit('new user', userName, (data) => {
        })
      },

      $route (to, from) {
        this.getActiveUsers()
      }
    }
  }
</script>

<style>

</style>
