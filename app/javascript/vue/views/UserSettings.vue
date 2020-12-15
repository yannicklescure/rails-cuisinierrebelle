<template>
  <div
    :style="{ paddingTop: navbarHeight + 'px' }"
    class="container"
    :key="componentKey"
  >
    <h1>{{ $t('userSettings.title') }}</h1>
    <user-notifications />
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
    ...mapGetters(['navbarHeight']),
  },
  mounted () {
    // this.navbarHeight = this.getNavbarHeight()
  }
}
</script>
