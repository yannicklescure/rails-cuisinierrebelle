<template>
  <div>
    <div v-if="isAuthenticated">
      <comment-form
        :item="item"
        :actionAttr="'COMMENT_NEW'"
        :text="null"
        v-on:commentNew="commentNew"
      />
    </div>
    <div v-else>
      <div class="input-group my-3">
        <textarea id="new-user-registration" v-on:click="login" class="form-control" :placeholder="$t('recipe.comments.addPublicComment')" aria-label="With textarea"></textarea>
      </div>
      <div class="input-group my-3">
        <button type="button" class="btn btn-light" :disabled="disabled">{{ $t('commentForm.comment') }}</button>
        <button class="btn btn-light comment-photo-btn cr-p-6 ml-3" :disabled="disabled">
          <i class="material-icons d-flex">add_photo_alternate</i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import CommentForm from './Form.vue'
const CommentForm = () => import('./Form.vue')

export default {
  name: 'CommentNew',
  props: ['item'],
  data () {
    return {
      disabled: true,
      content: null,
    }
  },
  components: {
    CommentForm,
  },
  computed: {
    ...mapGetters([
      'isAuthenticated',
      'currentUser',
    ]),
  },
  methods: {
    commentNew (payload) {
      this.$emit('commentNew', payload)
    },
    comment () {
      console.log('comment')
      const payload = {
        recipe_id: this.item.recipe.id,
        user_id: this.currentUser.id,
        content: this.content,
      }
      this.$store
        .dispatch('COMMENT', payload)
        .then( response => {
          console.log(response)
          if (response.status === 200) {
            this.content = null
            this.disabled = true
          }
        })
    },
    allowPost () {
      if (this.content) this.disabled = false
      else this.disabled = true
    },
    login () {
      this.$router.push({ name: 'Login' })
    },
  },
}
</script>
