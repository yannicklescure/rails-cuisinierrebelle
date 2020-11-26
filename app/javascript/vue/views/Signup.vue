<template>
  <div class="container" :style="{ marginTop: navbarHeight + 'px' }">
    <div class="d-flex py-3 justify-content-center align-items-center">
      <div class="d-flex flex-column w-md-50">
        <form>
          <div class="form-group mb-3">
            <label for="inputFirstName">{{ $t('signUp.firstName') }}</label>
            <input v-model="firstName" type="text" class="form-control" id="inputFirstName">
          </div>
          <div class="form-group mb-3">
            <label for="inputLastName">{{ $t('signUp.lastName') }}</label>
            <input v-model="lastName" type="text" class="form-control" id="inputLastName">
          </div>
          <div class="form-group mb-3">
            <label for="inputEmail">{{ $t('signUp.email') }}</label>
            <input v-model="email" type="email" class="form-control" id="inputEmail" aria-describedby="emailHelp">
            <small id="emailHelp" class="form-text text-muted">{{ $t('signUp.disclaimer') }}</small>
          </div>
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
            <button v-on:click.stop.prevent="signUp" type="submit" class="btn btn-dark mb-3 w-100" :disabled="disabled">{{ $t('signUp.submit') }}</button>
          </div>
        </form>
        <div class="my-3">
          <router-link to="/login">{{ $t('signUp.login') }}</router-link>
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
  name: 'Signup',
  data () {
    return {
      disabled: true,
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      confirmation: null,
      errors: [],
    }
  },
  // components: {
  //   // Navbar
  // },
  computed: {
    ...mapGetters(['navbarHeight']),
  },
  methods: {
    allowPost () {
      if (this.password && this.confirmation) this.disabled = false
      else this.disabled = true
    },
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
    validateEmail (email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(email).toLowerCase())
    },
    checkForm () {
      this.errors = []
      if (!this.firstName) {
        this.errors.push(this.$t('signUp.errors.firstName'))
        return false
      }
      if (!this.lastName) {
        this.errors.push(this.$t('signUp.errors.lastName'))
        return false
      }
      if (!this.email) {
        this.errors.push(this.$t('signUp.errors.email'))
        return false
      }
      if (!this.validateEmail(this.email)) {
        this.errors.push(this.$t('signUp.errors.emailFormat'))
        return false
      }
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
    signUp () {
      // console.log(this.email)
      const checkForm = this.checkForm()
      if (checkForm) {
        const user = {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
          confirmation: this.confirmation,
        }
        this.$store.dispatch('SIGN_UP', user)
          .then(response => {
            console.log(response)
            if (response.status === 200) {
              this.$toast.open({
                message: this.$t('signUp.success'),
                type: 'info', // success, info, warning, error, default
                // all of other options may go here
                position: 'bottom', // top, bottom, top-right, bottom-right,top-left, bottom-left
                duration: 3000, // Visibility duration in milliseconds
                dismissible: true,
              })
              this.$router.push({ name: 'Home' })
            }
            else if (response.response) {
              // client received an error response (5xx, 4xx)
              this.errors.push(response.response)
            }
            else if (response.request) {
              // client never received a response, or request never left
              this.errors.push(response.request)
            }
            else {
              // anything else
              this.errors.push(response)
            }
          })
      }
      else {
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
    },
  },
  beforeMount () {
    // this.signUpNew()
  }
}
</script>
