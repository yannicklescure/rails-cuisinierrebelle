<template>
  <div class="card card-small border-0 mb-3" :key="componentKey">
    <div class="d-flex">
      <div class="d-block" style="height: 64px;">
        <img
          secure="true" height="64px" width="64px" class="rounded" style="object-fit: cover;"
          :src="item.recipe.photo.preview.url">
      </div>
      <div class="ml-3 d-flex flex-column">
        <router-link
          class="text-body stretched-link"
          :to="'/r/' + item.recipe.slug"
        >
        {{ item.recipe.title }}
        </router-link>
        <div class="card-text text-body font-weight-lighter" style="font-size: 90%">
          {{ item.recipe.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardSmall',
  // props: ['componentKey'],
  data () {
    return {
      componentKey: 0,
    }
  },
  methods: {
    forceRerender () {
      this.componentKey += 1;
    },
  },
  computed: {
    ...mapGetters(['recipes']),
    item () {
      const getRandomInt = (max) => {
        max = max > 0 ? max - 1 : 0
        const result = Math.floor(Math.random() * Math.floor(max))
        console.log(result)
        return result
      }
      const num = getRandomInt(this.recipes.length)
      const randomRecipe = this.recipes[num]
      console.log(randomRecipe)
      return randomRecipe
    },
  },
  beforeMount () {
    this.forceRerender()
  },
}
</script>
