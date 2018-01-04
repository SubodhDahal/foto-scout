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
        <b-alert :show="isGroupCreated">
          Group created successfully!
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
              <b-button type="submit" @click.prevent="onSubmit" variant="primary">{{ $t('labelforcreategroup') }}
              </b-button>
              <b-button type="reset" @click.prevent="onReset" variant="danger">{{ $t('labelforreset') }}</b-button>
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
        isGroupCreated: false,
        description: ' ',
        groupname: ''
      }
    },
    methods: {
      onSubmit () {
        let data = {
          name: this.groupname,
          description: this.description
        }

        axios.post('http://localhost:3000/group', data)
          .then((response) => {
            if (response.data.success === 'true') {
              this.isGroupCreated = true
            }
          })
      },

      onReset () {
        this.groupname = ''
        this.description = ''
        this.isGroupCreated = false
      }
    }
  }

</script>
