<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 offset-3">
        <b-form>
          <br>
          <div class="col-md-8">
          <b-form-group :label="$t('labelforgroupname')">
              <b-form-input type="groupname"
                            :placeholder="$t('placeholderforgroupname')">

              </b-form-input>
          </b-form-group>
            <b-form-group :label="$t('labelfordescription')">
              <b-form-textarea rows="4">

              </b-form-textarea>
            </b-form-group>
            <b-form-group>
              <b-button type="submit" variant="primary">{{ $t('labelforcreategroup') }}</b-button>
              <b-button type="reset" variant="danger">{{ $t('labelforreset') }}</b-button>
            </b-form-group>
          </div>
        </b-form>
      </div>
    </div>
  </div>
</template>
<script>

</script>
