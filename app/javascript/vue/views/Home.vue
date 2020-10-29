<template>
  <div :style="{ marginTop: navbarHeight + 'px' }">
    <p>Home</p>
    <div class="container-fluid">
      <div id="recipes-cards">
        <div id="root" class="d-flex flex-wrap justify-content-start p-md-2">
          <div v-for="(item, index) in items" :key="item.id">
            <card :item="item" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from '../components/Card.vue'

export default {
  name: 'Home',
  data () {
    return {
      componentKey: 0,
      navbarHeight: 0,
    }
  },
  components: {
    Card
  },
  methods: {
    getNavbarHeight () {
      return this.$store.getters.navbarHeight
    },
  },
  computed: {
    items () {
      return this.$store.getters.recipes
    }
  },
  mounted () {
    this.navbarHeight = this.getNavbarHeight()
  }
}
</script>
