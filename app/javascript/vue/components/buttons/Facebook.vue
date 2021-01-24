<template>
  <div>
    <div v-if="isAuthenticated">
      <div
        v-if="scope.logout && model.connected"
        @click="scope.logout"
        :class="[mobile ? 'text-body my-2 text-decoration-none' : 'dropdown-item mouse-pointer']"
      >{{ $t('navbar.logout') }}</div>
    </div>
    <v-facebook-login
      :class="[{'d-none': isAuthenticated}]"
      app-id="570259036897585"
      version="v9.0"
      v-model="model"
      @sdk-init="handleSdkInit"
      @login="login"
      @logout="logout"
    >
      <template v-slot:login>{{ $t('login.facebook.login') }}</template>
      <template v-slot:logout>{{ $t('login.facebook.logout') }}</template>
      <template v-slot:working>{{ $t('login.facebook.working') }}</template>
    </v-facebook-login>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import VFacebookLogin from 'vue-facebook-login-component'
import { isMobile } from 'mobile-device-detect'

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export default {
  data: () => ({
    FB: {},
    model: {},
    scope: {},
    errors: [],
    text: {
      login: 'test'
    }
  }),
  components: {
    VFacebookLogin,
  },
  computed: {
    ...mapGetters([
      'isAuthenticated',
    ]),
    mobile () {
      return isMobile
    }
  },
  methods: {
    handleSdkInit({ FB, scope }) {
      this.FB = FB
      this.scope = scope
    },
    login (response) {
      console.log('login')
      console.log(response)
      if (response) {
        this.$emit('isConnecting', true)
        this.$store.dispatch('FACEBOOK_LOG_IN', response)
          .then(result => {
            console.log(result)
            if (result.status === 401) {
              console.log('Unauthorized!')
              this.scope.logout()
              this.$emit('isConnecting', false)
            }
            if (result.status === 200) {
              console.log(capitalize(result.data.first_name))
              this.$toast.open({
                message: this.$t('login.welcome', { firstName: capitalize(result.data.first_name) }),
                type: 'success', // success, info, warning, error, default
                // all of other options may go here
                position: 'bottom', // top, bottom, top-right, bottom-right,top-left, bottom-left
                duration: 3000, // Visibility duration in milliseconds
                dismissible: true,
              })
              this.$router.push({ name: 'Home' })
            }
            else if (result.response) {
              // client received an error response (5xx, 4xx)
              this.errors.push(result.status)
            }
            else if (result.request) {
              // client never received a response, or request never left
              this.errors.push(result.status)
            }
            else {
              // anything else
              this.errors.push(result)
            }
          })
          .then(() => {
            if (this.errors.length > 0) {
              console.log(this.errors)
              let message = this.errors[0].toString()
              if (this.errors[0] === 401) message = 'Unauthorized'
              this.$toast.open({
                  message: message,
                  type: 'error', // success, info, warning, error, default
                  // all of other options may go here
                  position: 'bottom', // top, bottom, top-right, bottom-right,top-left, bottom-left
                  duration: 3000, // Visibility duration in milliseconds
                  dismissible: true,
              })
              this.$emit('isConnecting', false)
            }
          })
      }
    },
    logout () {
      if (this.isAuthenticated) {
        let message = this.$t('navbar.are_you_sure')

        let options = {
            // html: false, // set to true if your message contains HTML tags. eg: "Delete <b>Foo</b> ?"
            // loader: false, // set to true if you want the dialog to show a loader after click on "proceed"
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
      }
    },
  },
  beforeMount () {
    if (this.isAuthenticated === false && this.model.connected === true) {
      console.log('Unauthorized!')
      this.scope.logout()
      this.$emit('isConnecting', false)
    }
  }
}
</script>
