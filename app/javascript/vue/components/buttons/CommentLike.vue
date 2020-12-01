<template>
  <div class="d-flex align-items-center text-muted mx-2">
    <span :class="['material-icons md-16', { 'text-primary': isUserLiked }]">thumb_up</span>
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
    ...mapGetters(['isAuthenticated', 'currentUser']),
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
  methods: {},
}
</script>
