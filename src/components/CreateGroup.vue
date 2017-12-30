<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 offset-3">
        <b-form>
          <br>
          <div class="col-md-8">
          <b-form-group label="Group Name">
              <b-form-input type="groupname"
                            placeholder="Enter your Group name">

              </b-form-input>
          </b-form-group>
            <b-form-group label="Description">
              <b-form-textarea>

              </b-form-textarea>
            </b-form-group>
            <b-form-group>
              <b-button type="submit" variant="primary">Create Group</b-button>
              <b-button type="reset" variant="danger">Reset</b-button>
            </b-form-group>
          </div>
        </b-form>
      </div>
    </div>
  </div>
</template>
<script>

</script>
