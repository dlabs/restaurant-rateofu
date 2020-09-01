<template>
  <b-container>
    <b-row class="mt-3">
      <b-col sm="6">
        <h3>Log in</h3>
        <b-form @submit="onSubmit">
          <b-form-group id="input-group-2" label="Your Name" label-for="input-2">
            <b-form-input id="input-2" v-model="form.name" required placeholder="Enter name"></b-form-input>
          </b-form-group>

          <b-form-group label="Role">
            <b-form-radio v-model="form.role" name="some-radios" value="waiter">Waiter</b-form-radio>
            <b-form-radio v-model="form.role" name="some-radios" value="chef">Chef</b-form-radio>
            <b-form-radio v-model="form.role" name="some-radios" value="barman">Barman</b-form-radio>
          </b-form-group>

          <b-button type="submit" variant="primary">Submit</b-button>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data: function () {
    return {
      form: {
        name: null,
        role: null,
      },
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      console.log(this.form);
      switch (this.form.role) {
        case "chef":
            this.$router.push("/staff/chef")
          break;
        case "waiter":
            this.$router.push("/staff/waiter")
          break;
        case "barman":
            this.$router.push("/staff/barman")
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style>
</style>