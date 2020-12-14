<template>
  <div
    :style="{ paddingTop: navbarHeight + 'px' }"
    class="container"
    :key="componentKey"
  >
    <h1>{{ data.title }}</h1>
    <div>
      <vue-markdown-plus :source="data.content" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import VueMarkdownPlus from 'vue-markdown-plus'

export default {
  name: 'Page',
  data () {
    return {
      componentKey: 0,
      data: null,
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
    ...mapGetters(['navbarHeight', 'page']),
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
