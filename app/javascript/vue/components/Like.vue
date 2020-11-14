<template>
  <div :class="['d-flex align-items-center ml-2 text-danger']">
    <div class="p-0 text-decoration-none d-flex align-items-center">
      <div v-if="isAuthenticated" class="mouse-pointer align-items" @click="like">
        <i v-if="liked" class="material-icons md-18 align-icons text-danger">favorite</i>
        <i v-else class="material-icons md-18 align-icons">favorite_border</i>
      </div>
      <router-link v-else to="/login" class="text-body align-items">
        <i class="material-icons md-18 align-icons">favorite_border</i>
      </router-link>
      <span class="text-muted font-weight-lighter ml-1">{{ likes }}</span>
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
  name: 'like',
  props: ['item'],
  data () {
    return {
      likes: this.item.recipe.likes
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'currentUser']),
    user () {
      return this.currentUser
    },
    liked () {
      if (this.isAuthenticated) {
        // console.log(this.user)
        return this.user.likes.filter(like => like.recipe_id === this.item.recipe.id).length > 0
      }
      else return false
    }
  },
  methods: {
    like () {
      if (!this.liked) {
        console.log('like')
        this.likes += 1
        this.$store
          .dispatch('LIKE', { user_id: this.user.id, recipe_id: this.item.recipe.id })
          .then(() => this.$emit('liked', true))
      }
      else {
        console.log('unlike')
        this.likes -= 1
        this.$store.dispatch('UNLIKE', { user_id: this.user.id, recipe_id: this.item.recipe.id })
      }
    },
  },
}
</script>
