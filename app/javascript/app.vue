<template>
  <div>
    <navbar />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import { isMobile } from 'mobile-device-detect'
import Navbar from './vue/components/Navbar.vue'

export default {
  name: 'App',
  data () {
    return {
      loading: false,
    }
  },
  components: {
    Navbar
  },
  methods: {
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
    //   return this.$store.getters.user
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
  created () {
    this.fetchItems()
  },
}
</script>
