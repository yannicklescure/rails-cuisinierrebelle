<template>
  <div>
    <router-link
      :class="['text-body text-decoration-none d-flex align-items-center justify-content-center', { 'flex-column': mobile }, mobile ? 'mr-2' : 'ml-2']"
      :to="'/r/' + item.recipe.slug + '#comments'"
    >
      <i :class="['material-icons', mobile ? 'md-24' : 'md-18']">comment</i>
      <span :class="['text-muted font-weight-lighter small', mobile ? 'align-items' : 'ml-1']">{{ countRecipeComments(item) }}</span>
    </router-link>
  </div>
</template>

<style scoped>
.align-items {
  margin-top: 2px;
}
</style>

<script>
import { isMobile } from 'mobile-device-detect'
import { mapGetters } from 'vuex'

export default {
  name: 'comment',
  props: ['item'],
  computed: {
    ...mapGetters(['countRecipeComments']),
    mobile () {
      return isMobile
    },
  }
}
</script>
