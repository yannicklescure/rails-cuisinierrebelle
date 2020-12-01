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
        <font-awesome-layers class="fa-lg">
          <font-awesome-icon :icon="network.icon" />
        </font-awesome-layers>
      </div>
      <span class="text-body">{{ network.name }}</span>
    </ShareNetwork>
  </div>
</template>

<script>
import { FontAwesomeLayers, FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faFacebookF, faTelegramPlane, faTwitter, faVk, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
library.add(faEnvelope, faFacebookF, faTelegramPlane, faTwitter, faVk, faWhatsapp)

export default {
  name: 'SocialSharing',
  props: ['item'],
  components: {
    FontAwesomeIcon,
    FontAwesomeLayers,
  },
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
        { network: 'email', name: 'Email', icon: ['far', 'envelope'], color: '#333333' },
        { network: 'facebook', name: 'Facebook', icon: ['fab', 'facebook-f'], color: '#1877f2' },
        { network: 'telegram', name: 'Telegram', icon: ['fab', 'telegram-plane'], color: '#0088cc' },
        { network: 'twitter', name: 'Twitter', icon: ['fab', 'twitter'], color: '#1da1f2' },
        { network: 'vk', name: 'Vk', icon: ['fab', 'vk'], color: '#4a76a8' },
        { network: 'whatsapp', name: 'Whatsapp', icon: ['fab', 'whatsapp'], color: '#25d366' },
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
