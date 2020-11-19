<template>
  <div class="container p-3"  id="user-banner">
    <div v-if="currentUser" class="d-flex justify-content-between p-2 p-md-3 bg-light rounded">
      <div class="mx-md-2 d-flex justify-content-start align-items-center">
        <img :src="user.image.preview.url" :alt="user.name" class="rounded" width="64" height="64" style="object-fit: cover;">
        <div class="ml-3 d-flex flex-column">
          <router-link :to="'/u/' + user.slug" class="d-flex align-items-center text-capitalize text-body text-decoration-none">{{ user.name }}
            <span v-if="user.checked" data-toggle="tooltip" data-placement="top" title="Verified" class="d-flex px-1">
              <i class="material-icons md-16">check_circle</i>
            </span>
          </router-link>
          <div>
            <router-link :to="'/u/' + user.slug + '/followers'" class="d-flex align-items-center text-decoration-none text-muted">
              <small>{{ $tc('userBanner.followers', followers) }}</small>
            </router-link>
          </div>
        </div>
      </div>

      <div class="mx-md-2 d-flex justify-content-start align-items-center">
        <div v-if="user.slug === currentUser.slug">
          <div class="btn">
            <span class="material-icons md-24">settings</span>
          </div>
        </div>
        <div v-else>
          <follow :item="user" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.align-items {
  margin-bottom: 3px;
}
</style>

<script>
import { mapGetters } from 'vuex'
import Follow from '../components/Follow.vue'

export default {
  name: 'UserBanner',
  // props: ['user'],
  data () {
    return {}
  },
  components: {
    Follow,
  },
  computed: {
    ...mapGetters(['usersFilter', 'currentUser']),
    user () {
      return this.usersFilter(this.$route.params.id)
    },
    followers () {
      return this.user.followers.count
    }
  },
  methods: {
  },
}
</script>
