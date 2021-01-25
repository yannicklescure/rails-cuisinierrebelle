<template>
  <div
    :key="componentKey"
    ref="navbar"
    :class="['navbar fixed-top d-flex flex-column px-3 py-2 bg-white']"
    v-click-outside="collapse"
    >
    <div class="d-flex w-100 justify-content-between align-items-center">
      <div class="d-flex align-items-center">
        <router-link
          to="/"
          class="navbar-brand d-flex align-items-center text-body"
          @click.native="scroll2Top"
        >
          <img v-lazy="'https://media.cuisinierrebelle.com/brand-icon.jpg'" width="32" height="32" class="mr-1">
          <span>{{ $t('navbar.brand') }}</span>
          <span v-if="loading" class="material-icons rotate ml-2 text-muted">cached</span>
        </router-link>
      </div>
      <div class="d-flex align-items-center">
        <router-link to="/notifications" class="nav-item mx-2 text-body text-decoration-none">
          <i class="material-icons md-24 d-flex">notifications_none</i>
        </router-link>
        <div v-on:click="collapseMenu">
          <i class="material-icons md-24 d-flex">menu</i>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div v-if="!show" class="mt-2 input-group d-flex w-100">
        <input
          v-model="searchQuery"
          v-on:keyup.enter="validSearchQuery"
          type="search"
          class="form-control"
          :placeholder="$t('navbar.search')"
          ref="searchInput"
        >
      </div>
      <div v-if="show" class="mt-2 d-flex flex-column w-100">
        <div v-if="isAuthenticated" class="d-flex flex-column">
          <router-link v-on:click.native="collapse" to="/top100" class="text-fire my-2 text-decoration-none">Top 100</router-link>
          <router-link v-on:click.native="collapse" class="text-body my-2 text-decoration-none" to="/bookmarks">{{ $t('navbar.bookmarks') }}</router-link>
          <router-link v-on:click.native="collapse" class="text-body my-2 text-decoration-none" :to="'/u/' + currentUser.slug">{{ $t('navbar.recipes') }}</router-link>
          <router-link v-on:click.native="collapse" class="text-body my-2 text-decoration-none" to="/r/new">{{ $t('navbar.new_recipe') }}</router-link>
          <router-link v-on:click.native="collapse" class="text-body my-2 text-decoration-none" :to="'/u/' + currentUser.slug + '/following'">{{ $t('navbar.following') }}</router-link>
          <router-link v-on:click.native="collapse" class="text-body my-2 text-decoration-none" :to="'/u/' + currentUser.slug + '/settings'">{{ $t('navbar.settings') }}</router-link>
          <facebook-login v-if="facebookAuth" />
          <div v-else @click="logout" class="text-body my-2 text-decoration-none">{{ $t('navbar.logout') }}</div>
        </div>
        <div v-else class="d-flex flex-column">
          <router-link v-on:click.native="collapse" to="/login" class="text-body my-2 text-decoration-none">{{ $t('navbar.login') }}</router-link>
          <router-link v-on:click.native="collapse" to="/signup" class="text-body my-2 text-decoration-none">{{ $t('navbar.getStarted') }}</router-link>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { isMobile } from 'mobile-device-detect'
import ClickOutside from 'vue-click-outside'
const FacebookLogin = () => import('../components/buttons/Facebook.vue')

export default {
  name: 'NavbarSmall',
  data () {
    return {
      componentKey: 0,
      loading: false,
      show: false,
      searchQuery: '',
    }
  },
  directives: {
    ClickOutside
  },
  components: {
    FacebookLogin,
  },
  created () {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
  },
  computed: {
    ...mapGetters([
      'isAuthenticated',
      'currentUser',
      'facebookAuth',
    ]),
    isScrollTop () {
      return true
    },
    mobile () {
      return isMobile
    }
  },
  methods: {
    inputMode () {
      // this.$refs.searchInput.inputMode = 'search'
      // this.$refs.searchInput.inputMode = 'none'
      if (this.show === false) {
        console.log('inputMode')
        // this.$refs.searchInput.value = ''
        this.searchQuery = ''
        this.$refs.searchInput.blur()
      }
    },
    validSearchQuery () {
      console.log(this.searchQuery)
      this.$store.dispatch('SEARCH', { query: this.searchQuery })
        .then(response => {
          console.log(response)
          if (response.status === 200) this.$router.push({ name: 'Search', query: { r: this.searchQuery } })
        })
        .finally(() => this.inputMode())
      // this.inputMode()
    },
    async collapseMenu () {
      await this.inputMode()
      this.show = !this.show
    },
    async collapse () {
      await this.inputMode()
      this.show = false
    },
    scroll2Top () {
      if (this.$route.name === 'Home' && this.isAuthenticated) {
        if (window.scrollY > 0) {
          const scrollOptions = {
            top: 0,
            left: 0,
            behavior: 'smooth'
          };
          window.scrollTo(scrollOptions)
        }
        this.loading = true
        this.$store
          .dispatch('RECIPES', {})
          .then(response => {
            this.loading = false
          })
      }
    },
    handleScroll (event) {
      this.collapse()
      // Code to be executed when the window is scrolled
      const position = window.scrollY != 0
      // console.log(position)
      if (position) this.$refs.navbar.classList.add('border-bottom')
      else this.$refs.navbar.classList.remove('border-bottom')
      return position
    },
    logout () {
      this.collapse()
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
  beforeMount () {
    this.forceRerender()
  },
  mounted () {
    this.navbarHeight()
    this.handleScroll()
  }
}
</script>

<style scoped>
.rotate {
  animation: rotation 2s infinite linear;
}
@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>
