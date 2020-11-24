<template>
  <div class="d-flex flex-column flex-md-row justify-content-center justify-content-md-center">
    <ShareNetwork
      v-for="network in networks"
      :network="network.network"
      :key="network.network"
      :url="sharing.url"
      :title="sharing.title"
      :description="sharing.description"
      :quote="sharing.quote"
      :hashtags="sharing.hashtags"
      :twitterUser="sharing.twitterUser"
      class="mouse-pointer btn m-2 text-white d-flex flex-column"
    >
      <div class="d-flex justify-content-center align-items-center rounded rounded-circle mb-2" :style="`width:64px;height:64px;backgroundColor: ${ network.color }`">
        <i :class="network.icon"></i>
      </div>
      <span class="text-body">{{ network.name }}</span>
    </ShareNetwork>
  </div>
</template>

<script>

export default {
  name: 'SocialSharing',
  props: ['item'],
  data () {
    return {
      sharing: {
        url: `${ window.location.origin }/r/${ this.item.recipe.slug }`,
        title: '',
        description: '',
        // quote: 'The hot reload is so fast it\'s near instant. - Evan You',
        hashtags: `CuisinierRebelle,${ this.item.user.slug }`,
        // twitterUser: ''
      },
      networks: [
        { network: 'email', name: 'Email', icon: 'far fah fa-lg fa-envelope', color: '#333333' },
        { network: 'facebook', name: 'Facebook', icon: 'fab fah fa-lg fa-facebook-f', color: '#1877f2' },
        { network: 'telegram', name: 'Telegram', icon: 'fab fah fa-lg fa-telegram-plane', color: '#0088cc' },
        { network: 'twitter', name: 'Twitter', icon: 'fab fah fa-lg fa-twitter', color: '#1da1f2' },
        { network: 'vk', name: 'Vk', icon: 'fab fah fa-lg fa-vk', color: '#4a76a8' },
        { network: 'whatsapp', name: 'Whatsapp', icon: 'fab fah fa-lg fa-whatsapp', color: '#25d366' },
      ]
    }
  },
  beforeMount () {
    this.fixSharingData()
  },
  methods: {
    fixSharingData () {
      this.sharing.title = this.item.recipe.title ? this.item.recipe.title : 'Cuisinier Rebelle'
      // if (this.item.content === null) this.item.content = ''
      this.sharing.description = this.item.recipe.description.length >= 200 ? `${ this.item.recipe.description.substring(0, 197) }...` : this.item.recipe.description
    }
  },
}
</script>
