<template>
  <div :style="{ paddingTop: navbarHeight + 'px' }" :key="componentKey">
    <div v-if="busy === false" class="container-fluid" ref="container">
      <div v-if="data.length > 0" id="recipes-cards">
        <div id="root" class="d-flex flex-wrap justify-content-start">
          <div
            v-for="(item, index) in data"
            :key="item.id"
            class="card rounded border-0"
          >
            <card :item="item" />
          </div>
        </div>
        <div
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="busy"
          infinite-scroll-distance="navbarHeight"
          infinite-scroll-immediate-check="true"
        ></div>
      </div>
      <div v-else class="py-3" v-html="$t('search.noResult', { query: $route.query.r })"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Card from '../components/Card.vue'

export default {
  name: 'Search',
  data () {
    return {
      componentKey: 0,
      // navbarHeight: 0,
      data: [],
      busy: true,
    }
  },
  components: {
    Card,
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
          const cards = 24
          const min = this.data.length
          const max = min + cards <= this.items.length ? min + cards : this.items.length
          for (let i = min, j = max; i < j; i++) {
            this.data.push(this.items[i]);
          }
          this.busy = false;
        }, 0);
      }
    },
  },
  computed: {
    ...mapGetters(['navbarHeight', 'search']),
    items () {
      return this.search.recipes
    },
    // items () {
    //   const items = this.$store.getters.recipes
    //   // if (items && this.data.length === 0) this.data = items.slice(0, 24)
    //   return items
    // },
    // setData () {
    //   if (this.items.length > 0 && this.data.length === 0) {
    //     this.data = this.items.slice(0, 24)
    //     return true
    //   }
    //   return false
    // },
  },
  watch: {
    async '$route' () {
      console.log(this.$route.query)
      this.data = []
      this.componentKey += 1
      this.loadMore()
    }
  },
  beforeMount () {
    // console.log(this.$store.getters.recipes)
  },
  mounted () {
    this.$nextTick(() => {
      this.loadMore()
      // this.navbarHeight = this.$store.getters.navbarHeight
      // console.log(this.$store.getters.navbarHeight)
      // console.log(this.$store.getters.recipes)
      // if (this.items.length > 0) console.log('items ready')
      setTimeout(() => {
        // this.loadMore()
        // while (!this.items && this.data.length === 0) this.loadMore()
      }, 1000)
    })
  }
}
</script>
