<template>
  <div :style="{ marginTop: navbarHeight + 'px' }">
    <div class="container-fluid py-3">
      <div id="recipes-cards">
        <div id="root" class="d-flex flex-wrap justify-content-center">
          <div v-for="(item, index) in data" :key="item.id" class="card rounded border-0">
            <card :item="item" />
          </div>
        </div>
        <div
          v-infinite-scroll="loadMore"
          :infinite-scroll-disabled="busy"
          :infinite-scroll-distance="navbarHeight"
          :infinite-scroll-immediate-check="true"
        ></div>
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
      data: [],
      busy: false,
    }
  },
  components: {
    Card
  },
  methods: {
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
  },
  computed: {
    items () {
      return this.$store.getters.recipes
    },
  },
  mounted () {
    this.$nextTick(() => {
      this.navbarHeight = this.$store.getters.navbarHeight
      setTimeout(() => {
        if (this.items) this.loadMore()
      }, 1000)
    })
  }
}
</script>
