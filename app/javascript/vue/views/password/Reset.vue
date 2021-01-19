<template>
  <div :style="{ paddingTop: navbarHeight + 'px' }" class="container d-flex cr-vh100">
    <div class="d-flex flex-grow-1 flex-column justify-content-center align-items-center">
      <div :class="[mobile ? 'h2' : 'h1', 'text-center']">{{ $t('login.password.reset.title') }}</div>
      <p v-if="firstName" class="form-text text-body text-wrap">{{ $t('login.password.reset.text0', { firstName: firstName }) }}</p>
      <div v-else>
        <p class="form-text text-body text-wrap">{{ $t('login.password.reset.text1') }}</p>
        <router-link to="/users/password/new">{{ $t('login.forgetPassword') }}</router-link>
      </div>
      <div v-if="firstName" class="d-flex flex-column align-items-center w-md-50">
        <form>
          <label for="inputPassword">{{ $t('signUp.password') }}</label>
          <div class="input-group mb-3">
            <input v-model="password" ref="password1" type="password" class="form-control" aria-describedby="button-password1">
            <div class="input-group-append">
              <button v-on:click="showPassword1" class="btn btn-outline-form" type="button" id="button-password1">
                <i ref="password1Icon" class="material-icons md-18 d-flex">visibility_off</i>
              </button>
            </div>
          </div>
          <label for="inputPassword">{{ $t('signUp.confirmation') }}</label>
          <div class="input-group mb-3">
            <input v-model="confirmation" v-on:input="allowPost" v-on:touchend="allowPost" ref="password2" type="password" class="form-control" aria-describedby="button-password2">
            <div class="input-group-append">
              <button v-on:click="showPassword2" class="btn btn-outline-form" type="button" id="button-password2">
                <i ref="password2Icon" class="material-icons md-18 d-flex">visibility_off</i>
              </button>
            </div>
          </div>
          <div class="d-flex justify-content-end">
            <button v-on:click.stop.prevent="requestReset" type="submit" class="btn btn-dark my-2 w-100" :disabled="disabled">{{ $t('login.password.reset.submit') }}</button>
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
  name: 'PasswordReset',
  data () {
    return {
      disabled: true,
      token: this.$route.query.token,
      email: null,
      firstName: null,
      confirmation: null,
      password: null,
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
  beforeMount () {
    console.log(this.token)
    this.requestResetVerification()
  },
  methods: {
    showPassword1 () {
      if (this.$refs.password1.type === "text") {
        this.$refs.password1.type = "password"
        this.$refs.password1Icon.innerText = "visibility_off"
      }
      else {
        this.$refs.password1.type = "text"
        this.$refs.password1Icon.innerText = "visibility"
        setTimeout(() => {
          this.showPassword1()
        }, 3000)
      }
    },
    showPassword2 () {
      if (this.$refs.password2.type === "text") {
        this.$refs.password2.type = "password"
        this.$refs.password2Icon.innerText = "visibility_off"
      }
      else {
        this.$refs.password2.type = "text"
        this.$refs.password2Icon.innerText = "visibility"
        setTimeout(() => {
          this.showPassword2()
        }, 3000)
      }
    },
    allowPost () {
      if (this.password && this.confirmation) this.disabled = false
      else this.disabled = true
    },
    validateEmail (email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(email).toLowerCase())
    },
    checkForm () {
      this.errors = []
      console.log({ password: this.password })
      console.log({ confirmation: this.confirmation })
      if (!this.password) {
        this.errors.push(this.$t('signUp.errors.password'))
        return false
      }
      if (this.password.split('').length < 8) {
        this.errors.push(this.$t('signUp.errors.passwordLength'))
        return false
      }
      if (this.password != this.confirmation) {
        this.errors.push(this.$t('signUp.errors.confirmation'))
        return false
      }
      return true
    },
    requestReset () {
      const checkForm = this.checkForm()
      if (checkForm) {
        console.log(this.email)
        const payload = {
          user: {
            email: this.email,
            password: this.password,
            confirmation: this.confirmation,
            token: this.token,
          }
        }
        this.$store.dispatch('PASSWORD_RESET', payload)
          .then(response => {
            console.log(response)
            if (response.status === 200) {
              console.log(response.data.success)
              if (response.data.success) {
                this.$toast.open({
                  message: this.$t('login.password.reset.success', { email: this.email }),
                  type: 'success', // success, info, warning, error, default
                  // all of other options may go here
                  position: 'bottom', // top, bottom, top-right, bottom-right,top-left, bottom-left
                  duration: 3000, // Visibility duration in milliseconds
                  dismissible: true,
                })
                this.password = null
                this.confirmation = null
                this.$router.push({ name: 'Login' })
              }
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
    requestResetVerification () {
      console.log(this.email)
      const payload = {
        user: {
          token: this.token,
        }
      }
      this.$store.dispatch('PASSWORD_RESET_VERIFICATION', payload)
        .then(response => {
          console.log(response)
          if (response.status === 200) {
            this.email = response.data.user.email
            this.firstName = capitalize(response.data.user.firstName)
            this.token = response.data.user.token
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
    },
  },
}
</script>
