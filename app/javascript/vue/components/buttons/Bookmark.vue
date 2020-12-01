<template>
  <div :class="['d-flex align-items-center ml-2 text-body']">
    <div :class="['d-flex align-items-center justify-content-center', { 'flex-column': mobile }]">
      <div v-if="isAuthenticated" class="mouse-pointer btn-bookmark" @click="bookmark">
        <i v-if="bookmarked" :class="['material-icons text-body', mobile ? 'md-24' : 'md-18']">bookmark</i>
        <i v-else :class="['material-icons', mobile ? 'md-24' : 'md-18']">bookmark_border</i>
      </div>
      <router-link v-else to="/login" class="text-body btn-bookmark">
        <i :class="['material-icons', mobile ? 'md-24' : 'md-18']">bookmark_border</i>
      </router-link>
      <span :class="['text-muted font-weight-lighter small', { 'ml-1': !mobile }]">{{ bookmarks }}</span>
    </div>
  </div>
</template>

<script>
import { isMobile } from 'mobile-device-detect'
import { mapGetters } from 'vuex'

export default {
  name: 'BtnBookmark',
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
    },
    mobile () {
      return isMobile
    },
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
