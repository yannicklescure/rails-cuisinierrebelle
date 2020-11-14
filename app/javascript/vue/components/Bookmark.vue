<template>
  <div :class="['d-flex align-items-center ml-2 text-body']">
    <div class="p-0 text-decoration-none d-flex align-items-center">
      <div v-if="isAuthenticated" class="mouse-pointer align-items" @click="bookmark">
        <i v-if="bookmarked" class="material-icons md-18 text-body">bookmark</i>
        <i v-else class="material-icons md-18">bookmark_border</i>
      </div>
      <router-link v-else to="/login" class="text-body align-items">
        <i class="material-icons md-18">bookmark_border</i>
      </router-link>
      <span class="text-muted font-weight-lighter ml-1">{{ bookmarks }}</span>
    </div>
  </div>
</template>

<style scoped>
.align-items {
  margin-bottom: -5px;
}
</style>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'bookmark',
  props: ['item'],
  data () {
    return {
      bookmarks: this.item.recipe.bookmarks
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'currentUser']),
    user () {
      return this.currentUser
    },
    bookmarked () {
      if (this.isAuthenticated) {
        // console.log(this.user)
        return this.user.bookmarks.filter(bookmark => bookmark.recipe_id === this.item.recipe.id).length > 0
      }
      else return false
    }
  },
  methods: {
    bookmark () {
      if (!this.bookmarked) {
        console.log('bookmark')
        this.bookmarks += 1
        this.$store
          .dispatch('BOOKMARK', { user_id: this.user.id, recipe_id: this.item.recipe.id, created_at: new Date().getTime() })
          .then(() => this.$emit('bookmarked', true))
      }
      else {
        console.log('unbookmark')
        this.bookmarks -= 1
        this.$store.dispatch('UNBOOKMARK', { user_id: this.user.id, recipe_id: this.item.recipe.id })
      }
    },
  },
}
</script>
