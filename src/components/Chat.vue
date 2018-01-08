<template>
  <div class="container">
    <div class="row">
      <div class="col-md-10 offset-md-1 mb-2">
        <h2>{{ $t('group-chat') }}: {{ groupName }}</h2>
        <hr>
      </div>
    </div>

    <div class="row">
      <div class="col-md-5 offset-md-1">
        <h4>{{ $t('messages') }}</h4>

        <ul class="p-0 messages">
          <li v-for="message in messages" class="card p-2 px-4 mb-2">
            <strong>{{ message.user }}</strong> {{ message.msg }}
          </li>
        </ul>
      </div>

      <div class="col-md-5">
        <h4>{{ $t('message-write') }}</h4>
        <b-form-group>
          <b-form-textarea
            v-model="messageText"
            rows="2"
            :placeholder="$t('message-yours')">
          </b-form-textarea>
        </b-form-group>

        <b-form-group>
          <b-button type="submit" @click.prevent="sendMessage" variant="primary" class="float-right">
            {{ $t('send') }}
          </b-button>
          <div class="clearfix"></div>
        </b-form-group>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import { mapGetters } from 'vuex'
  import io from 'socket.io-client'

  export default {
    data () {
      return {
        groupId: this.$route.params.groupId,
        groupName: '',
        userName: '',
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
      axios.get(`http://localhost:3000/group/${this.groupId}`)
        .then((response) => {
          this.groupName = response.data.group.name
        })

      this.socket = io('http://localhost:3000/')

      // listen for new messges
      this.socket.on('new message', (message) => {
        // show only the message intended for this group
        if (message.groupId === this.groupId) {
          this.messages.push(message)
        }
      })

      this.getActiveUsers()
    },

    methods: {
      sendMessage () {
        this.socket.emit('send message', {
          username: this.userName,
          message: this.messageText,
          groupId: this.groupId
        })

        this.messageText = ''
      },

      getActiveUsers () {
        this.socket.on('get users', (users) => {
          console.log('active users', users)
          this.activeUsers = users
        })
      }
    },

    watch: {
      userDetails (user) {
        this.userName = `${user.firstname} ${user.lastname}`
        console.log('Sending user info')
        this.socket.emit('new user', this.userName, (data) => {
        })
      }
    }
  }
</script>

<style>
  .messages {
    max-height: 300px;
    overflow-y: auto;
  }
</style>
