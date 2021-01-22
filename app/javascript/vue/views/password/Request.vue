<template>
  <div :style="{ paddingTop: navbarHeight + 'px' }" class="container d-flex cr-vh100">
    <div class="d-flex flex-grow-1 flex-column justify-content-center align-items-center">
      <div :class="[mobile ? 'h2' : 'h1', 'text-center']">{{ $t('login.password.request.title') }}</div>
      <p class="form-text text-body text-wrap">{{ $t('login.password.request.text') }}</p>
      <div class="d-flex flex-column align-items-center w-md-50">
        <form>
          <div class="form-group my-2">
            <input v-model="email" v-on:input="allowPost" type="email" class="form-control" id="inputEmail" aria-describedby="emailHelp">
          </div>
          <div class="d-flex justify-content-end">
            <button v-on:click.stop.prevent="sendRequestEmail" type="submit" class="btn btn-dark my-2 w-100" :disabled="disabled">{{ $t('login.password.request.submit') }}</button>
          </div>
        </form>
        <div class="my-3 d-flex flex-column justify-content-center align-items-center">
          <router-link to="/login">{{ $t('login.submit') }}</router-link>
          <p></p>
        </div>
      </div>
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export default {
  name: 'PasswordResetRequest',
  data () {
    return {
      disabled: true,
      email: null,
      errors: [],
    }
  },
  components: {
  },
  computed: {
    ...mapGetters([
      'navbarHeight',
      'mobile'
    ]),
  },
  methods: {
    allowPost () {
      if (this.email) this.disabled = false
      else this.disabled = true
    },
    validateEmail (email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(email).toLowerCase())
    },
    checkForm () {
      this.errors = []
      if (!this.email) {
        this.errors.push(this.$t('signUp.errors.email'))
        return false
      }
      if (!this.validateEmail(this.email)) {
        this.errors.push(this.$t('signUp.errors.emailFormat'))
        return false
      }
      return true
    },
    sendRequestEmail () {
      const checkForm = this.checkForm()
      if (checkForm) {
        console.log(this.email)
        const payload = {
          user: {
            email: this.email,
          }
        }
        this.$store.dispatch('REQUEST_PASSWORD_RESET', payload)
          .then(response => {
            console.log(response)
            if (response.status === 200) {
              console.log(response.data.user.email)
              this.$toast.open({
                message: this.$t('login.password.email', { email: response.data.user.email }),
                type: 'success', // success, info, warning, error, default
                // all of other options may go here
                position: 'bottom', // top, bottom, top-right, bottom-right,top-left, bottom-left
                duration: 3000, // Visibility duration in milliseconds
                dismissible: true,
              })
              this.email = null
              // this.$router.push({ name: 'Home' })
            }
            else if (response.response) {
              // client received an error response (5xx, 4xx)
              this.errors.push(response.status)
            }
            else if (response.request) {
              // client never received a response, or request never left
              this.errors.push(response.status)
            }
            else {
              // anything else
              this.errors.push(response)
            }
          })
          .then(() => {
            if (this.errors.length > 0) {
              console.log(this.errors)
              this.$toast.open({
                  message: this.errors[0],
                  type: 'error', // success, info, warning, error, default
                  // all of other options may go here
                  position: 'bottom', // top, bottom, top-right, bottom-right,top-left, bottom-left
                  duration: 3000, // Visibility duration in milliseconds
                  dismissible: true,
              })
            }
          })
      }
      else {
        console.log(this.errors)
        this.$toast.open({
            message: this.errors[0],
            type: 'error', // success, info, warning, error, default
            // all of other options may go here
            // position: 'bottom-right', // top, bottom, top-right, bottom-right,top-left, bottom-left
            // duration: 3000, // Visibility duration in milliseconds
            // dismissible: true,
        });
      }
    },
  },
}
</script>
