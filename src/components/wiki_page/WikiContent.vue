<template>
  <div id="wiki-content">
    <div class="output ql-snow">
      <div class="ql-editor" v-html="content"></div>
    </div>
  </div>
</template>

<script>
//import axios from "axios";

// import theme style
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'


// import mock data
// import { mock_API } from '@/utils/MockAPI_WikiPage'
// mock_API()

import { get_meme } from "@/api/memes";

export default {
  name: "WikiContent",
  data() {
    return {
      content: this.getWiki(),
      meme_id: this.$route.params.meme_id,
    }
  },
  methods: {
    getWiki() {
      let _self = this
      get_meme(this.$route.params.meme_id).then(res => {
        // console.log(res.data[0].description)
        _self.content = res.data[0].description
        // console.log(_self.content)
      })
    }
  },
}
</script>

<style scoped>

</style>