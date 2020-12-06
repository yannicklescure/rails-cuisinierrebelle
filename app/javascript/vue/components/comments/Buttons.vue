<template>
  <div>
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
    <div v-else class="mt-2 d-flex align-items-center">
      <div
        v-on:click="login"
        class="d-flex text-muted mx-2 mouse-pointer"
        data-toggle="tooltip"
        data-placement="bottom"
        :title="$t('comment.like')"
      >
        <span class="material-icons md-16">thumb_up</span>
      </div>
      <div
        v-on:click="login"
        class="d-flex text-muted mx-2 mouse-pointer"
        data-toggle="tooltip"
        data-placement="bottom"
        :title="$t('comment.reply')"
      >
        <span class="material-icons md-16">reply</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
const CommentLike = () => import('../buttons/CommentLike.vue')

export default {
  name: 'CommentButtons',
  props: ['item', 'type'],
  data () {
    return {
      // edit: false,
      // reply: false,
    }
  },
  components: {
    CommentLike,
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'currentUser']),
  },
  methods: {
    login () {
      this.$router.push({ name: 'Login' })
    },
    commentEdit () {
      this.$emit('commentEdit', true)
    },
    commentReply () {
      console.log('reply')
      this.$emit('commentReply', true)
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
  }
}
</script>
