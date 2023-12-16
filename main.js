
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import ajax from "./services/ajax.js"
import store from "./services/store.js"
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.config.globalProperties.$ajax = ajax
app.use(store)
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
import ajax from "./services/ajax.js"
import store from "./services/store.js"
export function createApp() {
  const app = createSSRApp(App)
  app.config.globalProperties.$ajax = ajax
  app.use(store)
  return {
    app
  }
}
// #endif