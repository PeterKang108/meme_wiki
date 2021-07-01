<template>
  <d-container fluid class="main-content-container px-4 pb-4">
    <br>
    <br>
    <br>
    <d-row>
      <d-col cols="12" md="4" lg="1"></d-col>
      <d-col cols="12" md="4" lg="11">
        <b-form inline width="100%">
          <label class="mr-sm-4" for="input-1">Meme Wiki | Search </label>
          <b-form-group class="mr-sm-4" id="input-group-1">
            <b-form-input id="input-1" v-model="form.name"></b-form-input>
          </b-form-group>
          <router-link :to="`/search/${form.name}`">
            <b-button variant="info">Search</b-button>
          </router-link>
        </b-form>
      </d-col>
    </d-row>

    <br>
    <br>

    <d-row>
      <!-- Filter -->
      <d-col cols="12" md="4" lg="1"></d-col>
      <d-col cols="12" md="4" lg="11">
        <b-button-group class="mr-sm-4">
          <b-button
              v-for="(btn, idx) in buttons"
              :key="idx"
              :pressed.sync="btn.state"
              variant="outline-info"
              @click="onPressCat(idx)"
          >
            {{ btn.caption }}
          </b-button>
        </b-button-group>
      </d-col>
    </d-row>

    <br>
    <br>

    <d-row>
      <!-- Sort -->
      <d-col cols="12" md="4" lg="1"></d-col>
      <d-col cols="12" md="4" lg="11">
        <b-button-group class="mr-sm-4">
          <label class="mr-sm-4" >Sort By</label>
          <b-button
              v-for="(btn, idx) in sorts"
              :key="idx"
              :pressed.sync="btn.state"
              variant="outline-info"
              @click="onPressSort(idx)"
          >
            {{ btn.caption }}
          </b-button>
        </b-button-group>
      </d-col>
    </d-row>

    <hr>

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
              <d-img fluid thumbnail :src=item.pictures[0] />
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

// import mock data
// import { mock_API } from '@/utils/MockAPI_SearchResult'
// mock_API()

import {search_meme_cat} from "@/api/memes";

export default {
  name: "SearchResult",
  components: {
  },
  data() {
    return {
      form: {
        name: this.$route.params.name,
      },
      buttons: [
        { caption: 'All Categories', state: true , value: 'all'},
        { caption: 'Pure Web', state: false, value: 'web' },
        { caption: 'Movies', state: false, value: 'movies_tv' },
        { caption: 'Sports', state: false, value: 'sports' },
        { caption: 'Music', state: false, value: 'music' },
        { caption: 'Game', state: false, value: 'game' },
        { caption: 'Anime', state: false, value: 'anime' },
        { caption: 'Other', state: false, value: 'other' }
      ],
      sorts: [
        { caption: 'View Count', state: false , value: 'viewed_count'},
        { caption: 'Like', state: false, value: 'upvoting' },
        { caption: 'Favorite', state: false, value: 'favoriting' },
        { caption: 'Newest', state: false, value: 'created_date' },
        { caption: 'Oldest', state: false, value: 'created_date1' },
      ],
      results: [],
      category: "",
      sort_by: "",
      show: true
    }
  },
  methods: {
    onPressCat(i) {
      this.buttons.forEach((b, index) => b.state = i === index)
      const _self = this
      this.buttons.forEach((b) => {
        if (b.state === true) {
          _self.category = b.value
        }
      })
      this.searchByCategory()
    },
    onPressSort(i) {
      this.sorts.forEach((b, index) => b.state = i === index)
      const _self = this
      this.sorts.forEach((b) => {
        if (b.state === true) {
          _self.sort_by = b.value
        }
      })
      this.sortByValue()
    },
    searchByCategory() {
      this.results = []
      const _self = this
      if (this.category === "all") {
        this.category = ""
        search_meme_cat(this.$route.params.name, null).then(res => {
          _self.results = res.data
        })
      }
      search_meme_cat(this.$route.params.name, this.category).then(res => {
        _self.results = res.data
      })
    },
    sortByValue() {
      const _self = this
      if (this.sort_by === "created_date1") {
        this.results.sort(function (a, b) {
          if (a.created_date > b.created_date) {
            return 1
          } else {
            return -1
          }
        })
      } else {
        this.results.sort(function (a, b) {
          if (a[_self.sort_by] > b[_self.sort_by]) {
            return 1
          } else {
            return -1
          }
        })
        this.results.reverse()
      }
    },
  },
  mounted() {
    this.results = []
    if (this.$route.params.name == null) {
      return
    }
    const _self = this
    search_meme_cat(this.$route.params.name, null).then(res => {
      _self.results = res.data
    })
  },
  watch: {
    $route() {
      location.reload()
    },
  },
}
</script>

<style scoped>

</style>