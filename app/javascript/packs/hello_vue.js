import fetch from 'node-fetch'
global.fetch = fetch

import Vue from 'vue/dist/vue.esm'
import Vuex from 'vuex'
Vue.use(Vuex)

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import VueMeta from 'vue-meta'
Vue.use(VueMeta)

import { createStore } from '../vue/store'
import { createRouter } from '../vue/router'
import { sync } from 'vuex-router-sync'

import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)

import App from '../app.vue'

// create store and router instances
const store = createStore()
// console.log(store)
const router = createRouter()
// console.log(router)

// sync the router with the vuex store.
// this registers `store.state.route`
const unsync = sync(store, router)
// console.log('router')
// unsync()

// Tell Vue to use the plugin
Vue.use(require('vue-cookie'))
console.log(document.cookie)

console.log(window.location)
// if (window.location.hostname != 'localhost') {
import VueGtag from 'vue-gtag'

Vue.use(VueGtag, {
  config: { id: "UA-155962082-1" }
}, router)

import Ads from 'vue-google-adsense'

Vue.use(require('vue-script2'))

// Vue.use(Ads.Adsense)
Vue.use(Ads.InArticleAdsense)
// Vue.use(Ads.InFeedAdsense)
// }

import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

import { messages } from '../vue/locales'
console.log(messages())
const i18n = new VueI18n({
  locale: 'fr', // set locale
  messages: messages(), // set locale messages
})

import VuejsDialog from 'vuejs-dialog'
// import VuejsDialogMixin from 'vuejs-dialog/dist/vuejs-dialog-mixin.min.js'; // only needed in custom components

// include the default style
// import 'vuejs-dialog/dist/vuejs-dialog.min.css';

// Tell Vue to install the plugin.
Vue.use(VuejsDialog);

import VueToast from 'vue-toast-notification'
// Import one of the available themes
//import 'vue-toast-notification/dist/theme-default.css'
// import 'vue-toast-notification/dist/theme-sugar.css'

Vue.use(VueToast)
// //Vue.$toast.open({/* options */});
// let instance = Vue.$toast.open('You did it!');

// // Force dismiss specific toast
// instance.dismiss();
// // Dismiss all opened toast immediately
// Vue.$toast.clear();

import VueSocialSharing from 'vue-social-sharing'
Vue.use(VueSocialSharing);

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload)

// Vue.filter('truncate', truncate)
import * as utils from '../util'
// register global utility utils.
Object.keys(utils).forEach(key => {
  Vue.filter(key, utils[key])
})

document.addEventListener('DOMContentLoaded', () => {
  const app = new Vue({
    el: '#app',
    i18n,
    store,
    router,
    // template: '<App/>',
    // components: {
    //   App,
    //   // MarkdownItVue
    // }
    render: h => h(App)
  })
  console.log('app')

  // document.querySelector('#preload').remove()
  // document.querySelector('#banner-skeleton').remove()
})
