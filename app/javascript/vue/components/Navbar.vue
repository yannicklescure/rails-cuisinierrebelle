<template>
  <div
    :key="componentKey"
    ref="navbar"
    :class="`navbar fixed-top d-flex px-3 py-2 justify-content-between align-items-center bg-white border-bottom mb-3`"
    >
    <div class="d-flex align-items-center">
      <router-link to="/" class="navbar-brand d-flex align-items-center text-body">
        <img src="https://media.cuisinierrebelle.com/logo.png" width="32" height="32" class="mr-1">
        <span>Cuisinier Rebelle</span>
      </router-link>
    </div>
    <div
      v-if="isAuthenticated"
      @click="logout"
      class="btn btn-link"
    >Log out</div>
    <div
      v-else
      class="d-flex align-items-center"
    >
      <router-link
        to="/login"
        class="text-body mx-3 text-decoration-none"
      >Log in</router-link>
      <router-link
        to="/signup"
        class="btn btn-sm btn-dark"
      >Get Started</router-link>
    </div>
  </div>
</template>

<script>
// import Navbar from './vue/components/Navbar.vue'
import { isMobile } from 'mobile-device-detect'

export default {
  name: 'Navbar',
  data () {
    return {
      componentKey: 0,
    }
  },
  // components: {
  //   // Navbar
  // },
  methods: {
    logout () {
      this.$store.dispatch('LOG_OUT', {})
    },
    forceRerender () {
      this.componentKey += 1;
    },
    navbarHeight () {
      this.$store.dispatch('NAVBAR_HEIGHT', this.$refs.navbar.offsetHeight)
    },
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
    isAuthenticated () {
      // console.log(this.$store)
      // console.log(this.$store.state.data.isAuthenticated)
      // console.log(this.$store.getters.isAuthenticated)
      return this.$store.getters.isAuthenticated
    },
    // items () {
    //   return this.filter
    // },
    mobile () {
      return isMobile
    }
  },
  beforeMount () {
    this.forceRerender()
  },
  mounted () {
    this.navbarHeight()
  }
}
</script>
