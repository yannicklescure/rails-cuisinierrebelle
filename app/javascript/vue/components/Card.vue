<template>
  <div :ref="`card${item.recipe.id}`">
    <card-head :item="item" />
    <card-body :item="item" />
    <card-footer :item="item" />
  </div>
</template>

<script>
const CardBody = () => import('../components/cards/CardBody.vue')
const CardHead = () => import('../components/cards/CardHead.vue')
const CardFooter = () => import('../components/cards/CardFooter.vue')

export default {
  name: 'card',
  props: ['item'],
  components: {
    CardBody,
    CardHead,
    CardFooter,
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
      this.$emit('cardReady', this.item.recipe.id)
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
