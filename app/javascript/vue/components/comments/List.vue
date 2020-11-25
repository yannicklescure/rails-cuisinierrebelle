<template>
  <div id="comments" ref="comments" class="d-print-none mt-5">
    <div class="h4 mb-3">{{ $tc('recipe.comments.counts', countRecipeComments(item)) }}</div>
    <comment-form :item="item" />
    <div v-for="comment, i in comments" class="d-flex flex-column">
      <user-comment :item="comment" :key="'c' + i" />
      <div
        v-if="comment.replies.length"
        v-on:click="showReplies(i)"
        class="d-flex mouse-pointer"
        style="font-size: 90%"
      >
        <span v-if="show[i]" class="material-icons md-18">arrow_drop_up</span>
        <span v-if="!show[i]" class="material-icons md-18">arrow_drop_down</span>
        {{ $tc('recipe.comments.viewReplies', comment.replies.length) }}
      </div>
      <transition name="fade">
        <div v-show="show[i]">
          <div v-for="reply, j in comment.replies" class="d-flex align-items-start">
            <span class="material-icons md-18 mt-3">subdirectory_arrow_right</span>
            <user-comment :item="reply" :key="'c' + i + 'r' + j" class="pl-3 flex-grow-1" />
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>

<script>
import { mapGetters } from 'vuex'
import CommentForm from './New.vue'
import UserComment from './Show.vue'

export default {
  name: 'Comments',
  data () {
    return {
      show: [],
    }
  },
  components: {
    CommentForm,
    UserComment,
  },
  props: ['item'],
  computed: {
    ...mapGetters(['countRecipeComments', 'recipe']),
    comments () {
      // return this.recipe(this.$route.params.id).comments.sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1).reverse()
      return this.item.comments.sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1).reverse()
    },
  },
  methods: {
    showReplies (index) {
      console.log(`comment ${index} ${this.show[index]}`)
      // this.show[index] = !this.show[index]
      // https://stackoverflow.com/questions/41580617/vuejs-v-if-arrayindex-is-not-working
      this.$set(this.show, index, !this.show[index])
    },
    initShow () {
      // this.show = Array(this.item.comments.length).fill(false)
      this.show = [...new Array(this.item.comments.length)].map(() => false)
    }
  },
  mounted () {
    this.initShow()
  }
}
</script>
