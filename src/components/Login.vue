<template>
  <d-container class="dr-example-container">
    <br>
    <br>
    <br>
    <d-row>
      <d-col cols="12" md="4" lg="3"></d-col>
      <d-col cols="12" md="4" lg="6">
        <d-card class="card-small mb-3">
          <d-card-header class="border-bottom">
            <h6 class="m-0">{{ title }}</h6>
          </d-card-header>
          <d-card-body>
            <b-form @submit="onSubmit" v-if="show">

              <b-form-group id="input-group-1" label="User Name:" label-for="input-1">
                <b-form-input
                    id="input-1"
                    v-model="form.username"
                    placeholder="Enter username"
                    required
                ></b-form-input>
              </b-form-group>

              <b-form-group id="input-group-2" label="Password:" label-for="input-3">
                <b-form-input
                    id="input-3"
                    v-model="form.password"
                    placeholder="Enter password"
                    required
                ></b-form-input>
              </b-form-group>

              <b-form-group id="input-group-3">
                <b-form-text id="username-help-block" v-if="incorrect" text-variant="danger">
                  Incorrect username or password
                </b-form-text>
              </b-form-group>

              <b-form-group id="input-group-4">
                <b-form-checkbox
                    id="checkbox-1"
                    v-model="form.remember"
                    name="checkbox-1"
                    value=true
                    unchecked-value="not_accepted"
                >
                  Remember Me
                </b-form-checkbox>
              </b-form-group>

              <b-button type="submit" variant="primary">Login</b-button>

              <br>
              <br>
              <hr>
              <b-form-group id="input-group-3">
                <b-form-text id="username-help-block">
                  Not having an account?
                </b-form-text>
                <b-button variant="primary" href="/create_account">Register</b-button>
              </b-form-group>

            </b-form>
          </d-card-body>
        </d-card>
      </d-col>
      <d-col cols="12" md="4" lg="3"></d-col>
    </d-row>

  </d-container>
</template>

<script>
import { login } from '@/api/users';


export default {
  name: "Login",
  props: {
    /**
     * The component's title.
     */
    title: {
      type: String,
      default: 'User Login',
    },
  },
  data() {
    return {
      form: {
        username: '',
        password: '',
        remember: false,
      },
      show: true,
      incorrect: false,
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      const _self = this
      console.log(this.form)
      login(JSON.stringify(this.form)).then(res => {
        if (res.data.code === "200") {
          sessionStorage.setItem("username", _self.form.username)
          sessionStorage.setItem("userID", res.data.user_id)
          sessionStorage.setItem("token", res.data.token)
          if (_self.form.remember) {
            localStorage.setItem("username", _self.form.username)
            localStorage.setItem("userID", res.data.user_id)
            localStorage.setItem("token", res.data.token)
          }
          _self.$router.go(0)

        }

      }).catch(error => {
        if (error.response) {
          _self.$set(_self, "incorrect", true);
        }
      });

    },

  }
}
</script>

<style scoped>

</style>