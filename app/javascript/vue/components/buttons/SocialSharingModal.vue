<template>
  <div :ref="`modal-${item.recipe.id}`" class="modal fade" :id="`modal-${item.recipe.id}`" tabindex="-1" role="dialog" aria-labelledby="shareModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header d-flex align-items-center">
          <h5 class="modal-title" id="shareModalLabel">
            <span class="ml-2">{{ $t('item.share') }}</span>
          </h5>
          <button type="button" class="btn btn-sm close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <social-sharing v-bind:item="item"></social-sharing>
        </div>
        <div class="modal-footer d-flex justify-content-between">
          <span class="text-secondary">{{ itemCurrentUrl }}</span>
          <button
            @click="shareItemDesktop"
            class="btn btn-sm d-flex align-items-center"
            href="javascript:void(0)">
              <span class="material-icons md-18 mr-2">{{ contentCopy }}</span>{{ $t('item.copy_to_clipboard') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import SocialSharing from './SocialSharing.vue'
const SocialSharing = () => import('./SocialSharing.vue')

export default {
  name: 'SocialSharingModal',
  data () {
    return {
      contentCopy: 'content_copy',
    }
  },
  props: ['item'],
  components: {
    SocialSharing,
  },
  methods: {
    shareItemDesktop () {
      console.log(this.item.recipe.id)
      const text = `${ window.location.origin }/r/${ this.item.recipe.slug }`
      console.log(text)
      navigator.clipboard.writeText(text)
      .then(() => {
        console.log('Async: Copying to clipboard was successful!')
        this.contentCopy = 'done'
      }, err => {
        console.error('Async: Could not copy text: ', err)
        this.contentCopy = 'error'
      })
      .finally(() => {
        setTimeout(() => {
          // const alert = document.querySelector('.alert')
          // if (alert) fade(alert).remove()
          this.contentCopy = 'content_copy'
        }, 1500);
      })
    },
  },
  computed: {
    itemCurrentUrl () {
      const url = `${ window.location.origin }/r/${ this.item.recipe.slug }`
      // const url = 'https://www.cuisinierrebelle.com/r/plat-facile-2-viandes-4-legumes-pour-lendemain-de-fetes'
      return url.length >= 68 ? `${ url.substring(0, 65) }...` : url
    },
  }
}
</script>
