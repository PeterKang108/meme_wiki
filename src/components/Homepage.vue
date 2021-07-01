<template>
  <div class="layout2">
    <br>
    <br>
    <d-container fluid class="main-content-container px-4">
      <!-- First Row of Posts -->
      <d-row>
        <d-col cols="12" md="4" lg="1"></d-col>
        <d-col cols="12" md="4" lg="10">
          <h3>Trending</h3>
          <d-row>
            <d-col v-for="(post, idx) in trending" :key="idx" lg="3" md="6" sm="12" class="mb-4">
              <d-card class="card-small card-post card-post--1">
                <div class="card-post__image" :style="{ backgroundImage: post.pictures[0] }">
                  <d-badge pill>{{ post.category[0] }}</d-badge>
                  <div class="card-post__author d-flex">
                    <h6 href="#" class="card-post__author-avatar card-post__author-avatar--small" :style="{ backgroundImage: 'url(\'' + post.authorAvatar + '\')' }">Written by {{ post.author }}</h6>
                  </div>
                </div>
                <hr>
                <d-card-body>
                  <router-link :to="{ name: 'wiki_page', params: { meme_id: post.meme_id }}">
                    <h5 class="card-title">
                      {{ post.name }}
                    </h5>
                  </router-link>
                  <p class="card-text d-inline-block mb-3">{{ post.brief }}</p>
                  <br>
                  <span class="text-muted">{{ post.created_date }}</span>
                </d-card-body>
              </d-card>
            </d-col>
          </d-row>
        </d-col>
        <d-col cols="12" md="4" lg="1"></d-col>
      </d-row>
    </d-container>

    <d-container fluid class="main-content-container px-4">
      <!-- First Row of Posts -->
      <d-row>
        <d-col cols="12" md="4" lg="1"></d-col>
        <d-col cols="12" md="4" lg="10">
          <h3>Recent Changes</h3>
          <d-row>
            <d-col v-for="(post, idx) in NewEdited" :key="idx" lg="3" md="6" sm="12" class="mb-4">
              <d-card class="card-small card-post card-post--1">
                <div class="card-post__image" :style="{ backgroundImage: post.pictures[0] }">
                  <d-badge pill>{{ post.category[0] }}</d-badge>
                  <div class="card-post__author d-flex">
                    <h6 href="#" class="card-post__author-avatar card-post__author-avatar--small" :style="{ backgroundImage: 'url(\'' + post.authorAvatar + '\')' }">Written by {{ post.author }}</h6>
                  </div>
                </div>
                <hr>
                <d-card-body>
                  <router-link :to="{ name: 'wiki_page', params: { meme_id: post.meme_id }}">
                    <h5 class="card-title">
                      {{ post.name }}
                    </h5>
                  </router-link>
                  <p class="card-text d-inline-block mb-3">{{ post.brief }}</p>
                  <br>
                  <span class="text-muted">{{ post.created_date }}</span>
                </d-card-body>
              </d-card>
            </d-col>
          </d-row>
        </d-col>
        <d-col cols="12" md="4" lg="1"></d-col>
      </d-row>
    </d-container>
  </div>
</template>

<script>


import {get_recent, get_trending} from "@/api/memes";

export default {
  name: "Homepage",
  components: {
  },
  data () {
    return {
      theme2:'light',
      list1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      trending: [],
      NewEdited: [],

    }
  },
  methods: {


  },
  mounted() {
    get_trending(8).then(res => {
      this.trending = res.data
    })
    get_recent(8).then(res => {
      this.NewEdited = res.data
    })
  }
}
</script>

<style scoped>
.layout2{
  position:relative;
  overflow:hidden;

  background:#ffffff;
}
.layout2 .ivu-layout-header {
  background-color: #fff;
  font-size: 35px;
  text-align: left;
  height: 90px;
}
.layout2 .ivu-layout {
  background-color: #fff;
}
.layout2 .footer-in-category{
  background-color: #fff;
}
.layout2 .main-content-container{
  margin-left: -20px;
  margin-right: -30px;
  text-align: left;
}
.layout2 .card-post__image_side{
  height: 150px;
  width: 200px;
  position: relative;
  min-height: 10.31rem;
  border-top-left-radius: 0.62rem;
  border-top-right-radius: 0.62rem;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.trending-list{
  background:#ffffff;
  /*border:1px solid #5d6f82;*/
  margin-left: 0;
  /*position: fixed;*/
  width: 375px;
  /*height: calc(100% - 64px);*/
  /*top: 64px;*/
  /*right: 60px;*/
}
.list-scroll{
  background:#ffffff;
  border:1px solid #fff;
  height:600px;
  width:328px;
  margin-left: 0;
}
.homepage-main{
  /*Header:#ffffff;*/
  background:#ffffff;

}
.navi{
  background-color: #FFFFFF;
}
</style>