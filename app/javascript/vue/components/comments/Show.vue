<template>
  <div :id="'comment' + item.id" class="mt-3 mb-2">
    <div class="d-flex align-items-center">
      <img
        :src="item.user.image.thumb.url"
        :alt="item.user.name"
        width="24"
        height="24"
        class="rounded-circle"
      >
      <router-link
        :to="`/u/${ item.user.slug }`"
        class="mx-2 text-capitalize text-body"
        style="font-size: 90%"
      >{{ item.user.name }}</router-link>
      <small class="text-muted">{{ timeAgo(item.timestamp) }}</small>
    </div>
    <div v-if="edit">
      <comment-form
        :item="item"
        :actionAttr="editActionAttr()"
        :text="item.content"
        v-on:commentEditResponse="commentEditResponse"
        v-on:commentDrop="commentDrop"
      />
    </div>
    <div v-else class="mt-2 bg-light rounded p-3">
      <vue-markdown :source="item.content" class="text-break" />
    </div>
    <div v-if="isAuthenticated" class="mt-2 d-flex align-items-center">
      <comment-like :item="item" :type="type" />
      <div v-if="item.user.id === currentUser.id" v-on:click="commentEdit" class="d-flex text-muted mx-2 mouse-pointer">
        <span class="material-icons md-16">edit</span>
      </div>
      <div v-if="item.user.id === currentUser.id" v-on:click="commentDestroy" class="d-flex text-muted mx-2 mouse-pointer">
        <span class="material-icons md-16">delete</span>
      </div>
      <div v-on:click="commentReply" class="d-flex text-muted mx-2 mouse-pointer">
        <span class="material-icons md-16">reply</span>
      </div>
    </div>
    <div v-if="reply">
      <comment-form
        :item="item"
        :actionAttr="'REPLY_NEW'"
        :text="null"
        v-on:commentReplyNew="commentReplyNew"
        v-on:commentDrop="commentDrop"
      />
    </div>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import { mapGetters } from 'vuex'
import CommentForm from './Form.vue'
import CommentLike from '../buttons/CommentLike.vue'
import { isMobile } from 'mobile-device-detect'

export default {
  name: 'Comment',
  props: ['item', 'type'],
  data () {
    return {
      edit: false,
      reply: false,
    }
  },
  components: {
    CommentForm,
    CommentLike,
    VueMarkdown,
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'currentUser']),
    mobile () {
      return isMobile
    },
  },
  methods: {
    editActionAttr () {
      if (this.item.commentId) return 'REPLY_EDIT'
      else return 'COMMENT_EDIT'
    },
    commentReply () {
      console.log('reply')
      this.reply = true
    },
    commentEdit () {
      this.edit = true
    },
    commentDrop () {
      this.edit = false
      this.reply = false
      return false
    },
    commentReplyNew (payload) {
      console.log(payload)
      this.$emit('commentReplyNew', payload)
      this.reply = false
      // this.item.content = value.data.content
    },
    commentEditResponse (payload) {
      this.edit = false
      if (this.item.commentId) {
        console.log(payload)
        console.log(this.item)
        // reply id : this.item.id
        // reply content : this.item.content
        // reply comment : this.item.commentId
        const reply = payload.data.replies.filter(r => r.id === this.item.id)[0]
        this.item.content = reply.content
      }
      else {
        this.item.content = payload.data.content
      }
    },
    commentDestroy () {
      let actionAttr = ''
      let payload = {}
      if (this.type === 'comment') {
        // console.log(`delete comment ${ this.item.id }`)
        payload = {
          comment_id: this.item.id,
          recipe_id: this.item.recipe.id,
          type: this.type,
        }
        actionAttr = 'COMMENT_DELETE'
      }
      if (this.type === 'reply') {
        // console.log(`delete comment ${ this.item.id }`)
        payload = {
          comment_id: this.item.commentId,
          recipe_id: this.item.recipeId,
          id: this.item.id,
          type: this.type,
        }
        actionAttr = 'REPLY_DELETE'
      }
      this.$store
        .dispatch(actionAttr, payload)
        .then( response => {
          console.log(response)
          if (response.status === 204) {
            this.$emit('commentDestroyed', payload)
          }
        })
    },
    timeAgo (time) {
      const between = Math.trunc((new Date().getTime() - time) / 1000)
      if (between < 3600) {
        return this.$tc('comment.minutes', Math.trunc(between / 60))
      } else if (between < 86400) {
        return this.$tc('comment.hours', Math.trunc(between / 3600))
      } else if (between < 2592000) {
        return this.$tc('comment.days', Math.trunc(between / 86400))
      } else if (between < 31104000) {
        return this.$tc('comment.months', Math.trunc(between / 2592000))
      } else {
        return this.$tc('comment.years', Math.trunc(between / 311004000))
      }
    }
  },
}
</script>
