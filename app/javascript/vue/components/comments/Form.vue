<template>
  <div>
    <form @submit.prevent="submit">
      <div class="input-group my-3">
        <textarea
          id="new-user-registration"
          class="form-control"
          v-on:input="allowPost"
          v-model="content"
          :placeholder="$t('recipe.comments.addPublicComment')"
          aria-label="With textarea"
        ></textarea>
      </div>
      <div class="input-group my-3">
        <button v-on:click.stop.prevent="comment" class="btn btn-light" type="submit" :disabled="disabled">{{ $t('commentForm.comment') }}</button>
        <button class="d-none btn btn-light comment-photo-btn cr-p-6 ml-3">
          <i class="material-icons d-flex">add_photo_alternate</i>
        </button>
        <button v-if="isEdit || isReply" v-on:click="commentEditDrop" type="button" class="btn btn-light ml-3">{{ $t('commentForm.cancel') }}</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CommentForm',
  props: ['item', 'actionAttr', 'text'],
  data () {
    return {
      disabled: true,
      content: this.text,
    }
  },
  // components: {
  //   Follow,
  // },
  computed: {
    ...mapGetters([
      'isAuthenticated',
      'currentUser'
    ]),
    isEdit () {
      return this.actionAttr === 'COMMENT_EDIT'
    },
    isReply () {
      return this.actionAttr === 'REPLY_NEW'
    },
    isComment () {
      return this.actionAttr === 'COMMENT_NEW'
    },
  },
  methods: {
    commentEditDrop () {
      this.$emit('commentDrop', true)
    },
    comment () {
      const payload = {
        recipe_id: this.item.recipeId ? this.item.recipeId : this.item.recipe.id,
        user_id: this.currentUser.id,
        content: this.content,
      }

      if (this.actionAttr === 'COMMENT_EDIT') {
        payload.id = this.item.id
      }

      if (this.actionAttr === 'REPLY_EDIT') {
        payload.id = this.item.id
        payload.comment_id = this.item.commentId
      }

      if (this.actionAttr === 'REPLY_NEW') {
        payload.comment_id = this.item.commentId ? this.item.commentId : this.item.id
      }

      console.log(this.actionAttr)
      console.log(payload)

      this.$store
        .dispatch(this.actionAttr, payload)
        .then( response => {
          console.log(response)
          if (response.status === 200) {
            if (this.actionAttr === 'REPLY_NEW') {
              this.$emit('commentReplyNew', response)
            }
            if ((/.+_EDIT/).test(this.actionAttr)) {
              this.$emit('commentEditResponse', response)
            }
            if (this.actionAttr === 'COMMENT_NEW') {
              this.$emit('commentNew', response)
              this.content = null
              this.disabled = true
            }
          }
        })
    },
    allowPost () {
      if (this.content) this.disabled = false
      else this.disabled = true
    },
  },
}
</script>
