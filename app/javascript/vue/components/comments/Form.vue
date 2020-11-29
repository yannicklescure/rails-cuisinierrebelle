<template>
  <div>
    <form>
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
        <button class="btn btn-light comment-photo-btn cr-p-6 ml-3" :disabled="disabled">
          <i class="material-icons d-flex">add_photo_alternate</i>
        </button>
        <button v-if="actionAttr === 'COMMENT_EDIT'" v-on:click="commentEditDrop" class="btn btn-light ml-3">{{ $t('commentForm.cancel') }}</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.cr-p-6 {
  padding: 6px;
}
</style>

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
    ...mapGetters(['isAuthenticated', 'currentUser']),
  },
  methods: {
    commentEditDrop () {
      this.$emit('commentEditDrop', true)
    },
    comment () {
      const payload = {
        recipe_id: this.item.recipe.id,
        user_id: this.currentUser.id,
        content: this.content,
      }

      if (this.actionAttr === 'COMMENT_EDIT') {
        payload.id = this.item.id
      }

      this.$store
        .dispatch(this.actionAttr, payload)
        .then( response => {
          console.log(response)
          if (response.status === 200) {
            if (this.actionAttr === 'COMMENT_EDIT') {
              this.$emit('commentEditResponse', response)
            }
            if (this.actionAttr === 'COMMENT_NEW') {
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
