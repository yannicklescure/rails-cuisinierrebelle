<template>
  <div class="d-flex align-items-center text-body">
    <i class="material-icons md-18 align-items">visibility</i>
    <span class="text-muted font-weight-lighter ml-1">{{ item.recipe.views }}</span>
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
    return {}
  },
  computed: {
    // ...mapGetters(['isAuthenticated', 'user']),
  },
  methods: {
  },
}
</script>
