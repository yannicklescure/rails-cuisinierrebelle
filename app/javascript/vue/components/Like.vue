<template>
  <div :class="['d-flex align-items-center ml-2']">
    <div class="p-0 text-decoration-none d-flex align-items-center">
      <div v-if="isAuthenticated" class="mb-n1 mouse-pointer" @click="like">
        <i v-if="liked" class="material-icons md-18 align-icons text-danger">favorite</i>
        <i v-else class="material-icons md-18 align-icons">favorite_border</i>
      </div>
      <router-link v-else to="/login" class="mb-n1 text-body">
        <i class="material-icons md-18 align-icons">favorite_border</i>
      </router-link>
      <span class="text-muted font-weight-lighter ml-1">{{ item.recipe.likesCount }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'like',
  props: ['item'],
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'user']),
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
        this.$store.dispatch('LIKE', { user_id: this.user.id, recipe_id: this.item.recipe.id })
      }
      else {
        console.log('unlike')
        this.$store.dispatch('UNLIKE', { user_id: this.user.id, recipe_id: this.item.recipe.id })
      }
    },
  },
}
</script>
