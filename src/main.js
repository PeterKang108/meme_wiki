import Vue from 'vue'
import ShardsVue from 'shards-vue'

import App from './App.vue'
import router from "./router/router.js"
// import store from './store/index'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import CommentGrid from 'vue-comment-grid'

Vue.use(CommentGrid)

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'jquery'
import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

ShardsVue.install(Vue);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
