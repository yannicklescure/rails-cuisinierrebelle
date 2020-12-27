<template>
  <div :id="type + item.id" :ref="type + item.id" class="mt-3 mb-2">
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
      <vue-markdown-plus :source="item.content" class="text-break" />
    </div>
    <comment-buttons
      :item="item"
      :type="type"
      v-on:commentEdit="commentEdit"
      v-on:commentReply="commentReply"
    />
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
import VueMarkdownPlus from 'vue-markdown-plus'
import { mapGetters } from 'vuex'
import { isMobile } from 'mobile-device-detect'
// import CommentForm from './Form.vue'
// import CommentLike from '../buttons/CommentLike.vue'
const CommentButtons = () => import('./Buttons.vue')
const CommentForm = () => import('./Form.vue')
// const CommentLike = () => import('../buttons/CommentLike.vue')

export default {
  name: 'Comment',
  props: ['item', 'type', 'lastCommentId'],
  data () {
    return {
      edit: false,
      reply: false,
    }
  },
  components: {
    CommentButtons,
    CommentForm,
    // CommentLike,
    VueMarkdownPlus,
  },
  computed: {
    ...mapGetters([
      'isAuthenticated',
      'currentUser',
      'navbarHeight',
    ]),
    mobile () {
      return isMobile
    },
  },
  methods: {
    commentEdit (value) {
      this.edit = value
    },
    commentReply (value) {
      // console.log('reply')
      this.reply = value
    },
    editActionAttr () {
      if (this.item.commentId) return 'REPLY_EDIT'
      else return 'COMMENT_EDIT'
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
    },
    scroll2Anchor () {
      // const currentPage = this.$route.fullpath
      const target = this.$route.hash
      if(target) {
        console.log(this.$refs)
        console.log(this.$route)
        console.log(target)
        console.log(target.match(/(?:#)(.+)/)[1])
        let element = this.$refs[target.match(/(?:#)(.+)/)[1]]
        // let element = this.$el.querySelector(target)
        // let element = this.$el
        // if (target.match(/(?:#)(.+)/)[1] === 'comments') element = this.$refs.comments
        console.log(element)
        if (element) {
          const scrollOptions = {
            top: element.offsetTop - this.navbarHeight,
            left: 0,
            behavior: 'smooth'
          };
          window.scrollTo(scrollOptions)
          window.history.pushState("object or string", "Title", this.$route.path)
        }
      }
    },
  },
  mounted () {
    console.log(`${this.type} ${this.item.id}`)
    if (this.$route.hash && this.item.id === parseInt(this.$route.hash.match(/(?:#comment|#reply?)(.+)/)[1])) this.scroll2Anchor()
    // if (this.type === 'comment' && this.item.id === this.lastCommentId) {
    //   console.log('all comments mounted')
    //   console.log(this.$route)
    //   this.$emit('lastCommentMounted', true)
    // }
  }
}
</script>
