<template>
  <d-card class="card-small mb-3">
    <d-card-body>
      <d-form class="add-new-post">
        <d-input size="lg" class="mb-3" placeholder="Meme Name" v-model="meme_name"/>
        <div class="example">
          <quill-editor
              class="editor"
              ref="myTextEditor"
              :value="content"
              :options="editorOption"
              @change="onEditorChange"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @ready="onEditorReady($event)"
          />

<!--          Components used in testing        -->
<!--          <div class="output code">-->
<!--            <code class="hljs" v-html="contentCode"></code>-->
<!--          </div>-->
<!--          <br>-->
<!--          <br>-->
<!--          <h5>Rendered results:</h5>-->
<!--          <br>-->
<!--          <div class="output ql-snow">-->
<!--            <div class="ql-editor" v-html="content"></div>-->
<!--          </div>-->
        </div>
      </d-form>
      <br>
      <br>
      <br>
      <br>
      <d-list-group-item class="btn-outline-accent">
        <d-form @submit="publish">
          <d-button type="submit" variant="primary" size="sm">Publish</d-button>
        </d-form>

      </d-list-group-item>
    </d-card-body>
  </d-card>
</template>

<script>
import hljs from 'highlight.js'
import debounce from 'lodash/debounce'
import { quillEditor } from 'vue-quill-editor'
import {get_meme} from "@/api/memes";

// highlight.js style
import 'highlight.js/styles/tomorrow.css'

// import theme style
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'

// import mock data
// import { mock_API } from '@/utils/MockAPI_WikiPage'
// mock_API()

export default {
  name: 'Editor',
  title: 'Theme: snow',
  components: {
    quillEditor
  },
  methods: {
    onEditorChange: debounce(function(value) {
      this.content = value.html
    }, 466),
    onEditorBlur(editor) {
      console.log('editor blur!', editor)
    },
    onEditorFocus(editor) {
      console.log('editor focus!', editor)
    },
    onEditorReady(editor) {
      console.log('editor ready!', editor)
    },
    publish(event) {
      event.preventDefault()
      console.log(this.meme_name)
      this.$emit('children_publish', [this.meme_name, this.content])
    }
    // getter of the mock API data
    // getWiki() {
    //   axios.get('/meme1')
    //       .then(response => {
    //         this.content = response.data.wiki
    //       })
    // }
  },
  data() {
    return {
      editorOption: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'font': [] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
            ['clean'],
            ['link', 'image', 'video']
          ],
          syntax: {
            highlight: text => hljs.highlightAuto(text).value
          }
        }
      },
      content: '',
      meme_name: '',
    }
  },
  computed: {
    editor() {
      return this.$refs.Editor.quill
    },
    contentCode() {
      return hljs.highlightAuto(this.content).value
    }
  },
  mounted() {
    // console.log('this is Quill instance:', this.editor)
    const _self = this
    if (this.$route.path !== "/editor") {
      get_meme(this.$route.params.meme_id).then(res => {
        _self.content = res.data[0].description
        _self.meme_name = res.data[0].name
      })
    }
  }
}
</script>

