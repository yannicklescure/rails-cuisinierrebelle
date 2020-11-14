<template>
  <div class="my-2">
    <div class="d-flex align-items-center">
      <img
        :src="item.user.image.thumb.url"
        :alt="item.user.name"
        width="24"
        height="24"
        class="rounded-circle"
      >
      <span class="mx-2 text-capitalize">{{ item.user.name }}</span>
      <small>{{ item.timestamp | timeAgo }}</small>
    </div>
    <div class="mt-2 bg-light border rounded p-3">
      <vue-markdown :source="item.content" />
    </div>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'

export default {
  name: 'Comment',
  props: ['item'],
  // data () {
  //   return {
  //   }
  // },
  components: {
    VueMarkdown,
  },
  methods: {
    timeAgo (time) {
      const between = (Date.now() - Number(time)) / 1000
      if (between < 3600) {
        return 'il y a ' + pluralize(~~(between / 60), ' minute')
      } else if (between < 86400) {
        return 'il y a ' + pluralize(~~(between / 3600), ' heure')
      } else {
        return 'il y a ' + pluralize(~~(between / 86400), ' jour')
      }
    }
  },
}
</script>
