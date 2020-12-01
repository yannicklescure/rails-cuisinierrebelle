<template>
  <div :class="['d-flex align-items-center text-danger', mobile ? 'mr-2' : 'ml-2']">
    <div :class="['d-flex align-items-center justify-content-center', { 'flex-column': mobile }]">
      <div v-if="isAuthenticated" class="mouse-pointer btn-like" @click="like">
        <i v-if="liked" :class="['material-icons text-danger', mobile ? 'md-24' : 'md-18']">favorite</i>
        <i v-else :class="['material-icons', mobile ? 'md-24' : 'md-18']">favorite_border</i>
      </div>
      <router-link v-else to="/login" class="text-body btn-like">
        <i :class="['material-icons', mobile ? 'md-24' : 'md-18']">favorite_border</i>
      </router-link>
      <span :class="['text-muted font-weight-lighter small', { 'ml-1': !mobile }]">{{ likes }}</span>
    </div>
  </div>
</template>

<style scoped>
/*.btn-like {
  margin-bottom: -5px;
}*/
</style>

<script>
import { isMobile } from 'mobile-device-detect'
import { mapGetters } from 'vuex'

export default {
  name: 'BtnLike',
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
    },
    mobile () {
      return isMobile
    },
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
