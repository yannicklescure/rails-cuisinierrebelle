<template>
  <div
    :style="{ paddingTop: navbarHeight + 'px' }"
    class="container"
    :key="componentKey"
    v-if="!loading"
  >
    <h1>{{ $t('userSettings.title') }}</h1>
    <div class="mb-3">
      <user-notifications />
    </div>
    <router-link :to="`/u/${currentUser.slug}/delete`">{{ $t('userSettings.deleteAccount') }}</router-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
const UserNotifications = () => import('../components/UserNotifications.vue')

export default {
  name: 'UserSettings',
  data () {
    return {
      componentKey: 0,
      loading: true,
      // navbarHeight: 0,
    }
  },
  components: {
    UserNotifications,
  },
  methods: {
    // getNavbarHeight () {
    //   return this.$store.getters.navbarHeight
    // },
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
