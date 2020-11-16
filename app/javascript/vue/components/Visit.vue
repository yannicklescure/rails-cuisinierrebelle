<template>
  <div class="d-flex align-items-center text-body">
    <i class="material-icons md-18 align-items">visibility</i>
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
