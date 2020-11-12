<template>
  <div :ref="`card${item.recipe.id}`">
    <div class="card-header bg-white px-2 pt-2 pb-0 border-0">
      <div class="d-flex justify-content-start align-items-center">
        <router-link
          :to="'/u/' + item.user.slug"
          class="card-link text-body d-flex align-items-center"
          style="font-size: 90%"
        >
          <img
            :src="item.user.image.thumb.url"
            width="24px"
            height="24px"
            class="rounded-circle mr-2"
            style="object-fit: cover;"
          >
          <div class="text-capitalize">{{ item.user.name }}</div>
        </router-link>
        <span v-if="item.user.checked" data-toggle="tooltip" data-placement="top" title="Verified" class="d-flex px-1">
          <i class="material-icons md-16">check_circle</i>
        </span>
      </div>
    </div>
    <div class="card-body bg-white p-2">
      <router-link :to="'/r/' + item.recipe.slug">
        <div
          :class="['card-img-top d-flex justify-content-center align-items-center']"
          :style="{ backgroundImage: 'url(' + item.recipe.photo.card.url + ')' }"
        >
          <div ref="heartFillBig"></div>
          <div ref="bookmarkFillBig"></div>
        </div>
      </router-link>
      <div class="d-flex justify-content-between align-items-center my-2">
        <div class="d-flex justify-content-between align-items-center">
          <visit :item="item" />
          <like :item="item" @liked="heartFillBig" />
        </div>
        <div class="d-flex align-items-center">
          <router-link
            class="p-0 ml-2 text-body text-decoration-none d-flex align-items-center"
            :to="'/r/' + item.recipe.slug + '#comments'"
          >
            <i class="material-icons md-18">comment</i>
            <span class="text-muted font-weight-lighter ml-1">{{ commentsCount }}</span>
          </router-link>
          <bookmark :item="item" @bookmarked="bookmarkFillBig" />
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
  </div>
</template>

<script>
import Bookmark from '../components/Bookmark.vue'
import Like from '../components/Like.vue'
import Visit from '../components/Visit.vue'

export default {
  name: 'card',
  props: ['item'],
  components: {
    Bookmark,
    Like,
    Visit,
  },
  data () {
    return {
      // truncate: true,
      // footer: true,
      // busy: false,
      // loading: true,
    }
  },
  computed: {
    commentsCount () {
      return this.item.comments.length
    },
  },
  methods: {
    heartFillBig () {
      console.log('liked')
      this.$refs.heartFillBig.innerHTML = '<i class="material-icons md-96 text-danger">favorite</i>'
      setTimeout(() => {
        this.$refs.heartFillBig.innerHTML = ''
      }, 1000);
    },
    bookmarkFillBig () {
      console.log('liked')
      this.$refs.bookmarkFillBig.innerHTML = '<i class="material-icons md-96 text-body">bookmark</i>'
      setTimeout(() => {
        this.$refs.bookmarkFillBig.innerHTML = ''
      }, 1000);
    },
    // itemReadyLog (value) {
    //   if (value === this.items[this.items.length-1].id) {
    //     console.log(this.items[this.items.length-1].id)
    //     console.log(value)
    //     this.$emit('listReady', value)
    //   }
    // },
    // forwardItem ({ data, page }) {
    //   console.log(data)
    //   let post = {}
    //   // this.data.splice(position, 1)
    //   if (data.create) {
    //     post = data.post
    //     post.comments = []
    //     post.forwards = []
    //     post.points = 0
    //     post.forward = data.parent
    //     // this.data.splice(0, 0, post)
    //     this.data.unshift(post)
    //   }
    //   else {
    //     post = this.data.filter(item => item.id === parseInt(data.post.id))[0]
    //     const position = this.data.indexOf(post)
    //     this.data.splice(position, 1)
    //   }
    //   this.$emit('updateFeed', this.data)
    // },
    // deleteItem (value) {
    //   console.log(value)
    //   const post = this.data.filter(item => item.id === parseInt(value.postId))[0]
    //   const position = this.data.indexOf(post)
    //   this.data.splice(position, 1)
    //   this.$emit('updateFeed', this.data)
    //   // const itemForwardBtn = document.querySelector(`#item-forward-btn-${value.parentId}`)
    //   // itemForwardBtn.classList.remove('text-primary')
    //   // itemForwardBtn.classList.add('text-secondary')
    //   // const itemForwardBtnCounter = document.querySelector(`#item-forward-btn-${value.parentId}-counter`)
    //   // let ifbcVal = parseInt(itemForwardBtnCounter.innerText)
    //   // itemForwardBtnCounter.innerText = ifbcVal - 1
    // },
    // editItem ({ post }) {
    //   const element = this.data.filter(item => item.id === parseInt(post.id))[0]
    //   const position = this.data.indexOf(element)
    //   this.data.splice(position, 1, post)
    //   this.$emit('updateFeed', this.data)
    // },
    // pinPost (value) {
    //   console.log('pinPost')
    //   console.log(value)
    //   this.$emit('pinPost', value)
    // }
  },
  mounted () {
    this.$nextTick(() => {
      // this.loading = false
      console.log('card ready')
      // this.$emit('cardParams', {
      //   params: {
      //     height: this.$refs[`card${this.item.recipe.id}`].offsetHeight,
      //     width: this.$refs[`card${this.item.recipe.id}`].offsetWidth
      //   }
      // })
    })
  }
}
</script>
