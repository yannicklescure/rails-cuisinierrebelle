<template>
  <div class="card-body bg-white px-0 py-2">
    <router-link :to="'/r/' + item.recipe.slug">
      <div
        :class="['card-img-top d-flex justify-content-center align-items-center']"
        v-lazy:background-image.container="item.recipe.photo.card.url"
      >
      </div>
    </router-link>
  </div>
</template>

<script>

export default {
  name: 'CardBody',
  props: ['item'],
}
</script>
