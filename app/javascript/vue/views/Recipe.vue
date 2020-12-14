<template>
  <div :style="{ paddingTop: navbarHeight + 'px' }" :key="componentKey">
    <div v-if="item.recipe.title" class="container py-3 mb-5 recipe" style="height: auto !important;">
      <div class="d-flex flex-column flex-md-row justify-content-between">
        <div id="recipe-user" :class="[{'mb-0': mobile}, 'd-flex align-items-center order-0']">
          <div class="d-flex flex-grow-1 m-0 align-items-center">
            <div class="d-flex flex-grow-1 flex-grow-md-0 justify-content-between justify-md-content-start align-items-center">
              <img v-lazy="item.user.image.thumb.url" width="24px" height="24px" class="rounded-circle mr-2" style="object-fit: cover;">
              <div class="d-flex order-0 justify-content-between justify-content-md-start flex-grow-1 align-items-center" data-user="1">
                <div class="mr-md-2 d-flex align-items-center">
                  <router-link
                    :to="'/u/' + item.user.slug"
                    class="text-body text-capitalize"
                    style="font-size: 90%"
                  >{{ item.user.name }}</router-link>
                  <span v-if="item.user.checked" data-toggle="tooltip" data-placement="top" title="Verified" class="d-flex ml-1">
                    <i class="material-icons md-16">check_circle</i>
                  </span>
                </div>
                <div class="d-none mr-3 btn btn-dark btn-sm py-0">Follow</div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="!mobile && (item.user.id === currentUser.id)">
          <router-link :to="`/r/${item.recipe.slug}/edit`" class="text-body text-capitalize text-decoration-none" >{{ $t('recipe.edit') }}</router-link>
        </div>
        <div v-if="mobile" class="py-2">
          <div
            class="recipe-image d-flex justify-content-center align-items-center"
            :style="{ backgroundImage: 'url(' + item.recipe.photo.card.url + ')' }"
          >
            <div ref="heartFillBig"></div>
            <div ref="bookmarkFillBig"></div>
          </div>
        </div>
        <div v-if="mobile" class="d-flex order-0 align-items-center justify-content-between mb-3 mb-md-0 d-print-none">
          <div class="d-flex order-0 align-items-start">
            <btn-like :item="item" @liked="heartFillBig" />
            <btn-comment :item="item" />
            <btn-share :item="item" />
          </div>
          <div class="d-flex order-1 align-items-end">
            <btn-visit :item="item" class="ml-2" />
            <btn-bookmark :item="item" @bookmarked="bookmarkFillBig" />
          </div>
        </div>
        <div v-else class="d-flex order-0 justify-content-between d-print-none">
          <div class="d-flex align-items-center justify-content-end order-1 w-100">
            <div class="d-flex order-1 align-items-center">
              <btn-print :item="item" />
              <btn-share :item="item" />
              <btn-like :item="item" />
              <btn-bookmark :item="item" />
              <btn-visit :item="item" class="ml-2" />
            </div>
          </div>
        </div>
      </div>
      <div class="mt-md-5 order-1 order-md-1 d-flex flex-column justify-content-center align-items-center">
        <div class="text-center">
          <div class="h1">{{ item.recipe.title }}</div>
          <div v-if="item.recipe.subtitle" class="h2 text-secondary">{{ item.recipe.subtitle }}</div>
        </div>
      </div>
      <div v-if="!mobile" class="my-5 d-print-none">
        <div
          class="recipe-image"
          :style="{ backgroundImage: 'url(' + item.recipe.photo.full.url + ')' }"
        ></div>
      </div>
      <div class="d-none d-print-block mt-3 mb-5 text-center">∾&nbsp;www.CuisinierRebelle.com&nbsp;∾</div>
      <div v-if="!localhost" class="my-3 d-print-none">
        <InArticleAdsense
          data-ad-client="ca-pub-9223566768445571"
          data-ad-slot="4726766855">
        </InArticleAdsense>
      </div>
      <vue-markdown-plus :source="item.recipe.direction" />

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

      <div class="d-print-none mt-5">
        <div class="h4 mb-3">{{ $t('recipe.otherRecipes') }}</div>
        <card-small v-for="index in 5" :key="'cs' + index" />
      </div>

      <div v-if="!localhost" class="my-3 d-print-none">
        <InArticleAdsense
          data-ad-client="ca-pub-9223566768445571"
          data-ad-slot="4726766855">
        </InArticleAdsense>
      </div>

      <div id="comments" ref="comments">
        <comments
          :item="item"
          v-on:lastCommentMounted="lastCommentMounted"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { isMobile } from 'mobile-device-detect'
import { mapGetters } from 'vuex'
// import axios from 'axios'
import VueMarkdownPlus from 'vue-markdown-plus'

// import BtnBookmark from '../components/buttons/Bookmark.vue'
// import BtnComment from '../components/buttons/Comment.vue'
// import BtnLike from '../components/buttons/Like.vue'
// import BtnPrint from '../components/buttons/Print.vue'
// import BtnShare from '../components/buttons/Share.vue'
// import BtnVisit from '../components/buttons/Visit.vue'
// import CardSmall from '../components/CardSmall.vue'
// import Comments from '../components/comments/List.vue'
const BtnBookmark = () => import('../components/buttons/Bookmark.vue')
const BtnComment = () => import('../components/buttons/Comment.vue')
const BtnLike = () => import('../components/buttons/Like.vue')
const BtnPrint = () => import('../components/buttons/Print.vue')
const BtnShare = () => import('../components/buttons/Share.vue')
const BtnVisit = () => import('../components/buttons/Visit.vue')
const CardSmall = () => import('../components/CardSmall.vue')
const Comments = () => import('../components/comments/List.vue')

export default {
  name: 'Recipe',
  data () {
    return {
      componentKey: 0,
      log: true,
      item: {
        comments: [],
        recipe: {
          title: null,
          subtitle: null,
          direction: null,
          description: null,
          photo: {
            full: {
              url: null
            },
            openGraph: {
              url: null
            },
          },
          video: null,
        },
        user: {
          image: {
            thumb: {
              url: null
            }
          },
          slug: null,
          name: null,
          checked: null,
        }
      },
      loading: false,
    }
  },
  metaInfo () {
    return {
      title: this.title,
      componentKey: 0,
      meta: [
        { vmid: 'description', name: 'description', content: this.item.recipe.description },
        { vmid: 'fb:app_id', property: 'fb:app_id', content: '570259036897585' },
        { vmid: 'og:site_name', property: 'og:site_name', content: 'Cuisinier Rebelle' },
        { vmid: 'og:title', property: 'og:title', content: `${ this.item.recipe.title } | Cuisinier Rebelle` },
        { vmid: 'og:description', property: 'og:description', content: this.item.recipe.description },
        { vmid: 'og:locale', property: 'og:locale', content: 'fr_FR' },
        { vmid: 'og:type', property: 'og:type', content: 'website' },
        { vmid: 'og:url', property: 'og:url', content: `https://www.cuisinierrebelle.com/r/${ this.$route.params.id }` },
        { vmid: 'og:image', property: 'og:image', content: this.item.recipe.photo.openGraph.url },
        { vmid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
        { vmid: 'twitter:site', name: 'twitter:site', content: '@cuisinierrebelle' },
        { vmid: 'twitter:creator', name: 'twitter:creator', content: '@cuisinierrebelle' },
        { vmid: 'twitter:title', name: 'twitter:title', content: `${ this.item.recipe.title } | Cuisinier Rebelle` },
        { vmid: 'twitter:description', name: 'twitter:description', content: this.item.recipe.description },
        { vmid: 'twitter:image', name: 'twitter:image', content: this.item.recipe.photo.openGraph.url },
      ]
    }
  },
  components: {
    BtnBookmark,
    BtnComment,
    BtnLike,
    BtnPrint,
    BtnShare,
    BtnVisit,
    CardSmall,
    Comments,
    VueMarkdownPlus,
  },
  computed: {
    ...mapGetters(['navbarHeight', 'recipe', 'currentUser']),
    // item () {
    //   return this.recipe(this.$route.params.id)
    // },
    mobile () {
      return isMobile
    },
    localhost () {
      return window.location.hostname === 'localhost'
    }
  },
  methods: {
    heartFillBig () {
      console.log('liked')
      this.$refs.heartFillBig.innerHTML = '<i class="material-icons md-96 text-danger">favorite</i>'
      setTimeout(() => {
        this.$refs.heartFillBig.innerHTML = ''
      }, 1000);
    },
    bookmarkFillBig () {
      console.log('liked')
      this.$refs.bookmarkFillBig.innerHTML = '<i class="material-icons md-96 text-body">bookmark</i>'
      setTimeout(() => {
        this.$refs.bookmarkFillBig.innerHTML = ''
      }, 1000);
    },
    lastCommentMounted (payload) {
      console.log(`lastCommentMounted ${payload}`)
      // this.scroll2Anchor(payload)
    },
    scroll2Anchor () {
      // const currentPage = this.$route.fullpath
      const target = this.$route.hash
      if(target && target === '#comments') {
        // console.log(this.$route)
        console.log(target)
        // console.log(target.match(/(?:#)(.+)/)[1])
        let element = this.$el.querySelector(target)
        // if (target.match(/(?:#)(.+)/)[1] === 'comments') element = this.$refs.comments
        console.log(element)
        if (element) {
          const scrollOptions = {
            top: element.offsetTop - this.navbarHeight,
            left: 0,
            behavior: 'smooth'
          };
          window.scrollTo(scrollOptions)
          window.history.pushState("object or string", "Title", this.$route.path)
        }
      }
    },
    fetchItem () {
      console.log('fetching recipe data')
      this.loading = true
      this.$store
        .dispatch('RECIPE', this.$route.params.id)
        .then( response => {
          console.log(response)
          this.item = response.data
          // if (this.log) {
          //   this.$store
          //     .dispatch('SET_STORE', {})
          //     .then(() => this.log = false)
          // }
          this.componentKey += 1
          this.loading = false
        })
        .finally(() => {
          this.scroll2Anchor()
        })
    },
  },
  watch: {
    async '$route' () {
      console.log(this.$route.params.id)
      await this.fetchItem()
      // this.recipeLog()
    }
  },
  beforeMount () {
    this.fetchItem()
  },
  mounted () {
    this.$nextTick(() => {
      // this.componentKey += 1
      // this.loading = false
      // this.scroll2Anchor()
      // setTimeout(() => {
      // }, 1000)
    })
  },
}
</script>
