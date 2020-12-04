<template>
  <div :id="'comment' + item.id" :ref="type + item.id" class="mt-3 mb-2">
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
      <div
        v-if="item.user.id === currentUser.id"
        v-on:click="commentEdit"
        class="d-flex text-muted mx-2 mouse-pointer"
        data-toggle="tooltip"
        data-placement="bottom"
        :title="$t('comment.edit')"
      >
        <span class="material-icons md-16">edit</span>
      </div>
      <div
        v-if="item.user.id === currentUser.id"
        v-on:click="isComment2Destroy"
        class="d-flex text-muted mx-2 mouse-pointer"
        data-toggle="tooltip"
        data-placement="bottom"
        :title="$t('comment.destroy')"
      >
        <span class="material-icons md-16">delete</span>
      </div>
      <div
        v-on:click="commentReply"
        class="d-flex text-muted mx-2 mouse-pointer"
        data-toggle="tooltip"
        data-placement="bottom"
        :title="$t('comment.reply')"
      >
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
import { isMobile } from 'mobile-device-detect'
// import CommentForm from './Form.vue'
// import CommentLike from '../buttons/CommentLike.vue'
const CommentForm = () => import('./Form.vue')
const CommentLike = () => import('../buttons/CommentLike.vue')

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
    CommentForm,
    CommentLike,
    VueMarkdown,
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'currentUser', 'navbarHeight']),
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
    isComment2Destroy () {
      let message = this.$t('comment.are_you_sure')

      let options = {
          // html: false, // set to true if your message contains HTML tags. eg: "Delete <b>Foo</b> ?"
          // loader: false, // set to true if you want the dailog to show a loader after click on "proceed"
          // reverse: false, // switch the button positions (left to right, and vise versa)
          okText:  this.$t('comment.destroy'),
          cancelText: this.$t('comment.cancel'),
          // animation: 'zoom', // Available: "zoom", "bounce", "fade"
          // type: 'basic', // coming soon: 'soft', 'hard'
          // verification: 'continue', // for hard confirm, user will be prompted to type this to enable the proceed button
          // verificationHelp: 'Type "[+:verification]" below to confirm', // Verification help text. [+:verification] will be matched with 'options.verification' (i.e 'Type "continue" below to confirm')
          // clicksCount: 3, // for soft confirm, user will be asked to click on "proceed" btn 3 times before actually proceeding
          backdropClose: true, // set to true to close the dialog when clicking outside of the dialog window, i.e. click landing on the mask
          customClass: '' // Custom class to be injected into the parent node for the current dialog instance
      };

      this.$dialog
        .confirm(message, options)
        .then(dialog => {
          console.log('Clicked on proceed')
          console.log(dialog)
          this.commentDestroy()
        })
        .catch(() => {
          console.log('Clicked on cancel')
        });
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
    if (this.$route.hash && this.item.id === parseInt(this.$route.hash.match(/(?:#comment)(.+)/)[1])) this.scroll2Anchor()
    // if (this.type === 'comment' && this.item.id === this.lastCommentId) {
    //   console.log('all comments mounted')
    //   console.log(this.$route)
    //   this.$emit('lastCommentMounted', true)
    // }
  }
}
</script>
