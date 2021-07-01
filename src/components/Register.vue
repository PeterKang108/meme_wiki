<template>
  <d-container fluid class="main-content-container px-4 pb-4">
    <!-- Page Header -->
    <d-row no-gutters class="page-header py-4">
      <!-- Page Title -->
      <d-col col sm="4" class="text-center text-sm-left mb-4 mb-sm-0">
        <h3 class="page-title"> Create Account </h3>
      </d-col>
    </d-row>

    <d-row>
      <d-col>
        <b-form @submit="onSubmit" v-if="show">
          <b-form-group
              id="input-group-1"
              label="Email address:"
              label-for="input-1"
              description="We'll never share your email with anyone else."
          >
            <b-form-input
                id="input-1"
                v-model="form.email"
                type="email"
                placeholder="Enter email"
                required
            ></b-form-input>
          </b-form-group>


          <b-form-group id="input-group-2" label="User Name:" label-for="input-2">
            <b-form-input
                id="input-2"
                v-model="form.username"
                placeholder="Enter name"
                required
            ></b-form-input>
            <b-form-text id="username-help-block" v-if="duplicated_username" text-variant="danger">
              This username has already been used
            </b-form-text>
          </b-form-group>

          <b-form-group id="input-group-3" label="Password:" label-for="input-3">
            <b-form-input
                id="input-3"
                v-model="form.password"
                placeholder="Enter password"
                required
            ></b-form-input>
          </b-form-group>

          <b-button type="submit" variant="primary">Register</b-button>
        </b-form>
<!--        <b-card class="mt-3" header="Form Data Result">-->
<!--          <pre class="m-0">{{ form }}</pre>-->
<!--        </b-card>-->
      </d-col>
    </d-row>

  </d-container>
</template>

<script>
import {register} from '@/api/users';


export default {
  name: "Register",
  title: "Register",
  data() {
    return {
      form: {
        email: '',
        username: '',
        password: '',
      },
      show: true,
      duplicated_username: false,
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      const _self = this
      register(JSON.stringify(this.form)).then(() => {
        this.$router.push("/login")
      }).catch(error => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          _self.$set(_self, "duplicated_username", true);
        }
      });
    },
  },
}
</script>

<style scoped>

</style>