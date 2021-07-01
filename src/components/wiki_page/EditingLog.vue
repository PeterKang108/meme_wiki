<template>
  <d-card class="card-small mb-3">

    <!-- Card Header -->
    <d-card-header class="border-bottom">
      <h6 class="m-0">{{ title }}</h6>
    </d-card-header>

    <d-card-body class="p-0">
      <d-list-group flush>

        <!-- Logs -->
        <d-list-group-item class="px-3 pb-2">
          Created by {{ author }} on {{ date }}
        </d-list-group-item>
        <d-list-group-item class="px-3 pb-2" v-if="very_long">
          ...
        </d-list-group-item>
        <d-list-group-item class="px-3 pb-2" v-for="(date, index) in mod_date_list" v-bind:key="index">
          Edited by {{ editor_list[index] }} on {{ date }}
        </d-list-group-item>




        <d-list-group-item class="d-flex px-3">
          <router-link :to="{ name: 'editor_update', params: { meme_id: this.$route.params.meme_id} }">
            <b-button size="sm" class="btn-accent ml-auto" variant="info">
              Edit this page
            </b-button>
          </router-link>
        </d-list-group-item>


      </d-list-group>
    </d-card-body>
  </d-card>
</template>

<script>
import { get_meme } from "@/api/memes";

export default {
  name: 'sidebar-categories',
  props: {
    /**
     * The component's title.
     */
    title: {
      type: String,
      default: 'Editing Log',
    },
  },
  methods: {
  },
  data () {
    return {
      author: '',
      date: '',
      editor_list: [],
      mod_date_list: [],
      very_long: false,
    }
  },
  mounted () {
    const _self = this
    // load list
    get_meme(this.$route.params.meme_id).then(res => {
      _self.author = res.data[0].author
      _self.date = res.data[0].created_date
      _self.editor_list = res.data[0].modified_by
      _self.mod_date_list = res.data[0].last_modified
      // check list
      const editor_date_list = ["", "", "", ""]
      const editor_name_list = ["", "", "", ""]
      console.log(_self.mod_date_list.length)
      if (_self.mod_date_list.length > 4) {
        for (let i = 0; i < 4; i++) {
          editor_date_list[3 - i] = _self.mod_date_list.pop()
          editor_name_list[3 - i] = _self.editor_list.pop()
        }
        _self.editor_list = editor_name_list
        _self.mod_date_list = editor_date_list
        _self.very_long = true
      }
    })
  }
};
</script>

