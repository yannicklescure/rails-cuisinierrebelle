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
      loading: false,
    }
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
