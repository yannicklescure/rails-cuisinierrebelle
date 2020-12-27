<template>
  <div :style="{ paddingTop: navbarHeight + 'px' }" :key="componentKey">
    <div class="container py-2">
      <div v-for="item, i in data" class="d-flex flex-column">
        <div class="d-flex align-items-start rounded bg-light my-2 p-2">
          <router-link :to="'/u/' + item.user.slug">
            <img
              v-lazy="item.user.image.thumb.url"
              class="rounded-circle"
              width="32"
              height="32"
              style="object-fit: cover;"
            >
           </router-link>
          <div class="ml-3 d-flex flex-column">
            <div class="d-flex align-items-center" style="font-size: 90%;">
              <router-link
                v-if="item.type === 'recipe'"
                :to="item.slug"
                class="text-body"
              >{{ $t('notifications.like.recipe', { user: item.user.name }) }}</router-link>
              <router-link
                v-if="item.type === 'comment'"
                :to="item.slug"
                class="text-body"
              >{{ $t('notifications.like.comment', { user: item.user.name }) }}</router-link>
              <router-link
                v-if="item.type === 'reply'"
                :to="item.slug"
                class="text-body"
              >{{ $t('notifications.like.reply', { user: item.user.name }) }}</router-link>
            </div>
            <small class="text-muted">{{ timeAgo(item.timestamp) }}</small>
            <div class="small text-muted">
              {{ item.title }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="busy"
      infinite-scroll-distance="navbarHeight"
      infinite-scroll-immediate-check="true"
    ></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Notifications',
  data () {
    return {
      componentKey: 0,
      // navbarHeight: 0,
      loading: false,
      busy: false,
      data: [],
      // items: {
      //   data: []
      // },
    }
  },
  computed: {
    ...mapGetters([
      'navbarHeight',
      'currentUser',
      'notifications',
    ]),
    // notifications () {
    //   return this.currentUser.notifications
    // }
    items () {
      return this.notifications.data
        .sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1).reverse()
    }
  },
  methods: {
    timeAgo (time) {
      const between = Math.trunc((new Date().getTime() - time) / 1000)
      if (between < 3600) {
        return this.$tc('comment.minutes', Math.trunc(between / 60))
      } else if (between < 86400) {
        return this.$tc('comment.hours', Math.trunc(between / 3600))
      } else if (between < 2592000) {
        return this.$tc('comment.days', Math.trunc(between / 86400))
      } else if (between < 31104000) {
        return this.$tc('comment.months', Math.trunc(between / 2592000))
      } else {
        return this.$tc('comment.years', Math.trunc(between / 311004000))
      }
    },
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
      console.log('fetching notifications data')
      this.loading = true
      this.$store
        .dispatch('NOTIFICATIONS', {})
        .then( response => {
          console.log(response)
          this.data = response.data.data
            .sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1).reverse()
            .splice(0, 24)
          // if (this.log) {
          //   this.$store
          //     .dispatch('SET_STORE', {})
          //     .then(() => this.log = false)
          // }
          // this.componentKey += 1
          this.loading = false
        })
        .finally(() => {
          // this.scroll2Anchor()
        })
    },
  },
  // watch: {
  //   async '$route' () {
  //     console.log(this.$route.params.id)
  //     await this.fetchItem()
  //   }
  // },
  beforeMount () {
    this.fetchItem()
  },
  mounted () {
    this.$nextTick(() => {})
  },
}
</script>
