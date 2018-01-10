<template>
 <div class="container">
    <form class="form-horizontal" role="form">
        <div class="row">
            <div class="col-md-6 offset-3">
                <h2>{{$t('labelfornewuser')}}</h2>
                <hr>
            </div>
        </div>

        <div class="row">
            <div class="col-md-6 offset-md-3">
                <b-alert :show="isUserRegistered" dismissible>
                  {{ $t('labelforregissuccess') }}
                </b-alert>
                <b-alert :show="errorMessage!=''" class="alert-danger" dismissible>
                  ERROR: {{ errorMessage }}
                </b-alert>
            </div>
        </div>

        <div class="row">
            <div class="col-md-3 field-label-responsive">
                <label for="firstname">{{$t('labelforfirstname')}}</label>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                        <div class="input-group-addon" style="width: 2.6rem"><i class="fa fa-user"></i></div>
                        <input v-model="firstname" type="text" name="firstname" class="form-control" id="firstname"
                               :placeholder="$t('labelforenterfirstname')" required autofocus>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="form-control-feedback" v-if="getErrors('firstname')">
                  <span class="text-danger align-middle">
                      {{ getErrors('firstname').msg  }}
                  </span>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-3 field-label-responsive">
                <label for="lastname" >{{$t('labelforlastname')}}</label>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                        <div class="input-group-addon" style="width: 2.6rem"><i class="fa fa-user"></i></div>
                        <input v-model="lastname" type="text" name="lastname" class="form-control" id="lastname"
                               :placeholder="$t('labelforenterlastname')" required autofocus>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="form-control-feedback" v-if="getErrors('lastname')">
                  <span class="text-danger align-middle">
                      {{ getErrors('lastname').msg  }}
                  </span>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-3 field-label-responsive">
                <label for="email">{{$t('labelforemail')}}</label>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                        <div class="input-group-addon" style="width: 2.6rem"><i class="fa fa-at"></i></div>
                        <input v-model="email" type="text" name="email" class="form-control" id="email"
                               :placeholder="$t('labelforemailplace')" required autofocus>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="form-control-feedback" v-if="getErrors('email')">
                  <span class= "text-danger align-middle">
                    {{ getErrors('email').msg  }}
                  </span>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-3 field-label-responsive">
                <label for="password">{{$t('labelforpassword')}}</label>
            </div>
            <div class="col-md-6">
                <div class="form-group has-danger">
                    <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                        <div class="input-group-addon" style="width: 2.6rem"><i class="fa fa-key"></i></div>
                        <input v-model="passcode" type="password" name="password" class="form-control" id="password"
                               :placeholder="$t('labelforpassholder')" required>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="form-control-feedback" v-if="getErrors('passcode')">
                  <span class="text-danger align-middle">
                    {{ getErrors('passcode').msg  }}
                  </span>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-3 field-label-responsive">
                <label for="password">{{$t('labelforpassconf')}}</label>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                        <div class="input-group-addon" style="width: 2.6rem">
                            <i class="fa fa-repeat"></i>
                        </div>
                        <input
                          type="password"
                          name="password-confirmation"
                          class="form-control"
                          id="password-confirm"
                          v-model="passcodeConfirm"
                          :placeholder="$t('labelforconfpassholder')"
                          required>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 offset-md-3">
                <button
                  type="submit"
                  class="btn btn-success mt-2"
                  :disabled="!isFormValid"
                  @click.prevent="onRegister">
                    <i class="fa fa-user-plus"></i> {{$t('labelforregisterbuttion')}}
                </button>
            </div>
        </div>
    </form>
</div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      isUserRegistered: false,
      errorMessage: '',
      firstname: '',
      lastname: '',
      email: '',
      passcode: '',
      passcodeConfirm: '',
      errors: []
    }
  },

  computed: {
    /**
     * Check if the form is valid
     * @return {Boolean}
     */
    isFormValid () {
      return this.firstname !== '' &&
        this.lastname !== '' &&
        this.email !== '' &&
        this.passcode !== ''
    }
  },

  methods: {
    /**
     * Check if the passwords match
     * @return {Boolean}
     */
    doPasswordsmatch () {
      if (this.passcode !== this.passcodeConfirm) {
        this.errors = [{
          'param': 'passcode',
          'msg': 'Passwords don\'t match'
        }]
        return false
      }

      return true
    },

    /**
     * Register user
     */
    onRegister () {
      if (!this.doPasswordsmatch()) {
        return
      }

      let registerData = {
        'firstname': this.firstname,
        'lastname': this.lastname,
        'email': this.email,
        'passcode': this.passcode
      }

      // hide errors first
      this.errorMessage = ''
      this.errors = []

      axios.post('http://localhost:3000/register', registerData)
        .then((response) => {
          if (response.data.status === 'success') {
            this.isUserRegistered = true

            let token = response.data.tokens[0].token

            localStorage.setItem('authToken', token)

            // redirect to home page after successful registration
            this.$router.push({name: 'Home'})

            this.$store.commit('setFlashMessage', {
              message: 'You\'ve been successfully registered and logged in'
            })

            this.$store.dispatch('getUserDetails')
              .then((res) => {
                console.log('RES', res)
              })
              .catch((error) => {
                console.log('ERROR', error)
              })
          }
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
  @media(min-width: 768px) {
    .field-label-responsive {
      padding-top: .5rem;
      text-align: right;
    }
  }
</style>

