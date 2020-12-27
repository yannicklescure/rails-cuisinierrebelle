<template>
  <div
    class="banner-background banner-height d-flex justify-content-center justify-content-md-center align-items-center flex-column mb-3"
    ref="banner"
    :style="`background-image: linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url('${ image.url }')`"
  >
    <div class="banner-height d-flex flex-column justify-content-between">
      <div class="d-flex flex-column flex-grow-1 justify-content-center align-items-center">
        <div class="container">
          <div id="banner-cta-box" class="text-center">
            <div class="lead text-white text-center" v-html="$t('banner.introduction')"></div>
          </div>
          <div id="banner-cta-box-btn" class="d-flex mt-3 justify-content-center flex-column flex-md-row">
            <router-link
              to="/login"
              class="btn btn-warning mt-3 mx-3 mt-md-0"
            >{{ $t('banner.login') }}</router-link>
            <router-link
              to="/signup"
              class="btn btn-info mt-3 mx-3 mt-md-0"
            >{{ $t('banner.getStarted') }}</router-link>
          </div>
        </div>
        <div class="btn btn-link m-3 text-muted" @click="scrollToCards">{{ $t('banner.seeRecipes') }}</div>
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
import { fetchBannerPicture } from '../api'
// import Unsplash, { toJson } from 'unsplash-js';
// const unsplash = new Unsplash({ accessKey: 'nHSH2XMCvdAgrKbLMHs1M1u7vWUW8vxEmyHvDsTOLTs' });
import { unsplash } from '../util/unsplash'

export default {
  name: 'Banner',
  data () {
    return {
      loading: true,
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
    // getBannerPicture () {
    //   const query = "cooking, food, chef"
    //   // fetchBannerPicture(query)
    //   unsplash.photos.getRandomPhoto({
    //       query: query
    //     })
    //     .then(toJson)
    //     .then(response => {
    //       console.log(response)
    //       this.image = {
    //         id: response.id,
    //         url: `${response.urls.raw}&w=1600&h=900&fm=webp`,
    //         link: {
    //           download: response.links.download,
    //         },
    //         user: {
    //           name: response.user.name,
    //           username: response.user.username,
    //         }
    //       }
    //     })
    //     .catch(error => {
    //       console.log(error.response)
    //     })
    // },

    imageTrackDownload () {
      console.log(`track download photo id ${this.image.id}`)
      unsplash.photos.getPhoto(this.image.id)
        .then(toJson)
        .then(json => {
          unsplash.photos.trackDownload(json);
        })
      // browser.downloads.download({
      //   url : this.image.link.download,
      //   filename : 'my-image-again.png',
      //   conflictAction : 'uniquify'
      // })
    },

    scrollToCards () {
      let element = document.querySelector('#recipes-cards')
      console.log(element)
      const scrollOptions = {
        top: element.offsetTop - this.navbarHeight,
        left: 0,
        behavior: 'smooth'
      };
      window.scrollTo(scrollOptions);
    },

    setBannerImage () {
      // this.$refs.banner.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url('${ this.image.url }')`
    }
  },
  computed: {
    ...mapGetters(['navbarHeight', 'bannerImage']),
    image () {
      return this.bannerImage
    }
  },
  beforeMount () {
    // const picture = new Image()
    // picture.src = this.image.url
  },
  mounted () {
    // this.getBannerPicture()
    // :style="'background-image: linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url(' + image.url + ')'"
    this.$nextTick(() => {
      this.setBannerImage()
      // this.setBannerImage()
    })
  }
}
</script>
