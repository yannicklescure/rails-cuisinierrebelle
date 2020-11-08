<template>
  <div class="container p-3"  id="user-banner">
    <div class="d-flex justify-content-center">
      <div class="mx-2 d-flex justify-content-start align-items-center bg-light p-3 rounded">
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

      <div class="mx-2 d-flex justify-content-start align-items-center bg-light p-3 rounded">
        <div class="btn btn-sm btn-dark">
          Follow
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

export default {
  name: 'UserBanner',
  // props: ['user'],
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['usersFilter']),
    user () {
      return this.usersFilter(this.$route.params.id)
    },
    followers () {
      return this.user.followers.length
    }
  },
  methods: {
  },
}
</script>
