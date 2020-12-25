<template>
  <div
    :key="componentKey"
    ref="navbar"
    :class="['d-print-none navbar fixed-top d-flex px-3 py-2 justify-content-between align-items-center bg-white mb-3']"
    >
    <div class="d-flex align-items-center">
      <router-link
        to="/"
        class="navbar-brand d-flex align-items-center text-body"
        @click.native="scroll2Top"
      >
        <img v-lazy="'https://media.cuisinierrebelle.com/brand-icon.jpg'" width="32" height="32" class="mr-1">
        <span>{{ $t('navbar.brand') }}</span>
      </router-link>
    </div>
    <div class="input-group d-flex w-25">
      <input
        v-model="searchQuery"
        v-on:keyup.enter="validSearchQuery"
        type="search"
        class="form-control"
        :placeholder="$t('navbar.search')"
        ref="searchInput"
      >
    </div>
    <div class="d-flex align-items-center">
      <div
        v-if="isAuthenticated"
        class="d-flex align-items-center"
      >
        <router-link to="/top100" class="nav-item mx-2 text-fire text-decoration-none">
          <i class="material-icons md-18 d-flex">whatshot</i>
        </router-link>
        <router-link to="/bookmarks" class="nav-item mx-2 text-body text-decoration-none">
          <i class="material-icons md-18 d-flex">bookmarks</i>
        </router-link>
        <router-link to="/notifications" class="nav-item mx-2 text-body text-decoration-none">
          <i class="material-icons md-18 d-flex">notifications_none</i>
        </router-link>
        <div class="nav-item mx-2 dropdown">
          <div class="text-body mouse-pointer" role="button" id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i class="material-icons md-18 d-flex">more_vert</i>
          </div>
          <div class="dropdown-menu dropdown-menu-md-right" aria-labelledby="navbarDropdown">
            <router-link class="dropdown-item" to="/r/new">{{ $t('navbar.new_recipe') }}</router-link>
            <router-link class="dropdown-item" :to="'/u/' + user.slug">{{ $t('navbar.recipes') }}</router-link>
            <router-link class="dropdown-item" :to="'/u/' + user.slug + '/following'">{{ $t('navbar.following') }}</router-link>
            <router-link class="dropdown-item" :to="'/u/' + user.slug + '/settings'">{{ $t('navbar.settings') }}</router-link>
            <router-link class="dropdown-item" :to="'/admin'" v-if="currentUser.admin">{{ $t('navbar.admin') }}</router-link>
            <div
              @click="logout"
              class="dropdown-item mouse-pointer"
            >
              {{ $t('navbar.logout') }}
            </div>
          </div>
        </div>
      </div>
      <div
        v-else
        class="d-flex align-items-center"
      >
        <router-link
          to="/login"
          class="btn btn-sm text-body mx-2 text-decoration-none"
        >{{ $t('navbar.login') }}</router-link>
        <router-link
          to="/signup"
          class="btn btn-sm btn-dark mx-2"
        >{{ $t('navbar.getStarted') }}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { isMobile } from 'mobile-device-detect'

export default {
  name: 'NavbarLarge',
  data () {
    return {
      componentKey: 0,
      searchQuery: '',
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
    validSearchQuery () {
      this.$refs.searchInput.value = ''
      console.log(this.searchQuery)
      this.$store.dispatch('SEARCH', { query: this.searchQuery })
        .then(response => {
          console.log(response)
          if (response.status === 200) this.$router.push({ name: 'Search', query: { r: this.searchQuery } })
        })
    },
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
      let message = this.$t('navbar.are_you_sure')

      let options = {
          // html: false, // set to true if your message contains HTML tags. eg: "Delete <b>Foo</b> ?"
          // loader: false, // set to true if you want the dailog to show a loader after click on "proceed"
          // reverse: false, // switch the button positions (left to right, and vise versa)
          okText:  this.$t('navbar.logout'),
          cancelText: this.$t('navbar.cancel'),
          // animation: 'zoom', // Available: "zoom", "bounce", "fade"
          // type: 'basic', // coming soon: 'soft', 'hard'
          // verification: 'continue', // for hard confirm, user will be prompted to type this to enable the proceed button
          // verificationHelp: 'Type "[+:verification]" below to confirm', // Verification help text. [+:verification] will be matched with 'options.verification' (i.e 'Type "continue" below to confirm')
          // clicksCount: 3, // for soft confirm, user will be asked to click on "proceed" btn 3 times before actually proceeding
          backdropClose: true, // set to true to close the dialog when clicking outside of the dialog window, i.e. click landing on the mask
          customClass: '' // Custom class to be injected into the parent node for the current dialog instance
      };

      this.$dialog
        .confirm(message, options)
        .then(dialog => {
          console.log('Clicked on proceed')
          console.log(dialog)
          this.$store.dispatch('LOG_OUT', {})
            .then(response => {
              console.log(response)
              if (response.status === 204 && this.$route.name != 'Home') this.$router.push({ name: 'Home' })
            })
        })
        .catch(() => {
          console.log('Clicked on cancel')
        });
    },
    forceRerender () {
      this.componentKey += 1;
    },

    navbarHeight () {
      this.$store.dispatch('NAVBAR_HEIGHT', parseInt(this.$refs.navbar.offsetHeight))
    },
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'currentUser']),
    user () {
      return this.currentUser
    },
    isScrollTop () {
      return true
    },
    // user () {
    //   return this.$store.getters.currentUser
    // },
    // isAuthenticated () {
    //   // console.log(this.$store)
    //   // console.log(this.$store.state.data.isAuthenticated)
    //   // console.log(this.$store.getters.isAuthenticated)
    //   return this.$store.getters.isAuthenticated
    // },
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
