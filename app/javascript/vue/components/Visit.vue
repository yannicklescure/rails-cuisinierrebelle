<template>
  <div class="d-flex align-items-center text-body">
    <i :class="['material-icons align-items', mobile ? 'md-32' : 'md-18']">visibility</i>
    <span class="text-muted font-weight-lighter ml-1">{{ views }}</span>
  </div>
</template>

<style scoped>
.align-items {
  margin-bottom: 2px;
}
</style>

<script>
// import { mapGetters } from 'vuex'
import { isMobile } from 'mobile-device-detect'

export default {
  name: 'Visit',
  props: ['item'],
  data () {
    return {
      views: 0,
    }
  },
  computed: {
    // ...mapGetters(['isAuthenticated', 'user']),
    mobile () {
      return isMobile
    },
  },
  methods: {
    recipeLog () {
      this.$store
        .dispatch('RECIPE_LOG', this.item)
        .then(response => {
          console.log(response)
          this.views = response.data.views
        })
    },
  },
  beforeMount () {
    // this.recipeLog()
  },
  updated () {
    // this.recipeLog()
  }
}
</script>
