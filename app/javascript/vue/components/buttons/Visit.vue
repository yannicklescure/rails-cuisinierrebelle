<template>
  <div :class="['text-body d-flex align-items-center justify-content-center', { 'flex-column': mobile }]">
    <i :class="['material-icons btn-visit', mobile ? 'md-24' : 'md-18']">visibility</i>
    <span :class="['text-muted font-weight-lighter small', { 'ml-1': !mobile }]">{{ views }}</span>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import { isMobile } from 'mobile-device-detect'

export default {
  name: 'BtnVisit',
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
