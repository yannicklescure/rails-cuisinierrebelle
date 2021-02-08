<template>
  <div :style="{ paddingTop: navbarHeight + 'px' }" class="container d-flex cr-vh100">
    <div class="d-flex flex-grow-1 justify-content-center align-items-center">
      <div class="d-flex flex-column align-items-center w-md-50">
        <div class="my-3">
          <facebook-login v-on:isConnecting="isConnecting"/>
        </div>
        <div v-if="!connecting">
          <form>
            <div class="form-group my-2">
              <label for="inputEmail">{{ $t('login.email') }}</label>
              <input v-model="email" type="email" class="form-control" id="inputEmail" aria-describedby="emailHelp">
              <small id="emailHelp" class="form-text text-muted">{{ $t('login.disclaimer') }}</small>
            </div>
            <label for="inputPassword">{{ $t('signUp.password') }}</label>
            <div class="input-group mb-3">
              <input v-model="password" v-on:input="allowPost" v-on:touchend="allowPost" ref="password" type="password" class="form-control" aria-describedby="button-password">
              <div class="input-group-append">
                <button v-on:click="showPassword" class="btn btn-outline-form" type="button" id="button-password">
                  <i ref="passwordIcon" class="material-icons md-18 d-flex">visibility_off</i>
                </button>
              </div>
            </div>
            <div class="d-flex justify-content-end">
              <button
                @click.stop.prevent="login"
                type="submit"
                class="btn btn-dark my-2 w-100"
                :disabled="disabled"
              >{{ $t('login.submit') }}</button>
            </div>
          </form>
          <div class="my-3 d-flex flex-column justify-content-center align-items-center">
            <button
              v-if="error"
              @click.stop.prevent="resendConfirmationInstructions"
              class="btn btn-link"
            >{{ $t('login.password.request.resendConfirmationInstructions') }}</button>
            <router-link to="/users/password/new">{{ $t('login.forgetPassword') }}</router-link>
            <router-link to="/signup">{{ $t('login.signup') }}</router-link>
            <p></p>
          </div>
        </div>
      </div>
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
const FacebookLogin = () => import('../components/buttons/Facebook.vue')

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export default {
  name: 'Login',
  data () {
    return {
      connecting: false,
      disabled: true,
      email: null,
      password: null,
      errors: [],
      error: false,
    }
  },
  components: {
    FacebookLogin,
  },
  computed: {
    ...mapGetters([
      'navbarHeight',
    ]),
  },
  methods: {
    isConnecting (value) {
      this.connecting = value
    },
    allowPost () {
      if (this.email && this.password) this.disabled = false
      else this.disabled = true
    },
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
    resendConfirmationInstructions () {
      this.errors = []
      if (!this.email) {
        this.errors.push(this.$t('signUp.errors.email'))
      }
      if (!this.validateEmail(this.email)) {
        this.errors.push(this.$t('signUp.errors.emailFormat'))
      }
      if (this.errors.length > 0) {
        this.error = true
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
      else {
        const payload = {
          user: {
            email: this.email,
            // password: this.password
          }
        }
        this.$store.dispatch('RESEND_CONFIRMATION_INSTRUCTIONS', payload)
          .then(result => {
            console.log(result)
            if (result.status === 200) {
              console.log(capitalize(result.data.first_name))
              this.$toast.open({
                message: this.$t('login.resendConfirmationInstructions', { email: result.data.email }),
                type: 'success', // success, info, warning, error, default
                // all of other options may go here
                position: 'bottom', // top, bottom, top-right, bottom-right,top-left, bottom-left
                duration: 3000, // Visibility duration in milliseconds
                dismissible: true,
              })
              this.email = null
              this.password = null
              this.$router.push({ name: 'Recipes' })
            }
            else {
              this.errors.push(result.data.error)
            }
          })
          .then(() => {
            if (this.errors.length > 0) {
              this.error = true
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
    },
    login () {
      const checkForm = this.checkForm()
      if (checkForm) {
        console.log(this.email)
        const payload = {
          user: {
            email: this.email,
            password: this.password
          }
        }
        this.$store.dispatch('LOG_IN', payload)
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
              this.email = null
              this.password = null
              this.$router.push({ name: 'Recipes' })
            }
            else {
              this.errors.push(result.data.error)
            }
          })
          .then(() => {
            if (this.errors.length > 0) {
              this.error = true
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
