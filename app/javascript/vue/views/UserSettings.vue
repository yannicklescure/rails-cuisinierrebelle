<template>
  <div :style="{ paddingTop: navbarHeight + 'px' }">
    <p>UserSettings</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'UserSettings',
  data () {
    return {
      componentKey: 0,
      // navbarHeight: 0,
    }
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
