<template>
  <div :style="{ paddingTop: navbarHeight + 'px' }" class="container d-flex vh-100">
    <div class="d-flex flex-grow-1 justify-content-center align-items-center">
      <div class="d-flex flex-column w-md-50">
        <form>
          <div class="form-group my-2">
            <label for="inputEmail">{{ $t('login.email') }}</label>
            <input v-model="email" type="email" class="form-control" id="inputEmail" aria-describedby="emailHelp">
            <small id="emailHelp" class="form-text text-muted">{{ $t('login.disclaimer') }}</small>
          </div>
          <label for="inputPassword">{{ $t('signUp.password') }}</label>
          <div class="input-group mb-3">
            <input v-model="password" ref="password" type="password" class="form-control" aria-describedby="button-password">
            <div class="input-group-append">
              <button v-on:click="showPassword" class="btn btn-outline-form" type="button" id="button-password">
                <i ref="passwordIcon" class="material-icons md-18 d-flex">visibility_off</i>
              </button>
            </div>
          </div>
          <button v-on:click.stop.prevent="login" type="submit" class="btn btn-dark my-2">{{ $t('login.submit') }}</button>
        </form>
        <div class="my-3">
          <router-link to="/signup">{{ $t('login.signup') }}</router-link>
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
  name: 'Login',
  data () {
    return {
      email: null,
      password: null,
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
    showPassword () {
      if (this.$refs.password.type === "text") {
        this.$refs.password.type = "password"
        this.$refs.passwordIcon.innerText = "visibility_off"
      }
      else {
        this.$refs.password.type = "text"
        this.$refs.passwordIcon.innerText = "visibility"
        setTimeout(() => {
          this.showPassword()
        }, 3000)
      }
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
      if (!this.password) {
        this.errors.push(this.$t('signUp.errors.password'))
        return false
      }
      if (this.password.split('').length < 3) {
        this.errors.push(this.$t('signUp.errors.passwordLength'))
        return false
      }
      // if (this.password != this.confirmation) {
      //   this.errors.push(this.$t('signUp.errors.confirmation'))
      //   return false
      // }
      return true
    },
    login () {
      const checkForm = this.checkForm()
      if (checkForm) {
        console.log(this.email)
        const user = {
          email: this.email,
          password: this.password
        }
        this.$store.dispatch('LOG_IN', user)
          .then(result => {
            console.log(result)
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
