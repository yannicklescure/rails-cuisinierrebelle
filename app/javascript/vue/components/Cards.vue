<template>
  <div id="root" class="d-flex flex-wrap justify-content-start">
    <div
      v-for="(item, index) in items"
      class="card rounded border-0"
    >
      <card
        :item="item"
        :key="'card-' + item.recipe.id"
        v-on:cardReady="cardsReady"
      />
    </div>
  </div>
</template>

<script>
const Card = () => import('../components/Card.vue')

export default {
  name: 'Cards',
  props: ['items'],
  data () {
    return {
      // message: 'false',
    }
  },
  components: {
    Card,
  },
  methods: {
    cardsReady (value) {
      if (value === this.items[this.items.length-1].recipe.id) {
        this.$emit('cardsReady', true)
      }
    },
  },
  mounted () {
    this.$nextTick(() => {
      // setTimeout(() => {}, 1000)
    })
  }
}
</script>
