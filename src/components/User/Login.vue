<template>
  <div class="container">
    <b-alert class="col-md-4 offset-4 alert-danger" :show="isUserLoggedIn">
          Logged In succesffully!
    </b-alert>
    <b-alert class="col-md-4 offset-4 alert-danger" :show="errorMessage!=''">
          {{errorMessage}}
    </b-alert>
    <div class="row">
      <div class="col-md-4 offset-4">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">{{$t('labelforlogin')}}</h3>
          </div>
          <div class="panel-body">
            <form accept-charset="UTF-8" role="form">
              <fieldset>
                <div class="form-group">
                  <input v-model="email" class="form-control" :placeholder="$t('labelforloginemail')" name="email" type="text">
                </div>
                <div class="form-group">
                  <input v-model="passcode" class="form-control" :placeholder="$t('labelforloginpassword')" name="password" type="password" value="">
                </div>
                <div class="checkbox">
                  <label>
                    <input v-model="remember" name="remember" type="checkbox" value="Remember Me"> {{$t('labelforremember')}}
                  </label>
                </div>
                  <input class="btn btn-lg btn-primary btn-block" type="submit" @click.prevent="onLogin" :value="$t('labelforlog-login')">
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      isUserLoggedIn: false,
      email: '',
      passcode: '',
      remember: false,
      errorMessage: ''
    }
  },

  methods: {
    onLogin () {
      let loginData = {
        'email': this.email,
        'passcode': this.passcode
      }

      axios.post('http://localhost:3000/login', loginData)
        .then((response) => {
          this.isUserLoggedIn = true

          const tokens = response.data.tokens
          var lastToken = tokens[tokens.length - 1]

          // save auth token to localstorage
          localStorage.setItem('authToken', lastToken.token)

          // redirect to home page after successful registration
          this.$router.push({name: 'Home'})

          this.$store.dispatch('getUserDetails')
            .then((res) => {
              console.log('RES', res)
            })
            .catch((error) => {
              console.log('ERROR', error)
            })
        })
        .catch((error) => {
          this.errorMessage = error.response.data.message
        })
    }
  }
}

</script>
<style>
  body {
    padding-top: 20px;

  }
</style>
