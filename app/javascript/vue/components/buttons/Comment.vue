<template>
  <div>
    <router-link
      :class="['text-body text-decoration-none d-flex align-items-center justify-content-center', { 'flex-column': mobile }, mobile ? 'mr-2' : 'ml-2']"
      :to="'/r/' + item.recipe.slug + '#comments'"
    >
      <i :class="['material-icons', mobile ? 'md-24' : 'md-18']">comment</i>
      <span :class="['text-muted font-weight-lighter small', mobile ? 'btn-comment' : 'ml-1']">{{ countRecipeComments(item) }}</span>
    </router-link>
  </div>
</template>

<script>
import { isMobile } from 'mobile-device-detect'
import { mapGetters } from 'vuex'

export default {
  name: 'BtnComment',
  props: ['item'],
  computed: {
    ...mapGetters([
      'countRecipeComments',
    ]),
    mobile () {
      return isMobile
    },
  }
}
</script>
