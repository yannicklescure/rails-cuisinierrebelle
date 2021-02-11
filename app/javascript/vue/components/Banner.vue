<template>
  <div
    class="banner-background banner-height d-flex justify-content-center justify-content-md-center align-items-center flex-column"
    ref="banner"
    :style="`background-image: linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url('${ imageUrl }')`"
  >
    <div class="banner-height d-flex flex-column justify-content-between">
      <div class="d-flex flex-column flex-grow-1 justify-content-center align-items-center">
        <div class="container">
          <div id="banner-cta-box" class="text-center">
            <div class="h4 text-white text-center" v-html="$t('banner.introduction')"></div>
          </div>
          <div id="banner-cta-box-btn" class="d-flex mt-3 justify-content-center flex-column flex-md-row">
            <router-link
              to="/signup"
              class="btn btn-info mt-3 mx-3 mt-md-0"
            >{{ $t('banner.getStarted') }}</router-link>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-center text-muted">
        <div class="d-block mb-3">
          <div class="d-flex justify-content-center align-items-center">
              <span class="small">Photo by&nbsp;</span>
              <a
                :href="'https://unsplash.com/@' + image.user.username + '?utm_source=cuisinier_rebelle&utm_medium=referral&utm_campaign=api-credit'"
                target="_blank"
                class="text-light small"
              >{{ image.user.name }}</a>
              <span class="small">&nbsp;on&nbsp;</span>
              <a
                :href="'https://unsplash.com/?utm_source=cuisinier_rebelle&utm_medium=referral'"
                target="_blank"
                class="text-light small"
              >Unsplash</a>
              <a
                @click="imageTrackDownload"
                :href="image.link.download"
                target="_blank"
                class="ml-2 text-light text-decoration-none"
              >
                <span class="material-icons md-16 d-flex">get_app</span>
              </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import { fetchBannerPicture } from '../api'
// import Unsplash, { toJson } from 'unsplash-js';
// const unsplash = new Unsplash({ accessKey: 'nHSH2XMCvdAgrKbLMHs1M1u7vWUW8vxEmyHvDsTOLTs' });
// import { unsplash, getBannerPicture } from '../util/unsplash'

export default {
  name: 'Banner',
  props: ['displayCards'],
  data () {
    return {
      loading: true,
      // imageUrl: '',
      // viewport: {
      //   height: 0,
      //   width: 0,
      // },
      // image: {
      //   id: null,
      //   url: null,
      //   link: {
      //     download: null,
      //   },
      //   user: {
      //     name: null,
      //     username: null
      //   }
      // },
    }
  },
  methods: {
    // async getBannerPicture () {
    //   const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    //   const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    //   const viewport = {
    //     height: vh,
    //     width: vw,
    //   }
    //   const image = await getBannerPicture(viewport)
    //   console.log(image)
    //   this.$store
    //     .dispatch('SET_BANNER_IMAGE', image)
    // },

    imageTrackDownload () {
    //   console.log(`track download photo id ${this.image.id}`)
    //   unsplash.photos.getPhoto(this.image.id)
    //     .then(toJson)
    //     .then(json => {
    //       unsplash.photos.trackDownload(json);
    //     })
    //   // browser.downloads.download({
    //   //   url : this.image.link.download,
    //   //   filename : 'my-image-again.png',
    //   //   conflictAction : 'uniquify'
    //   // })
    },
    recipes () {
      // this.$router.push({ name: 'Recipes' })
      if (this.displayCards) this.$emit('scrollToCards', true)
      else this.$emit('loadCards', true)
    },
    // scrollToCards () {
    //   let element = document.querySelector('#recipes-cards')
    //   console.log(element)
    //   const scrollOptions = {
    //     top: element.offsetTop - this.navbarHeight,
    //     left: 0,
    //     behavior: 'smooth'
    //   };
    //   window.scrollTo(scrollOptions);
    // },

    // setBannerImage () {
    //   // this.$refs.banner.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url('${ this.image.url }')`
    // }
  //   loadImg () {
  //     this.imageUrl = `${ this.image.url }&w=${ this.viewport.width }&h=${ this.viewport.height }&fm=webp`
  //   },
  //   setImage () {
  //     let preloaderImg = new Image()
  //     preloaderImg.src = this.imageUrl
  //     preloaderImg.addEventListener('load', (event) => {
  //       this.$refs.banner.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url('${ preloaderImg.src }')`
  //       // this.$refs.banner.style.marginTop = this.navbarHeight + 'px'
  //       preloaderImg = null
  //     })
  //   }
  },
  computed: {
    ...mapGetters([
      'navbarHeight',
      'bannerImage',
    ]),
    imageUrl () {
      return `${ this.image.url }&w=${ this.viewport.width }&h=${ this.viewport.height }&fm=webp`
    },
    image () {
      return this.bannerImage
    },
    viewport () {
      const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
      const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
      return {
        height: vh,
        width: vw,
      }
    }
  },
  // created() {
  //   this.loadImg()
  // },
  // beforeMount () {
  // },
  // mounted () {
  //   this.$nextTick(() => {
  //     // this.$refs.banner.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url('${ this.imageUrl }')`
  //     // this.setImage()
  //     // const preload = document.querySelector('#banner-skeleton')
  //     // if (preload) preload.replaceWith(this.$refs.banner)
  //     // if (preload) preload.insertAdjacentHTML('afterbegin', this.$refs.banner.innerHTML)
  //   })
  // }
}
</script>
