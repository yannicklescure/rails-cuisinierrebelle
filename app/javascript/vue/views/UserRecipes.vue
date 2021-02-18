<template>
  <div :style="{ paddingTop: navbarHeight + 'px' }">
    <user-banner />
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
// import Card from '../components/Card.vue'
// import UserBanner from '../components/UserBanner.vue'
const Cards = () => import('../components/Cards.vue')
const UserBanner = () => import('../components/UserBanner.vue')

export default {
  name: 'UserRecipes',
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
    UserBanner,
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
    ...mapGetters([
      'navbarHeight',
      'recipes',
      'userRecipes',
    ]),
    items () {
      return this.userRecipes(this.$route.params.id)
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
    items () {
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
