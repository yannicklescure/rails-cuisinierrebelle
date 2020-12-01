<template>
  <div :ref="`share${item.recipe.id}`">
    <div v-if="mobile" @click="shareItemMobile" class="d-flex">
      <span :class="['material-icons btn-share', mobile ? 'md-24' : 'md-18']">share</span>
    </div>
    <div v-else>
      <!-- Button trigger modal -->
      <div :ref="`share-btn-${item.recipe.id}`" class="d-flex align-items-center mouse-pointer text-body ml-2" data-toggle="modal" :data-target="`#modal-${item.recipe.id}`">
        <span :class="['material-icons btn-share', mobile ? 'md-24' : 'md-18']">share</span>
      </div>

      <!-- Modal -->
      <social-sharing-modal v-bind:item="item" />
    </div>
  </div>
</template>

<style scoped>
/*.btn-share {
  margin-bottom: 2px;
}*/
</style>

<script>
// import { mapGetters } from 'vuex'
import { isMobile } from 'mobile-device-detect'
// import SocialSharingModal from './SocialSharingModal.vue'
const SocialSharingModal = () => import('./SocialSharingModal.vue')

export default {
  name: 'BtnShare',
  props: ['item'],
  components: {
    SocialSharingModal,
  },
  data () {
    return {
      // views: 0,
    }
  },
  computed: {
    // ...mapGetters(['isAuthenticated', 'user']),
    mobile () {
      return isMobile
    },
  },
  methods: {
    async shareItemMobile () {
      const shareData = {
        // title: 'MDN',
        // text: 'Learn web development on MDN!',
        // url: 'https://developer.mozilla.org',
        url: `${ window.location.origin }/r/${this.item.recipe.slug}`
      }
      // Must be triggered some kind of "user activation"
      try {
        await navigator.share(shareData)
        // resultPara.textContent = 'MDN shared successfully'
        console.log('MDN shared successfully')
      } catch(err) {
        // resultPara.textContent = 'Error: ' + err
        console.log('Error: ' + err)
      }
      console.log(shareData)
    },
  },
  beforeMount () {
    // this.recipeLog()
  },
  updated () {
    // this.recipeLog()
  }
}
</script>
