<template>
  <div id="app">
    <app-header />
    <main>
      <router-view />
    </main>
    <app-footer />
  </div>
</template>

<script>
import { isMobile } from 'mobile-device-detect'
import Navbar from './vue/components/Navbar.vue'
import Footer from './vue/components/Footer.vue'

export default {
  name: 'app',
  data () {
    return {
      loading: true,
    }
  },
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: 'Cuisinier Rebelle',
    // all titles will be injected into this template
    titleTemplate: '%s | Cuisinier Rebelle',
    meta: [
      { vmid: 'description', name: 'description', content: 'Partagez vos recettes dès maintenant en toute simplicité' },
      { vmid: 'fb:app_id', property: 'fb:app_id', content: '570259036897585' },
      { vmid: 'og:site_name', property: 'og:site_name', content: 'Cuisinier Rebelle' },
      { vmid: 'og:title', property: 'og:title', content: 'Cuisinier Rebelle' },
      { vmid: 'og:description', property: 'og:description', content: 'Partagez vos recettes dès maintenant en toute simplicité' },
      { vmid: 'og:locale', property: 'og:locale', content: 'fr_FR' },
      { vmid: 'og:type', property: 'og:type', content: 'website' },
      { vmid: 'og:url', property: 'og:url', content: `https://www.cuisinierrebelle.com/` },
      { vmid: 'og:image', property: 'og:image', content: 'https://media.cuisinierrebelle.com/images/cr_icon_1200x1200.jpg' },
      { vmid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
      { vmid: 'twitter:site', name: 'twitter:site', content: '@cuisinierrebelle' },
      { vmid: 'twitter:creator', name: 'twitter:creator', content: '@cuisinierrebelle' },
      { vmid: 'twitter:title', name: 'twitter:title', content: 'Cuisinier Rebelle' },
      { vmid: 'twitter:description', name: 'twitter:description', content: 'Partagez vos recettes dès maintenant en toute simplicité' },
      { vmid: 'twitter:image', name: 'twitter:image', content: 'https://media.cuisinierrebelle.com/images/cr_icon_1200x1200.jpg' },
    ]
  },
  components: {
    'app-footer': Footer,
    'app-header': Navbar,
  },
  methods: {
    async checkAuthentication () {
      await this.$store
        .dispatch('IS_AUTHENTICATED', {})
        .then(result => console.log(result))
    },

    fetchItems () {
      this.loading = true
      console.log('SET_STORE')
      this.$store
        .dispatch('SET_STORE', {})
        .then(response => {
          console.log(response)
          // this.filter = this.$store.getters.posts
          // this.posts = this.$store.getters.posts
        })
        .finally(()=> {
          this.loading = false
        })
    },
  },
  computed: {
    // user () {
    //   return this.$store.getters.currentUser
    // },
    // items () {
    //   return this.filter
    // },
    timestamp () {
      // if (this.$store.state.data.timestamp === null) this.fetchItems()
      return this.$store.state.data.timestamp
    },
    mobile () {
      return isMobile
    }
  },
  async beforeMount () {
    await this.checkAuthentication()
    this.fetchItems()
  },
}
</script>
