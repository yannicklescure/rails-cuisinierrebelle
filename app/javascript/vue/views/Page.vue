<template>
  <div
    :style="{ paddingTop: navbarHeight + 'px' }"
    class="container"
    :key="componentKey"
  >
    <div v-if="!mobile && currentUser.admin" class="d-flex justify-content-center align-items-center my-3">
      <router-link :to="`/p/${$route.params.id}/edit`" class="text-body text-capitalize text-decoration-none" >{{ $t('pages.edit') }}</router-link>
    </div>
    <div>
      <vue-markdown-plus :source="data.content" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import VueMarkdownPlus from 'vue-markdown-plus'
import { isMobile } from 'mobile-device-detect'

export default {
  name: 'Page',
  data () {
    return {
      componentKey: 0,
      data: {
        content: null,
      },
    }
  },
  components: {
    VueMarkdownPlus,
  },
  methods: {
    fetchItem () {
      this.data =  this.page(this.$route.params.id)
      this.componentKey += 1
    }
  },
  computed: {
    ...mapGetters(['navbarHeight', 'page', 'currentUser']),
    mobile () {
      return isMobile
    },
  },
  watch: {
    async '$route' () {
      console.log(this.$route.params.id)
      await this.fetchItem()
      // this.recipeLog()
    }
  },
  beforeMount () {
    this.fetchItem()
  },
  // mounted () {
  // }
}
</script>
