<template>
  <div v-if="item.recipe.video" class="row mt-5 d-print-none">
    <div class="col col-md-8 mx-auto">
      <div class="rounded embed-responsive embed-responsive-16by9">
        <iframe
          class="embed-responsive-item"
          :src="item.recipe.video"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen=""
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Youtube',
  props: ['item'],
}
</script>
