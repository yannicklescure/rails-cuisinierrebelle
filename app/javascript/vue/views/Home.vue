<template>
  <div :style="{ paddingTop: navbarHeight + 'px' }" :key="componentKey">
    <banner
      v-if="!isAuthenticated"
      :displayCards="displayCards"
    />
    <div class="container-fluid" ref="container">
      <div id="recipes-cards">
        <cards
          :items="data"
          v-if="displayCards"
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
// import axios from 'axios'
// import Banner from '../components/Banner.vue'
// import Card from '../components/Card.vue'
const Banner = () => import('../components/Banner.vue')
const Cards = () => import('../components/Cards.vue')

export default {
  name: 'Home',
  data () {
    return {
      busy: false,
      componentKey: 0,
      cardsReady: false,
      data: [],
      displayCards: false,
      clickToSroll: false,
    }
  },
  metaInfo: {
    title: 'Cuisinier Rebelle',
    // override the parent template and just use the above title only
    titleTemplate: null
  },
  components: {
    Banner,
    Cards,
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
    },
    'recipes' () {
      // this.fetchItem()
      this.data = this.recipes.slice(0, this.data.length)
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
    // cardsLoaded () {
    //   this.cardsReady = true
    //   if (this.clickToSroll) this.scrollToCards()
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
    fetchItem () {
      console.log('fetchItem')
      if (this.recipes.length === 0) {
        console.log('fetching recipes data')
        this.data = []
        this.$store
          .dispatch('RECIPES', {})
      }
      // this.componentKey += 1
      this.data = this.recipes
        .slice(0, 12)
    },
    // loadCards () {
    //   this.displayCards = true
    //   this.clickToSroll = true
    //   // this.$nextTick(() => {
    //   //   this.scrollToCards()
    //   // })
    // },
    // scrollToCards () {
    //   if (this.clickToSroll) {
    //     // let element = document.querySelector('#recipes-cards')
    //     let element = this.$refs.container
    //     console.log(element)
    //     const scrollOptions = {
    //       top: element.offsetTop - this.navbarHeight,
    //       left: 0,
    //       behavior: 'smooth'
    //     };
    //     window.scrollTo(scrollOptions);
    //   }
    //   else {
    //     this.clickToSroll = true
    //   }
    // },
    // forceRerender () {
    //   this.componentKey += 1;
    // },
  },
  beforeMount () {
    this.fetchItem()
  },
  mounted () {
    this.$nextTick(() => {
      this.displayCards = true
      // setTimeout(() => {
        // console.log(this.data)
      // }, 1000)
    })
  }
}
</script>
