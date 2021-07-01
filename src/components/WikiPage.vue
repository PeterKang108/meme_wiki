<template>
  <d-container fluid class="main-content-container px-4 pb-4">
    <!-- Page Header -->
    <d-row no-gutters class="page-header py-4">
      <!-- Page Title -->
<!--      <d-col col sm="4" class="text-center text-sm-left mb-4 mb-sm-0">-->
<!--        <h3 class="page-title"> {{ title }} </h3>-->
<!--      </d-col>-->
    </d-row>

    <d-row>
      <!-- Editor -->
      <d-col lg="9" md="12">
        <meme-content />
        <br>
        <d-row>
          <d-col lg="1" md="12"></d-col>
          <d-col lg="1" md="12">
            <b-avatar size="3em" icon="eye"></b-avatar>
          </d-col>
          <d-col lg="1" md="12">{{ view_count }} Views</d-col>
          <d-col lg="1" md="12"></d-col>
          <d-col lg="1" md="12">
            <b-avatar button @click="addFavorite" size="3em" :icon="icon_fav" :disabled="faved"></b-avatar>
          </d-col>
          <d-col lg="1" md="12"><span>{{ fav_count }} Favorites</span></d-col>
          <d-col lg="1" md="12"></d-col>
          <d-col lg="1" md="12">
            <b-avatar button @click="addLike" size="3em" :icon="icon_like" :disabled="liked"></b-avatar>
          </d-col>
          <d-col lg="1" md="12">{{ like_count }} Likes</d-col>
          <d-col lg="3" md="12"></d-col>
        </d-row>
        <br>
        <br>
        <gallery />
        <br>
<!--        <comment-area />-->
      </d-col>

      <!-- Sidebar Widgets -->
      <d-col lg="3" md="12">
<!--        <related-meme />-->
        <editing-log />
        <page-menu />
      </d-col>
    </d-row>

  </d-container>
</template>

<script>
import WikiContent from '@/components/wiki_page/WikiContent.vue';
// import CommentArea from '@/components/wiki_page/CommentArea.vue';
// import RelatedMeme from '@/components/wiki_page/RelatedMeme.vue';
import EditingLog from '@/components/wiki_page/EditingLog.vue';
import Gallery from '@/components/wiki_page/Gallery.vue';
import PageMenu from '@/components/wiki_page/PageMenu.vue';

import {getName, getUserID} from '@/utils/userStatus';
import {addFav, getFav , addHistory} from "@/api/users";
import {add_like, add_view, get_meme} from "@/api/memes";

export default {
  name: "WikiPage",
  title: "Meme Title", // this would be changed to name of the meme from API
  components: {
    memeContent: WikiContent,
    // commentArea: CommentArea,
    // relatedMeme: RelatedMeme,
    editingLog: EditingLog,
    gallery: Gallery,
    pageMenu: PageMenu,
  },
  methods: {
    addFavorite(event) {
      event.preventDefault()
      const _self = this
      addFav(this.$route.params.meme_id, getUserID()).then(() => {
        _self.faved = true
      })
      // _self.$router.push(this.$route.path)
      _self.$router.go(0)
    },
    addLike(event) {
      event.preventDefault()
      const _self = this
      add_like(this.$route.params.meme_id, getUserID()).then(() => {
        _self.liked = true
      })
      // _self.$router.push(this.$route.path)
      _self.$router.go(0)
    }

  },
  data () {
    return {
      icon_like: "hand-thumbs-up",
      icon_fav: "star-fill",
      view_count: 0,
      fav_count: 0,
      like_count: 0,
      faved: false,
      liked: false,
    }
  },
  mounted() {
    if (getName() == null) {
      return
    }

    //add view count to this page
    if (getName() !== null) {
      addHistory(this.$route.params.meme_id, getUserID())
      add_view(this.$route.params.meme_id)
    }
    const _self = this

    //set view, like and fav count of this wiki page && check if the user has liked this meme
    get_meme(this.$route.params.meme_id).then(res => {
      _self.view_count = res.data[0].viewed_count
      _self.like_count = res.data[0].upvoting
      if (res.data[0].upvoted_by != null) {
        _self.liked = res.data[0].upvoted_by.includes(getUserID())
      }
      _self.fav_count = res.data[0].favoriting
    })

    //check if the user has faved the page
    getFav(getUserID()).then(res => {
      res.data.forEach(item => {
        if (this.$route.params.meme_id === item.meme_id) {
          _self.faved = true
        }
      })
    })
  },
}
</script>

<style scoped>

</style>