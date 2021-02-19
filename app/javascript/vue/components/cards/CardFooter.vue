<template>
  <div class="card-footer border-0 bg-white p-1">
    <div v-if="mobile" class="d-flex justify-content-between align-items-center my-2">
      <div :class="['d-flex justify-content-between', mobile ? 'align-items-start' : 'align-items-center ml-n2']">
        <like :item="item" />
        <comment :item="item" />
        <share :item="item" />
      </div>
      <div :class="['d-flex', mobile ? 'align-items-start' : 'align-items-center']">
        <visit :item="item" />
        <bookmark :item="item" />
      </div>
    </div>
    <div class="d-flex flex-column">
      <router-link
        :to="'/r/' + item.recipe.slug"
        class="card-link text-body text-uppercase"
      >
        {{ item.recipe.title }}
      </router-link>
      <div
        class="card-text font-weight-lighter"
        style="font-size: 90%"
      >
        {{ item.recipe.description }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

const Bookmark = () => import('../buttons/Bookmark.vue')
const Comment = () => import('../buttons/Comment.vue')
const Like = () => import('../buttons/Like.vue')
const Share = () => import('../buttons/Share.vue')
const Visit = () => import('../buttons/Visit.vue')

export default {
  name: 'CardFooter',
  props: ['item'],
  components: {
    Bookmark,
    Comment,
    Like,
    Share,
    Visit,
  },
  computed: {
    ...mapGetters([
      'mobile',
    ]),
  },
  // methods: {
  //   heartFillBig () {
  //     console.log('liked')
  //     this.$refs.heartFillBig.innerHTML = '<i class="material-icons md-96 text-danger">favorite</i>'
  //     setTimeout(() => {
  //       this.$refs.heartFillBig.innerHTML = ''
  //     }, 1000);
  //   },
  //   bookmarkFillBig () {
  //     console.log('liked')
  //     this.$refs.bookmarkFillBig.innerHTML = '<i class="material-icons md-96 text-body">bookmark</i>'
  //     setTimeout(() => {
  //       this.$refs.bookmarkFillBig.innerHTML = ''
  //     }, 1000);
  //   },
  // }
}
</script>
