<template>
  <d-container fluid class="main-content-container px-4 pb-4">
    <!-- Page Header -->
    <d-row no-gutters class="page-header py-4">
      <!-- Page Title -->
      <d-col col sm="4" class="text-center text-sm-left mb-4 mb-sm-0">
        <h3 class="page-title">Meme Editor</h3>
      </d-col>
    </d-row>

    <d-row>
      <!-- Editor -->
      <d-col lg="9" md="12">
        <meme-editor @children_publish="parentGetPublish"/>
      </d-col>

      <!-- Sidebar Widgets -->
      <d-col lg="3" md="12">
<!--        <meme-sidebar-actions />-->
        <d-card class="card-small mb-3">
          <d-card-header class="border-bottom">
            <h6 class="m-0"> Status </h6>
          </d-card-header>

          <d-card-body class="p-0">
            <d-list-group flush>
              <d-list-group-item class="p-3">
                <span class="d-flex mb-2"><strong class="mr-1">Status:</strong> Draft <a class="ml-auto" href="#">Edit</a></span>
                <span class="d-flex mb-2"><strong class="mr-1">Visibility:</strong> <strong class="text-success">Public</strong> <a class="ml-auto" href="#">Edit</a></span>
                <span class="d-flex mb-2"><strong class="mr-1">Schedule:</strong> Now <a class="ml-auto" href="#">Edit</a></span>
              </d-list-group-item>

<!--              <d-list-group-item class="btn-outline-accent">-->
<!--                <b-form @submit="onSubmit">-->
<!--                  <b-form-group>-->
<!--                    <b-button type="submit" variant="primary" size="sm">Save Draft</b-button>-->
<!--                  </b-form-group>-->
<!--                </b-form>-->

<!--                <b-form @submit="publish">-->
<!--                  <b-form-group>-->
<!--                    <b-button type="submit" variant="primary" size="sm">Publish</b-button>-->
<!--                  </b-form-group>-->
<!--                </b-form>-->

<!--              </d-list-group-item>-->
            </d-list-group>
          </d-card-body>
        </d-card>
<!--        <meme-sidebar-categories />-->
        <d-card class="card-small mb-3">

          <!-- Card Header -->
          <d-card-header class="border-bottom">
            <h6 class="m-0"> Category </h6>
          </d-card-header>

          <d-card-body class="p-0">
            <d-list-group flush>

              <!-- Categories -->
              <d-list-group-item class="px-3 pb-2">
                <d-checkbox v-model="form.category" class="mb-1" value="web">Pure Web</d-checkbox>
                <d-checkbox v-model="form.category" class="mb-1" value="movies_tv">Movies & TV dramas</d-checkbox>
                <d-checkbox v-model="form.category" class="mb-1" value="sports">Sports</d-checkbox>
                <d-checkbox v-model="form.category" class="mb-1" value="music">Music</d-checkbox>
                <d-checkbox v-model="form.category" class="mb-1" value="games">Games</d-checkbox>
                <d-checkbox v-model="form.category" class="mb-1" value="anime">Anime</d-checkbox>
                <d-checkbox v-model="form.category" class="mb-1" value="others">Others</d-checkbox>
              </d-list-group-item>

            </d-list-group>
          </d-card-body>
        </d-card>
      </d-col>
    </d-row>
  </d-container>
</template>

<script>
// import SidebarActions from '@/components/editor/SidebarActions.vue';
// import SidebarCategories from '@/components/editor/SidebarCategories.vue';
import Editor from '@/components/editor/Editor.vue';
import 'quill/dist/quill.snow.css';
import {create_meme, update_meme} from "@/api/memes";
import {getName} from '@/utils/userStatus'

export default {
  name: "wiki-editor",
  components: {
    memeEditor: Editor,
    // memeSidebarActions: SidebarActions,
    // memeSidebarCategories: SidebarCategories,
  },
  data() {
    return{
      form: {
        name: "",
        description: "",
        category: [],
        author: getName(),
      },
      form_update: {
        description: "",
        category: "",
        author: getName(),
      }
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      alert("Draft Saved")
    },
    parentGetPublish(payload) {
      this.form.name = payload[0]
      this.form.description = payload[1]
      const _self = this
      if (this.$route.path !== "/editor") {
        this.form_update.description = this.form.description
        this.form_update.category = this.form.category
        update_meme(JSON.stringify(this.form_update), getName(), this.$route.params.meme_id).then(() => {
          _self.$router.push({name: 'wiki_page', params: {meme_id: _self.$route.params.meme_id}})
        })
      } else {
        create_meme(JSON.stringify(this.form)).then(res => {
          let id = res.data.meme_id
          console.log(id)
          _self.$router.push({name: 'wiki_page', params: {meme_id: id}})
        }).catch(err => {
          console.log(err)
        })
      }
    },
  },

}
</script>

<style scoped>

</style>