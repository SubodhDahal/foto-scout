<template>
  <div class="container">
    <b-alert class="col-md-4 offset-4 alert-danger" :show="errorMessage!=''" dismissible>
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

                  <div class="form-control-feedback" v-if="getErrors('passcode')">
                    <span class="text-danger align-middle">
                      {{ getErrors('passcode').msg  }}
                    </span>
                  </div>
                </div>

                <div class="checkbox">
                  <label>
                    <input v-model="remember" name="remember" type="checkbox" value="Remember Me"> {{$t('labelforremember')}}
                  </label>

                </div>

                <input
                  class="btn btn-lg btn-primary btn-block"
                  type="submit"
                  :disabled="!isFormValid"
                  @click.prevent="onLogin"
                  :value="$t('labelforlog-login')">
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
        errorMessage: '',
        errors: []
      }
    },

    computed: {
      /**
       * Check if the form is valid
       * @return {Boolean}
       */
      isFormValid () {
        return this.email !== '' &&
          this.passcode !== ''
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

            this.$store.commit('setFlashMessage', {
              message: 'You\'ve been logged in'
            })

            this.$store.dispatch('getUserDetails')
              .then((res) => {
                console.log('RES', res)
              })
              .catch((error) => {
                console.log('ERROR', error)
              })
          })
          .catch((error) => {
            if (error.response.data.status === 'error') {
              this.errorMessage = error.response.data.message
            } else {
              this.errors = error.response.data.errors
            }
          })
      },

      getErrors (param) {
        return this.errors.find((error) => error.param === param)
      }
    }
  }
</script>

<style>
  body {
    padding-top: 20px;
  }
</style>
