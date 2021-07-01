<template>
  <div id="NavBar">
    <b-navbar toggleable="lg" type="dark" variant="info">

      <b-navbar-brand href="/home">Meme Wiki</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item-dropdown text="Category">
            <b-dropdown-item href="#">Pure Web</b-dropdown-item>
            <b-dropdown-item href="#">Movies & TV dramas</b-dropdown-item>
            <b-dropdown-item href="#">Sports</b-dropdown-item>
            <b-dropdown-item href="#">Music</b-dropdown-item>
            <b-dropdown-item href="#">Games</b-dropdown-item>
            <b-dropdown-item href="#">Anime</b-dropdown-item>
            <hr>
            <b-dropdown-item href="#">Others</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item href="/trending">Trending</b-nav-item>
        </b-navbar-nav>


        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-navbar-nav v-if="not_in_search">
            <b-nav-form>
              <b-form-input size="sm" class="mr-sm-2" placeholder="Search" v-model="search_params"></b-form-input>
              <router-link :to="`/search/${search_params}`">
                <b-button size="sm" class="my-2 my-sm-0">Search</b-button>
              </router-link>
            </b-nav-form>
          </b-navbar-nav>



          <b-nav-item-dropdown v-bind:text="user_name" right v-if="login">
            <b-dropdown-item href="/favorite">favorites</b-dropdown-item>
            <b-dropdown-item href="/history">history</b-dropdown-item>
            <b-dropdown-item href="/editor">create meme</b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item-button type="submit" v-on:click="logout">Log Out</b-dropdown-item-button>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown text="User" right v-if="notLogin">
            <b-dropdown-item href="/login">Log In</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { getName, logOut } from '@/utils/userStatus'

export default {
  name: "NavBar",
  data () {
    return {
      login: getName() !== null,
      notLogin: getName() == null,
      user_name: getName(),
      not_in_search: true,
      search_params: ""
    }
  },
  methods: {
    logout (event) {
      event.preventDefault()
      logOut()
      this.$router.go(0)
    }
  },
  mounted () {
  }
}
</script>

<style scoped>

</style>