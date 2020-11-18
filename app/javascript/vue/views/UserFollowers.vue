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
            <tr class="d-flex justify-content-between align-items-center">
              <td class="d-flex justify-content-start align-items-center">
                <img :src="item.image.thumb.url" :alt="item.name" class="rounded-circle" width="32" height="32" style="object-fit: cover;">
                <router-link :to="'/u/' + item.slug" class="mx-2 text-capitalize text-decoration-none text-body d-flex align-items-center">
                  {{ item.name }}
                  <span v-if="item.checked" data-toggle="tooltip" data-placement="top" title="Verified" class="d-flex px-1">
                    <i class="material-icons md-16">check_circle</i>
                  </span>
                </router-link>
              </td>
              <td>
                <div class="btn btn-sm btn-dark">
                  Follow
                </div>
              </td>
            </tr>
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

export default {
  name: 'UserFollowers',
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
  },
  methods: {
    // cardParams (value) {
    //   const cardWidth = value.params.width
    //   console.log(cardWidth)
    //   const containerWidth = this.$refs.container.offsetWidth
    //   console.log(containerWidth)
    //   console.log(containerWidth / cardWidth)
    // },
    getFollowers () {
      this.$store
        .dispatch('FOLLOWERS', this.$route.params.id)
        .then(response => {
          console.log(response)
        })
    },
    loadMore () {
      if (this.data.length < this.followers.length) {
        console.log('loadMore')
        this.busy = true;
        setTimeout(() => {
          const cards = 24
          const min = this.data.length
          const max = min + cards <= this.followers.length ? min + cards : this.followers.length
          for (let i = min, j = max; i < j; i++) {
            this.data.push(this.followers[i]);
          }
          this.busy = false;
        }, 0);
      }
    },
  },
  computed: {
    ...mapGetters(['navbarHeight', 'usersFilter']),
    followers () {
      return this.usersFilter(this.$route.params.id).followers.data
    }
  },
  created () {
    if (this.followers && this.data.length === 0) this.loadMore()
    // if (this.$store.getters.recipes) this.loadMore()
  },
  beforeMount () {
    // console.log(this.$store.getters.recipes)
  },
  mounted () {
    this.$nextTick(() => {
      // this.navbarHeight = this.$store.getters.navbarHeight
      // console.log(this.$store.getters.navbarHeight)
      // console.log(this.$store.getters.recipes)
      // if (this.followers.length > 0) console.log('followers ready')
      setTimeout(() => {
        // this.loadMore()
        // while (!this.followers && this.data.length === 0) this.loadMore()
      }, 1000)
    })
  }
}
</script>
