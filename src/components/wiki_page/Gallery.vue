<template>
  <d-card class="card-small mb-3" id="gallery">
    <d-card-header class="border-bottom">
      <h6 class="m-0">{{ title }}</h6>
    </d-card-header>

    <d-card-body class="p-0">
      <d-list-group flush>
        <d-list-group-item class="btn-outline-accent">
          <div v-for="(item, index) in pics" v-bind:key="index">
<!--            <div class="ql-editor">Using v-html directive: </div>-->
            <d-img :src=item fluid />
          </div>
        </d-list-group-item>
        <d-list-group-item class="btn-outline-accent" v-if="!addYourPic">
          <b-button v-on:click="addYourPic = !addYourPic" variant="info" size="sm">Add Your Pics</b-button>
        </d-list-group-item>
        <d-list-group-item class="btn-outline-accent" v-if="addYourPic">
          <img style="" :src="new_image" alt="">
          <input @change="handleImages" class="custom-input" type="file" accept="image/*">
          <b-button v-on:click="addYourPic = !addYourPic; new_image = ''" variant="danger" size="sm">Cancel</b-button>
        </d-list-group-item>
        <d-list-group-item class="btn-outline-accent" v-if="addYourPic">
          <b-form @submit="onSubmit">
            <b-button type="submit" variant="info" size="sm">Submit</b-button>
          </b-form>
        </d-list-group-item>
      </d-list-group>
    </d-card-body>
  </d-card>
</template>

<script>
//import axios from "axios";

// import theme style
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import {get_meme, upload_pic} from "@/api/memes";

// import mock data
// import { mock_API } from '@/utils/MockAPI_WikiPage'
// mock_API()

export default {
  name: "Gallery",
  // components: {
  //   UploadImages,
  // },
  props: {
    /**
     * The component's title.
     */
    title: {
      type: String,
      default: 'Gallery',
    },
  },
  data() {
    return {
      pics: [],
      form: {
        pic: ""
      },
      new_image: "",
      addYourPic: false,
    }
  },
  methods: {
    getPics() {
      const _self = this
      get_meme(this.$route.params.meme_id).then(res => {
        _self.pics = res.data[0].pictures
      })
    },
    onSubmit() {
      this.form.pic = this.new_image
      upload_pic(JSON.stringify(this.form), this.$route.params.meme_id)
    },
    addNow() {
      this.addYourPic = !this.addYourPic
    },
    handleImages(files){
      const selectedImage = files.target.files[0]
      this.createBase64Image(selectedImage)
    },
    createBase64Image(file) {
      const reader = new FileReader()

      reader.onload = (e) => {
        this.new_image = e.target.result
      }

      reader.readAsDataURL(file)
      console.log(this.new_image)
    },
  },
  mounted() {
    this.getPics()
  }
}
</script>

<style scoped>

</style>