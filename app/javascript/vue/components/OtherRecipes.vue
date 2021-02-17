<template>
  <div class="d-print-none mt-5">
    <div class="h4 mb-3">{{ $t('recipe.otherRecipes') }}</div>
    <card-small v-for="index in 5" :key="'cs' + index" />
  </div>
</template>

<script>
const CardSmall = () => import('../components/CardSmall.vue')

export default {
  name: 'OtherRecipes',
  components: {
    CardSmall
  }
}
</script>
