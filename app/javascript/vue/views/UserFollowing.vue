<template>
  <div :style="{ marginTop: navbarHeight + 'px' }">
    <user-banner />
    <div class="container" ref="container">
      <div class="px-3 px-md-5">
        <table class="table table-borderless">
          <tbody
            v-for="(item, index) in data"
            :key="item.id"
          >
            <user-card :item="item" />
          </tbody>
        </table>
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
import Card from '../components/Card.vue'
import UserBanner from '../components/UserBanner.vue'
import UserCard from '../components/UserCard.vue'

export default {
  name: 'UserFollowing',
  data () {
    return {
      componentKey: 0,
      // navbarHeight: 0,
      data: [],
      busy: false,
    }
  },
  components: {
    Card,
    UserBanner,
    UserCard,
  },
  methods: {
    // cardParams (value) {
    //   const cardWidth = value.params.width
    //   console.log(cardWidth)
    //   const containerWidth = this.$refs.container.offsetWidth
    //   console.log(containerWidth)
    //   console.log(containerWidth / cardWidth)
    // },
    getUsers () {
      this.$store
        .dispatch('USERS', {})
        .then(response => {
          console.log(response)
        })
    },
    loadMore () {
      if (this.data.length < this.following.length) {
        console.log('loadMore')
        this.busy = true;
        setTimeout(() => {
          const cards = 24
          const min = this.data.length
          const max = min + cards <= this.following.length ? min + cards : this.following.length
          for (let i = min, j = max; i < j; i++) {
            this.data.push(this.following[i]);
          }
          this.busy = false;
        }, 0);
      }
    },
  },
  computed: {
    ...mapGetters(['navbarHeight', 'usersFilter']),
    following () {
      return this.usersFilter(this.$route.params.id).following.data
    }
  },
  watch: {
    following () {
      this.loadMore()
    }
  },
  created () {
    if (this.following && this.data.length === 0) this.loadMore()
    // if (this.$store.getters.recipes) this.loadMore()
  },
  beforeMount () {
    // console.log(this.$store.getters.recipes)
    this.getUsers()
  },
  mounted () {
    this.$nextTick(() => {
      // this.navbarHeight = this.$store.getters.navbarHeight
      // console.log(this.$store.getters.navbarHeight)
      // console.log(this.$store.getters.recipes)
      // if (this.following.length > 0) console.log('following ready')
      setTimeout(() => {
        // this.loadMore()
        // while (!this.following && this.data.length === 0) this.loadMore()
      }, 1000)
    })
  }
}
</script>
