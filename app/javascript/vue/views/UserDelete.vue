<template>
  <div
    :style="{ paddingTop: navbarHeight + 'px' }"
    class="container"
    :key="componentKey"
    v-if="!loading"
  >
    <h1>{{ $t('userDelete.title') }}</h1>
    <p>Désolé de vous voir partir!</p>
    <p>Si vous rencontrez un problème sur Cuisinier Rebelle, pensez à <a href="mailto:contact@cuisinierrebelle.com">nous contacter</a> à ce sujet avant de supprimer votre compte.</p>
    <p>La suppression de votre compte supprimera le contenu des publications et des commentaires que vous avez faits sur Cuisinier Rebelle.</p>
    <form>
      <div class="form-group mb-3">
        <label for="inputPageContent">POURQUOI SUPPRIMEZ-VOUS CE COMPTE? (OPTIONNEL)</label>
        <textarea v-model="content" :maxlength="max" class="form-control" id="inputPageContent" rows="5"></textarea>
        <small id="contentHelpBlock" class="form-text text-muted">
          {{ $tc('page.new.contentHelp', (max - content.length)) }}
        </small>
      </div>
      <div class="form-group mb-3">
        <label for="inputEmail">{{ $t('userDelete.email') }}</label>
        <input v-on:input="checkForm" v-model="email" type="email" class="form-control" id="inputEmail" aria-describedby="emailHelp">
      </div>
      <div class="form-group mb-3">
        <input v-on:change="checkForm" type="checkbox" id="checkbox" v-model="checked">
        <label for="checkbox">Je comprends que les comptes supprimés ne sont pas récupérables.</label>
      </div>
      <div class="form-group mb-3">
        <button v-on:click.stop.prevent="deleteAccount" type="submit" class="btn btn-dark" :disabled="disabled">{{ $t('userDelete.submit') }}</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
const UserNotifications = () => import('../components/UserNotifications.vue')

export default {
  name: 'UserDelete',
  data () {
    return {
      componentKey: 0,
      errors: [],
      loading: true,
      checked: false,
      disabled: true,
      email: '',
      content: '',
      max: 1000,
      // navbarHeight: 0,
    }
  },
  components: {
    UserNotifications,
  },
  methods: {
    checkForm () {
      console.log(`checked ${!this.checked}`)
      // console.log(this.email)
      // console.log(this.currentUser.email)
      console.log(this.checked && (this.email === this.currentUser.email))
      if (this.checked === true && (this.email === this.currentUser.email)) {
        this.disabled = false
        return true
      }
      else {
        this.disabled = true
        return false
      }
    },
    logout () {
      this.$store.dispatch('LOG_OUT', {})
        .then(response => {
          console.log(response)
          if (response.status === 204 && this.$route.name != 'Home') this.$router.push({ name: 'Home' })
        })
    },
    deleteAccount () {
      const checkForm = this.checkForm()
      if (checkForm) {
        const payload = {
          content: this.content,
        }
        this.$store.dispatch('USER_DELETE', payload)
          .then(response => {
            console.log(response)
            if (response.status === 200) {
              this.$toast.open({
                message: this.$t('userDelete.success'),
                type: 'info', // success, info, warning, error, default
                // all of other options may go here
                position: 'bottom', // top, bottom, top-right, bottom-right,top-left, bottom-left
                duration: 3000, // Visibility duration in milliseconds
                dismissible: true,
              })
              // this.$router.push({ name: 'Home' })
              this.logout()
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
    }
  },
  computed: {
    ...mapGetters(['navbarHeight', 'currentUser']),
  },
  beforeMount () {
    if (this.$route.params.id === this.currentUser.slug) this.loading = false
    else {
      console.log('ALERT')
      this.$router.push({
        name: 'Home'
      })
    }
  },
  mounted () {
    // this.navbarHeight = this.getNavbarHeight()
  }
}
</script>
