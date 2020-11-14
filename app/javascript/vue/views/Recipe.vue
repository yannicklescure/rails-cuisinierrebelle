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
              <print :item="item" />
              <bookmark :item="item" />
              <like :item="item" />
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

      <vue-markdown :source="item.recipe.direction" />

      <div v-if="item.recipe.video" class="row my-5 d-print-none">
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
      <div class="d-print-none">
        <div class="h4 mb-3">{{ $t('recipe.otherRecipes') }}</div>
        <card-small v-for="index in 5" :key="index" />
      </div>

      <div id="comments" ref="comments" class="d-print-none">
        <div id="comments-count" class="d-flex">
          No comment
        </div>
        <div class="input-group my-3">
          <textarea id="new-user-registration" class="form-control" placeholder="Add a public comment..." aria-label="With textarea"></textarea>
        </div>
        <div class="input-group my-3">
          <a href="/users/sign_up" class="btn btn-light">Comment</a>
          <a href="/users/sign_up" class="btn btn-light comment-photo-btn" style="padding: 6px;"><i class="material-icons d-flex">add_photo_alternate</i></a>
        </div>
        <div id="comments-list">
          <div class="d-flex flex-column">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
import Bookmark from '../components/Bookmark.vue'
import CardSmall from '../components/CardSmall.vue'
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
    Like,
    Print,
    Visit,
    VueMarkdown,
  },
  computed: {
    ...mapGetters(['navbarHeight', 'recipe']),
    // item () {
    //   return this.recipe(this.$route.params.id)
    // },
  },
  methods: {
    recipeLog () {
      this.$store
        .dispatch('RECIPE_LOG', this.item)
        .then(response => console.log(response))
      this.log = false
    },
    scroll2Anchor () {
      const currentPage = this.$route.fullpath
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
          if (this.log) {
            this.$store
              .dispatch('SET_STORE', {})
              .then(() => this.recipeLog())
          }
          this.componentKey += 1
          this.loading = false
        })
    },
  },
  watch: {
    async '$route' () {
      console.log(this.$route.params.id)
      await this.fetchItem()
      this.recipeLog()
    }
  },
  beforeMount () {
    // console.log(this.$el)
  },
  created () {
    this.fetchItem()
  },
  mounted () {
    this.$nextTick(() => {
      this.scroll2Anchor()
      // setTimeout(() => {
      // }, 1000)
    })
  },
}
</script>
