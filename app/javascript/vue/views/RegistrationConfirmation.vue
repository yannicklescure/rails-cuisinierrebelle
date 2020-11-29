<template>
  <div :style="{ paddingTop: navbarHeight + 'px' }">
    <p>{{ message }}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export default {
  name: 'RegistrationConfirmation',
  data () {
    return {
      // componentKey: 0,
      // navbarHeight: 0,
      message: null,
    }
  },
  methods: {
    // getNavbarHeight () {
    //   return this.$store.getters.navbarHeight
    // },
    confirmRegistration () {
      this.$store.dispatch('REGISTRATION_CONFIRMATION', { token: this.$route.query.confirmation_token })
        .then(response => {
          console.log(response)
          if (response.status && response.status === 200) {
            this.$toast.open({
              message: this.$t('RegistrationConfirmation.success', { firstName: capitalize(response.data.first_name) }),
              type: 'info', // success, info, warning, error, default
              // all of other options may go here
              // position: 'bottom-right', // top, bottom, top-right, bottom-right,top-left, bottom-left
              // duration: 3000, // Visibility duration in milliseconds
              // dismissible: true,
            })
            this.$router.push({ name: 'Login' })
          }
          else {
            // this.message = response.error
            this.$toast.open({
              message: response.error,
              type: 'error', // success, info, warning, error, default
              // all of other options may go here
              // position: 'bottom-right', // top, bottom, top-right, bottom-right,top-left, bottom-left
              // duration: 3000, // Visibility duration in milliseconds
              // dismissible: true,
            })
            this.$router.push({ name: 'Home' })
          }
        })
    }
  },
  computed: {
    ...mapGetters(['navbarHeight']),
  },
  beforeMount () {
    this.confirmRegistration()
  },
  mounted () {
    // this.navbarHeight = this.getNavbarHeight()
  }
}
</script>
