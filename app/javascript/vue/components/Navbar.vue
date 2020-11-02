<template>
  <div
    :key="componentKey"
    ref="navbar"
    :class="['navbar fixed-top d-flex px-3 py-2 justify-content-between align-items-center bg-white mb-3']"
    >
    <div class="d-flex align-items-center">
      <router-link
        to="/"
        class="navbar-brand d-flex align-items-center text-body"
        @click.native="scroll2Top"
      >
        <img src="https://media.cuisinierrebelle.com/logo.png" width="32" height="32" class="mr-1">
        <span>{{ $t('navbar.brand') }}</span>
      </router-link>
    </div>
    <div
      v-if="isAuthenticated"
      @click="logout"
      class="mouse-pointer text-body mx-3 text-decoration-none"
    >{{ $t('navbar.logout') }}</div>
    <div
      v-else
      class="d-flex align-items-center"
    >
      <router-link
        to="/login"
        class="text-body mx-3 text-decoration-none"
      >{{ $t('navbar.login') }}</router-link>
      <router-link
        to="/signup"
        class="btn btn-sm btn-dark"
      >{{ $t('navbar.getStarted') }}</router-link>
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
  created () {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    scroll2Top (event) {
      // console.log(this.$route.name)
      if (this.$route.name === 'Home' && window.scrollY > 0) {
        event.preventDefault()
        const scrollOptions = {
          top: 0,
          left: 0,
          behavior: 'smooth'
        };
        window.scrollTo(scrollOptions);
      }
    },
    handleScroll (event) {
      // Code to be executed when the window is scrolled
      const position = window.scrollY != 0
      // console.log(position)
      if (position) this.$refs.navbar.classList.add('border-bottom')
      else this.$refs.navbar.classList.remove('border-bottom')
      return position
    },
    logout () {
      this.$store.dispatch('LOG_OUT', {})
    },
    forceRerender () {
      this.componentKey += 1;
    },
    navbarHeight () {
      this.$store.dispatch('NAVBAR_HEIGHT', parseInt(this.$refs.navbar.offsetHeight))
    },
  },
  computed: {
    isScrollTop () {
      return true
    },
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
    this.handleScroll()
  }
}
</script>
