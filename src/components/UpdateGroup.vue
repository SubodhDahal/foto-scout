<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 offset-3">
        <div class="col-md-6 offset-10">
          <router-link :to="{name:'DisplayGroup'}">
            <b-button>Back</b-button>
          </router-link>
        </div>
        <br>

        <b-alert :show="isGroupUpdated">
          Group updated successfully!
        </b-alert>

        <b-form>
          <br>
          <div class="col-md-8">
            <b-form-group :label="$t('labelforgroupname')">
              <b-form-input type="text"
                            v-model="groupname"
                            :placeholder="$t('placeholderforgroupname')">
              </b-form-input>
            </b-form-group>
            <b-form-group :label="$t('labelfordescription')">
              <b-form-textarea v-model="description" rows="4">

              </b-form-textarea>
            </b-form-group>
            <b-form-group>
              <b-button type="submit" @click.prevent="onSubmit" variant="primary">
                Update Group
              </b-button>
            </b-form-group>
          </div>
        </b-form>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'

  export default {
    data () {
      return {
        isGroupUpdated: false,
        groupId: this.$route.params.id,
        description: ' ',
        groupname: ''
      }
    },

    mounted () {
      axios.get(`http://localhost:3000/group/${this.groupId}`)
        .then((response) => {
          if (response.data.status === 'success') {
            this.description = response.data.group.description
            this.groupname = response.data.group.name
          }
        })
    },

    methods: {
      onSubmit () {
        let data = {
          name: this.groupname,
          description: this.description
        }

        let authToken = localStorage.getItem('authToken')

        let config = {
          headers: {
            'x-auth': authToken
          }
        }

        axios.put(`http://localhost:3000/group/${this.groupId}`, data, config)
          .then((response) => {
            this.isGroupUpdated = true
          })
      }
    }
  }

</script>
