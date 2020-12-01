<template>
  <tr class="d-flex justify-content-between align-items-center">
    <td class="d-flex justify-content-start align-items-center">
      <img v-lazy="item.image.thumb.url" :alt="item.name" class="rounded-circle" width="32" height="32" style="object-fit: cover;">
      <router-link :to="'/u/' + item.slug" class="mx-2 text-capitalize text-decoration-none text-body d-flex align-items-center">
        {{ item.name }}
        <span v-if="item.checked" data-toggle="tooltip" data-placement="top" title="Verified" class="d-flex px-1">
          <i class="material-icons md-16">check_circle</i>
        </span>
      </router-link>
    </td>
    <td>
      <follow :item="item" />
    </td>
  </tr>
</template>

<script>
// import Follow from '../components/buttons/Follow.vue'
const Follow = () => import('../components/buttons/Follow.vue')

export default {
  name: 'UserCard',
  props: ['item'],
  data () {
    return {}
  },
  components: {
    Follow,
  },
}
</script>
