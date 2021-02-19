<template>
  <div :style="{ paddingTop: navbarHeight + 'px' }">
    <div class="container-fluid" ref="container">
      <div id="recipes-cards">
        <cards
          :items="data"
        />
        <div
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="busy"
          infinite-scroll-distance="navbarHeight"
          infinite-scroll-immediate-check="true"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
const Cards = () => import('../components/Cards.vue')

export default {
  name: 'Bookmarks',
  data () {
    return {
      componentKey: 0,
      // navbarHeight: 0,
      data: [],
      busy: false,
    }
  },
  components: {
    Cards,
  },
  methods: {
    // cardParams (value) {
    //   const cardWidth = value.params.width
    //   console.log(cardWidth)
    //   const containerWidth = this.$refs.container.offsetWidth
    //   console.log(containerWidth)
    //   console.log(containerWidth / cardWidth)
    // },
    loadMore () {
      if (this.data.length < this.items.length) {
        console.log('loadMore')
        this.busy = true;
        setTimeout(() => {
          const cards = 12
          const min = this.data.length
          const max = min + cards <= this.items.length ? min + cards : this.items.length
          // for (let i = min, j = max; i < j; i++) {
          //   this.data.push(this.items[i])
          // }
          this.data = this.data.concat(this.items.slice(min, max))
          this.busy = false;
        }, 0);
      }
    },
  },
  computed: {
    ...mapGetters([
      'navbarHeight',
      'bookmarks',
    ]),
    items () {
      return this.bookmarks
    },
  },
  created () {
    if (this.items && this.data.length === 0) this.loadMore()
  },
  // beforeMount () {
  // },
  // mounted () {
  //   this.$nextTick(() => {
  //     setTimeout(() => {
  //     }, 1000)
  //   })
  // }
}
</script>
