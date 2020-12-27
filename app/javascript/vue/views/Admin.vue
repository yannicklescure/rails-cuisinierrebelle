<template>
  <div v-if="!loading" :style="{ paddingTop: navbarHeight + 'px' }" class="container pt-3">
    <h1>Administration</h1>
    <h2>Actions</h2>
    <p><router-link to="/admin/pages">Gestion des pages du site</router-link></p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Admin',
  data () {
    return {
      componentKey: 0,
      loading: true,
      // navbarHeight: 0,
    }
  },
  methods: {
    // getNavbarHeight () {
    //   return this.$store.getters.navbarHeight
    // },
  },
  computed: {
    ...mapGetters([
      'navbarHeight',
      'currentUser',
    ]),
  },
  beforeMount () {
    if (this.currentUser.admin) this.loading = false
    else {
      console.log('ALERT')
      this.$router.push({
        name: 'Home'
      })
    }
  },
  mounted () {
  }
}
</script>
