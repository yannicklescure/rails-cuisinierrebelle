<template>
  <div class="mt-3 mb-2">
    <div class="d-flex align-items-center">
      <img
        :src="item.user.image.thumb.url"
        :alt="item.user.name"
        width="24"
        height="24"
        class="rounded-circle"
      >
      <router-link
        :to="`/u/${ item.user.slug }`"
        class="mx-2 text-capitalize text-body"
        style="font-size: 90%"
      >{{ item.user.name }}</router-link>
      <small class="text-muted">{{ timeAgo(item.timestamp) }}</small>
    </div>
    <div class="mt-2 bg-light border rounded p-3">
      <vue-markdown :source="item.content" class="text-break" />
    </div>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'

export default {
  name: 'UserComment',
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
      const between = Math.trunc((new Date().getTime() - time) / 1000)
      if (between < 3600) {
        return this.$tc('comment.minutes', Math.trunc(between / 60))
      } else if (between < 86400) {
        return this.$tc('comment.hours', Math.trunc(between / 3600))
      } else if (between < 2592000) {
        return this.$tc('comment.days', Math.trunc(between / 86400))
      } else if (between < 31104000) {
        return this.$tc('comment.months', Math.trunc(between / 2592000))
      } else {
        return this.$tc('comment.years', Math.trunc(between / 311004000))
      }
    }
  },
}
</script>
