<template>
  <div :style="{ paddingTop: navbarHeight + 'px' }" :key="componentKey">
    <p>Notifications</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Notifications',
  data () {
    return {
      componentKey: 0,
      // navbarHeight: 0,
    }
  },
  computed: {
    ...mapGetters(['navbarHeight', 'currentUser']),
    notifications () {
      return this.currentUser.notifications
    }
  },
  methods: {
    fetchItem () {
      console.log('fetching notifications data')
      this.loading = true
      this.$store
        .dispatch('RECIPE', this.$route.params.id)
        .then( response => {
          console.log(response)
          this.item = response.data
          // if (this.log) {
          //   this.$store
          //     .dispatch('SET_STORE', {})
          //     .then(() => this.log = false)
          // }
          this.componentKey += 1
          this.loading = false
        })
        .finally(() => {
          // this.scroll2Anchor()
        })
    },
  },
  watch: {
    async '$route' () {
      console.log(this.$route.params.id)
      // await this.fetchItem()
    }
  },
  beforeMount () {
    // this.fetchItem()
  },
  mounted () {
    this.$nextTick(() => {})
  },
}
</script>
