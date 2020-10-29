<template>
  <div class="card w-100 rounded border-0 my-3 m-md-2" :ref="item.recipe.id">
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
          <div :class="['d-none text-danger display-3']">
            heartFillBig
          </div>
          <div :class="['d-none text-body display-3']">
            bookmarkFillBig
          </div>
        </div>
      </router-link>
      <div class="d-flex justify-content-between align-items-center my-2">
        <div class="d-flex justify-content-between align-items-center">
          <div class="d-flex align-items-center text-body">
            <i class="material-icons md-18 align-icons">visibility</i>
            <span class="text-muted font-weight-lighter ml-1">{{ item.recipe.viewsCount }}</span>
          </div>
          <div class="d-flex align-items-center text-danger ml-2">
            <div
              class="p-0 text-danger text-decoration-none d-flex align-items-center"
            >
              <i class="material-icons md-18 align-icons">favorite</i>
              <span class="text-muted font-weight-lighter ml-1">{{ item.recipe.likesCount }}</span>
            </div>
          </div>
        </div>
        <div class="d-flex align-items-center">
          <router-link
            class="p-0 ml-2 text-body text-decoration-none d-flex align-items-center"
            :to="'/r/' + item.recipe.slug + '#comments'"
          >
            <i class="material-icons md-18">comment</i>
            <span class="text-muted font-weight-lighter ml-1">{{ commentsCount }}</span>
          </router-link>
          <div
            class="p-0 ml-2 text-body text-decoration-none d-flex align-items-center"
          >
            <i class="material-icons md-18 align-icons">bookmark</i>
          </div>
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
// import Item from '../components/Item.vue'

export default {
  name: 'card',
  props: ['item'],
  components: {
    // Item,
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
    }
    // user () {
    //   if (this.currentUser) {
    //     this.pin = true
    //   }
    //   return this.$store.getters.user
    // },
    // userPinnedPost () {
    //   return this.data.filter(item => item.pin === true)[0] || null
    // },
    // items () {
    //   console.log(this.data)
    //   if (this.$route.name === 'user') {
    //     return this.data.filter(item => item.pin === false)
    //   }
    //   else return this.data
    // }
  },
  methods: {
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
    })
  }
}
</script>
