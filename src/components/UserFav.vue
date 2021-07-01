<template>
  <d-container fluid class="main-content-container px-4 pb-4">
    <!-- Page Header -->
    <d-row no-gutters class="page-header py-4">
      <!-- Page Title -->
      <d-col cols="12" md="4" lg="1"></d-col>
      <d-col col sm="4" class="text-center text-sm-left mb-4 mb-sm-0">
        <h3 class="page-title"> {{ title }} </h3>
      </d-col>
    </d-row>

    <d-row>
      <d-col cols="12" md="4" lg="1"></d-col>
      <d-col cols="12" md="4" lg="10">
        <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="my-table"
        ></b-pagination>
      </d-col>
      <d-col cols="12" md="4" lg="1"></d-col>
    </d-row>

    <br>

    <d-row v-for="item in results" :key="item.meme_id">
      <d-col cols="12" md="4" lg="1"></d-col>
      <d-col cols="12" md="4" lg="10" sm="4" class="text-center text-sm-left mb-4 mb-sm-0">
        <router-link style="text-decoration: none; color: inherit;" :to="{ name: 'wiki_page', params: { meme_id: item.meme_id } }">
          <d-card class="card-small mb-3">
            <d-card-header class="border-bottom">
              <h3 class="m-0"> {{item.name}} </h3>
              <h6 class="page-title"> last change on {{item.last_modified[item.last_modified.length - 1]}} </h6>
            </d-card-header>
            <d-card-body>
              <h4 class="page-title" v-for="cat in item.category" :key="cat"> {{cat.category}} </h4>
              <h6 class="page-title"> {{item.brief}} </h6>
            </d-card-body>
          </d-card>
        </router-link>
      </d-col>
      <d-col cols="12" md="4" lg="1"></d-col>
    </d-row>

  </d-container>
</template>

<script>
import {getName, getUserID} from "@/utils/userStatus";
import {getFav} from "@/api/users";

export default {
  name: "UserFav",
  props: {
    /**
     * The component's title.
     */
    title: {
      type: String,
      default: 'User Favorite',
    },
  },
  methods: {
    getFav() {
      // get_meme()
    }
  },
  data() {
    return {
      form: {
        name: getName(),
      },
      category: "",
      show: true,
      results: [],
      rows: 10,
      perPage: 10,
    }
  },
  mounted() {
    const _self = this
    getFav(getUserID()).then(res => {
      _self.results = res.data
      console.log(_self.results)
    })
  }
}
</script>

<style scoped>

</style>