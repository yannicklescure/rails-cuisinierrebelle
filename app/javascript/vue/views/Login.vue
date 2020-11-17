<template>
  <div class="container">
    <div class="d-flex vh-100 justify-content-center align-items-center">
      <div class="d-flex flex-column w-md-50">
        <div v-if="error" class="alert alert-warning alert-dismissible fade show" role="alert">
          <strong>Saperlipopette !</strong> {{ error }}
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form>
          <div class="form-group my-2">
            <label for="inputEmail">{{ $t('login.email') }}</label>
            <input v-model="email" type="email" class="form-control" id="inputEmail" aria-describedby="emailHelp">
            <small id="emailHelp" class="form-text text-muted">{{ $t('login.disclaimer') }}</small>
          </div>
          <div class="form-group my-2">
            <label for="inputPassword">{{ $t('login.password') }}</label>
            <input v-model="password" type="password" class="form-control" id="inputPassword">
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
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      error: '',
    }
  },
  // components: {
  //   // Navbar
  // },
  methods: {
    login () {
      console.log(this.email)
      const user = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('LOG_IN', user)
        .then(result => {
          console.log(result)
          if (result.status === 200) this.$router.push({ name: 'Home' })
          else if (result.response) {
            // client received an error response (5xx, 4xx)
            this.error = result.status
          }
          else if (result.request) {
            // client never received a response, or request never left
            this.error = result.status
          }
          else {
            // anything else
            this.error = result.status
          }
        })
    },
  },
}
</script>
