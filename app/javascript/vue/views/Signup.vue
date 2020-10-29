<template>
  <div :style="{ marginTop: navbarHeight + 'px' }">
    <p>Signup</p>
  </div>
</template>

<script>
export default {
  name: 'Signup',
  data () {
    return {
      componentKey: 0,
      navbarHeight: 0,
    }
  },
  methods: {
    getNavbarHeight () {
      return this.$store.getters.navbarHeight
    },
  },
  mounted () {
    this.navbarHeight = this.getNavbarHeight()
  }
}
</script>
