<template>
  <div :style="{ paddingTop: navbarHeight + 'px' }" :key="componentKey">
    <banner v-if="!isAuthenticated" />
    <div class="container-fluid" ref="container">
      <div id="recipes-cards">
        <div id="root" class="d-flex flex-wrap justify-content-start py-3">
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
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
// import Banner from '../components/Banner.vue'
// import Card from '../components/Card.vue'
const Banner = () => import('../components/Banner.vue')
const Card = () => import('../components/Card.vue')


export default {
  name: 'Home',
  data () {
    return {
      componentKey: 0,
      // navbarHeight: 0,
      data: [],
      busy: false,
    }
  },
  metaInfo: {
    title: 'Cuisinier Rebelle',
    // override the parent template and just use the above title only
    titleTemplate: null
  },
  components: {
    Card,
    Banner,
  },
  computed: {
    ...mapGetters([
      'navbarHeight',
      'isAuthenticated',
      'recipes',
    ]),
    items () {
      return this.recipes
    },
  },
  watch: {
    '$route' () {
      console.log(this.$route.params.id)
      this.fetchItem()
      // this.recipeLog()
    },
    'recipes' () {
      // this.fetchItem()
      this.data = this.recipes
        .slice(0, 24)
    }
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
    fetchItem () {
      if (this.recipes.length === 0) {
        console.log('fetching recipes data')
        this.data = []
        this.$store
          .dispatch('RECIPES', {})
      }
      this.componentKey += 1
      this.data = this.recipes
        .slice(0, 24)
    },
  },
  beforeMount () {
    this.fetchItem()
    // this.loadMore()
  },
  mounted () {
    // while (this.data.length === 0){
    //   if (this.recipes.length > 0 && this.data.length === 0) this.data = this.recipes.slice(0, 24)
    // }
    this.$nextTick(() => {
      // this.navbarHeight = this.$store.getters.navbarHeight
      // console.log(this.$store.getters.navbarHeight)
      // console.log(this.$store.getters.recipes)
      // if (this.items.length > 0) console.log('items ready')
      setTimeout(() => {
        // this.loadMore()
        // while (!this.items && this.data.length === 0) this.loadMore()
      }, 1000)
      // console.log(this.data)
    })
  }
}
</script>
