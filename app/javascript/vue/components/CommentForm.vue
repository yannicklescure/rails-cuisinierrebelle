<template>
  <div>
    <div v-if="isAuthenticated"></div>
    <div v-else>
      <div class="input-group my-3">
        <textarea id="new-user-registration" v-on:click="login" class="form-control" :placeholder="$t('recipe.comments.addPublicComment')" aria-label="With textarea"></textarea>
      </div>
      <div class="input-group my-3">
        <button class="btn btn-light" type="button" :disabled="disabled">{{ $t('commentForm.comment') }}</button>
        <button class="btn btn-light comment-photo-btn cr-p-6 ml-3" :disabled="disabled">
          <i class="material-icons d-flex">add_photo_alternate</i>
        </button>
      </div>
    </div>
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
  // props: ['user'],
  data () {
    return {
      disabled: true,
    }
  },
  // components: {
  //   Follow,
  // },
  computed: {
    ...mapGetters(['isAuthenticated']),
  },
  methods: {
    login () {
      this.$router.push({ name: 'Login' })
    },
  },
}
</script>
