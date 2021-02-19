<template>
  <div class="d-flex align-items-center text-muted mx-2 mouse-pointer">
    <span v-if="isUserLiked" @click="unlike" :class="['material-icons md-16 text-primary']">thumb_up</span>
    <span
      v-else @click="like"
      :class="['material-icons md-16']"
      data-toggle="tooltip"
      data-placement="bottom"
      :title="$t('comments.like')"
    >thumb_up</span>
    <span v-if="item.likes > 0" :class="['font-weight-lighter small ml-1']">{{ item.likes }}</span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { isMobile } from 'mobile-device-detect'

export default {
  name: 'CommentLike',
  props: ['item', 'type'],
  computed: {
    ...mapGetters([
      'isAuthenticated',
      'currentUser',
    ]),
    mobile () {
      return isMobile
    },
    isUserLiked () {
      if (this.isAuthenticated) {
        let like = []
        if (this.type === 'comment') like = this.currentUser.commentLikes.filter(r => r === this.item.id)
        if (this.type === 'reply') like = this.currentUser.replyLikes.filter(r => r === this.item.id)
        return like.length > 0
      }
      else return false
    },
  },
  methods: {
    like () {
      if (this.type === 'comment') {
        const payload = {
          comment_id: this.item.id,
          recipe_id: this.item.recipe.id
        }
        console.log(payload)
        this.$store
          .dispatch('COMMENT_LIKE', payload)
      }
      if (this.type === 'reply') {
        const payload = {
          reply_id: this.item.id,
          comment_id: this.item.commentId,
          recipe_id: this.item.recipeId
        }
        console.log(payload)
        this.$store
          .dispatch('REPLY_LIKE', payload)
      }
    },
    unlike () {
      if (this.type === 'comment') {
        const payload = {
          comment_id: this.item.id,
          recipe_id: this.item.recipe.id
        }
        console.log(payload)
        this.$store
          .dispatch('COMMENT_UNLIKE', payload)
      }
      if (this.type === 'reply') {
        const payload = {
          reply_id: this.item.id,
          comment_id: this.item.commentId,
          recipe_id: this.item.recipeId
        }
        console.log(payload)
        this.$store
          .dispatch('REPLY_UNLIKE', payload)
      }
    },
  },
}
</script>
