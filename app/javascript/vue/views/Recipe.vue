<template>
  <div :style="{ marginTop: navbarHeight + 'px' }" :key="componentKey">
    <div v-if="item.recipe.title" class="container py-3 mb-5 recipe" style="height: auto !important;">
      <div class="d-flex flex-column">
        <div class="d-flex order-0 order-md-0 flex-column align-items-center flex-md-row justify-content-md-between align-items-md-start mb-3 mb-md-0 d-print-none">
          <div id="recipe-user" class="d-flex w-100 align-items-center order-0">
            <div class="d-flex flex-grow-1 m-0 align-items-center">
              <div class="d-flex flex-grow-1 flex-grow-md-0 justify-content-between justify-md-content-start align-items-center">
                <img :src="item.user.image.thumb.url" width="24px" height="24px" class="rounded-circle mr-2" style="object-fit: cover;">
                <div class="d-flex order-0 justify-content-between justify-content-md-start flex-grow-1 align-items-center" data-user="1">
                  <div class="mr-md-2 d-flex align-items-center">
                    <router-link class="text-body" :to="'/u/' + item.user.slug">{{ item.user.name }}</router-link>
                    <span v-if="item.user.checked" data-toggle="tooltip" data-placement="top" title="Verified" class="d-flex ml-1">
                      <i class="material-icons md-16">check_circle</i>
                    </span>
                  </div>
                  <div class="d-none mr-3 btn btn-dark btn-sm py-0">Follow</div>
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex flex-column flex-md-row align-items-center justify-content-center justify-content-md-end order-1 w-100">
            <div class="order-0 order-md-1 d-flex align-items-center mt-3 mt-md-0">
              <print v-if="!mobile" :item="item" />
              <like :item="item" />
              <bookmark :item="item" />
              <visit :item="item" class="ml-2" />
            </div>
          </div>
        </div>
        <div class="mt-md-5 order-1 order-md-1 d-flex flex-column justify-content-center align-items-center">
          <div class="text-center">
            <div class="h1">{{ item.recipe.title }}</div>
            <div v-if="item.recipe.subtitle" class="h2 text-secondary">{{ item.recipe.subtitle }}</div>
          </div>
        </div>
      </div>
      <div class="my-3 my-md-5 d-print-none">
        <div
          class="recipe-image"
          :style="{ backgroundImage: 'url(' + item.recipe.photo.full.url + ')' }"
        ></div>
      </div>
      <div class="d-none d-print-block mt-3 mb-5 text-center">∾&nbsp;www.CuisinierRebelle.com&nbsp;∾</div>
      <div class="my-3 d-print-none">
        <Adsense
          data-ad-client="ca-pub-9223566768445571"
          data-ad-slot="4726766855">
        </Adsense>
      </div>
      <vue-markdown :source="item.recipe.direction" />

      <div v-if="item.recipe.video" class="row mt-5 d-print-none">
        <div class="col col-md-8 mx-auto">
          <div class="embed-responsive embed-responsive-16by9">
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
        <card-small v-for="index in 5" :key="index" />
      </div>

      <div id="comments" ref="comments" class="d-print-none mt-5">
        <div class="h4 mb-3">{{ $tc('recipe.comments', comments.length) }}</div>
        <div class="input-group my-3">
          <textarea id="new-user-registration" class="form-control" placeholder="Add a public comment..." aria-label="With textarea"></textarea>
        </div>
        <div class="input-group my-3">
          <div class="btn btn-light">Comment</div>
          <div class="btn btn-light comment-photo-btn" style="padding: 6px;"><i class="material-icons d-flex">add_photo_alternate</i></div>
        </div>
        <div v-for="comment, index in comments" :key="index" class="d-flex flex-column">
          <comment :item="comment" />
          <div v-for="reply, index in comment.replies" :key="index" class="d-flex align-items-start">
            <span class="material-icons md-18 mt-2">subdirectory_arrow_right</span>
            <comment :item="reply" class="pl-3 flex-grow-1" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { isMobile } from 'mobile-device-detect'
import { mapGetters } from 'vuex'
import axios from 'axios'
import Bookmark from '../components/Bookmark.vue'
import CardSmall from '../components/CardSmall.vue'
import Comment from '../components/Comment.vue'
import Like from '../components/Like.vue'
import Print from '../components/Print.vue'
import Visit from '../components/Visit.vue'
import VueMarkdown from 'vue-markdown'

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
          photo: {
            full: {
              url: null
            }
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
  components: {
    Bookmark,
    CardSmall,
    Comment,
    Like,
    Print,
    Visit,
    VueMarkdown,
  },
  computed: {
    ...mapGetters(['navbarHeight', 'recipe']),
    comments () {
      return this.item.comments.sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1).reverse()
    },
    mobile () {
      return isMobile
    },
  },
  methods: {
    scroll2Anchor () {
      // const currentPage = this.$route.fullpath
      const target = this.$route.hash
      console.log(this.$route)
      console.log(target)
      if(target) {
        console.log(this.$refs.comments)
        let element = this.$el.querySelector(target)

        const scrollOptions = {
          top: element.offsetTop - this.navbarHeight,
          left: 0,
          behavior: 'smooth'
        };
        window.scrollTo(scrollOptions)
        window.history.pushState("object or string", "Title", this.$route.path)
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
    // console.log(this.$el)
  },
  beforeMount () {
    this.fetchItem()
  },
  mounted () {
    this.$nextTick(() => {
      // this.scroll2Anchor()
      // setTimeout(() => {
      // }, 1000)
    })
  },
}
</script>
