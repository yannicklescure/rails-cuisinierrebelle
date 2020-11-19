<template>
  <div v-if="isAuthenticated">
    <div v-if="isFollowing" v-on:click="unfollow" class="btn btn-sm btn-secondary">
      {{ $t('follow.unfollow') }}
    </div>
    <div v-else v-on:click="follow" class="btn btn-sm btn-dark">
      {{ $t('follow.follow') }}
    </div>
  </div>
  <div v-else>
    <router-link to="/login" class="btn btn-sm btn-dark">
      {{ $t('follow.follow') }}
    </router-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Follow',
  data () {
    return {}
  },
  props: ['item'],
  computed: {
    ...mapGetters(['isAuthenticated', 'currentUser']),
    // isFollower () {
    //   return this.currentUser.followers.data.filter(f => f.slug === this.item.slug).length > 0
    // },
    isFollowing () {
      return this.currentUser.following.data.filter(f => f.slug === this.item.slug).length > 0
    }
  },
  methods: {
    follow () {
      console.log('follow')
      this.$store
        .dispatch('FOLLOW', { user: this.item.slug })
    },
    unfollow () {
      console.log('unfollow')
      this.$store
        .dispatch('UNFOLLOW', { user: this.item.slug })
    },
  }
}
</script>
