<template>
  <div class="container">
    <div class="row">
      <div class="col-md-5 offset-4">
        <h2>{{ $t('profile-update') }}</h2>
        <hr>
      </div>
    </div>

    <div class="row">
      <div class="col-md-5 offset-md-4">
        <b-alert :show="isUserUpdated">
          User profile updated successfully
        </b-alert>
        <b-alert :show="errorMessage!=''" class="alert-danger">
          ERROR: {{ errorMessage }}
        </b-alert>
      </div>
    </div>

    <div class="row">
        <div class="col-md-2 offset-2 field-label-responsive">
            <label for="firstname">{{$t('labelforfirstname')}}</label>
        </div>
        <div class="col-md-5">
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
        <div class="col-md-2 offset-2 field-label-responsive">
            <label for="lastname" >{{$t('labelforlastname')}}</label>
        </div>
        <div class="col-md-5">
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
        <div class="col-md-2 offset-2 field-label-responsive">
            <label for="lastname">{{ $t('about-me') }}</label>
        </div>
        <div class="col-md-5">
            <div class="form-group">
                <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                    <div class="input-group-addon" style="width: 2.6rem"><i class="fa fa-info"></i></div>
                    <textarea name="about_me" cols="5" rows="5" class="form-control" v-model="about_me"></textarea>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="form-control-feedback" v-if="getErrors('about_me')">
              <span class="text-danger align-middle">
                  {{ getErrors('about_me').msg  }}
              </span>
            </div>
        </div>
    </div>

    <div class="row">
      <div class="col-md-5 offset-4">
          <button type="submit" class="btn btn-success" @click.prevent="updateProfile">
              <i class="fa fa-pencil"></i> Update
          </button>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import { mapGetters } from 'vuex'

  export default {
    data () {
      return {
        isUserUpdated: false,
        errorMessage: '',
        firstname: '',
        lastname: '',
        about_me: '',
        about: '',
        errors: []
      }
    },

    computed: {
      /* get user details from VueX Store */
      ...mapGetters([
        'userDetails'
      ])
    },

    mounted () {
      this.setUserDetails(this.userDetails)
    },

    methods: {
      setUserDetails (user) {
        this.firstname = user.firstname
        this.lastname = user.lastname
        this.about_me = user.about_me
      },

      updateProfile () {
        let updateData = {
          'firstname': this.firstname,
          'lastname': this.lastname,
          'about_me': this.about_me
        }

        // hide errors first
        this.errorMessage = ''
        this.errors = []

        let authToken = localStorage.getItem('authToken')

        const config = {
          headers: {
            'x-auth': authToken
          }
        }

        axios.post('http://localhost:3000/user/me/edit', updateData, config)
          .then((response) => {
            if (response.data.status === 'success') {
              this.isUserUpdated = true

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
    },

    watch: {
      userDetails (user) {
        this.setUserDetails(user)
      }
    }
  }
</script>