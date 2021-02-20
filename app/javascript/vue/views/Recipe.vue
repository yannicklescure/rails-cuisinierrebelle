<template>
  <div v-if="loading" :style="{ marginTop: navbarHeight + 'px' }" class="container py-3 mb-5 recipe" :key="componentKey">
    <recipe-head :item="item" />
    <recipe-body :item="item" />

    <div v-if="localhost && loadAdsense" class="my-3 d-print-none">
      <InArticleAdsense
        data-ad-client="ca-pub-9223566768445571"
        data-ad-slot="4726766855">
      </InArticleAdsense>
    </div>

    <youtube :item="item" />

    <other-recipes />

    <div
      id="comments"
      ref="comments"
    >
      <comments
        v-if="loadComments"
        :item="item"
        v-on:lastCommentMounted="lastCommentMounted"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
const Comments = () => import('../components/comments/List.vue')
const Youtube = () => import('../components/videos/Youtube.vue')
const OtherRecipes = () => import('../components/OtherRecipes.vue')
const RecipeBody = () => import('../components/recipes/RecipeBody.vue')
const RecipeHead = () => import('../components/recipes/RecipeHead.vue')

export default {
  name: 'Recipe',
  data () {
    return {
      loadAdsense: false,
      loadComments: false,
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
    console.log(this.item)
    if (this.item != undefined) {
      return {
        title: this.item.recipe.title,
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
    }
  },
  components: {
    RecipeBody,
    RecipeHead,
    Comments,
    OtherRecipes,
    Youtube,
  },
  computed: {
    ...mapGetters([
      'navbarHeight',
      'recipe',
      'currentUser',
      'mobile',
    ]),
    // item () {
    //   return this.recipe(this.$route.params.id)
    // },
    localhost () {
      return (/(?:www\.)?cuisinierrebelle.com/).test(window.location.hostname)
    }
  },
  watch: {
    async '$route' () {
      console.log(this.$route.params.id)
      // await this.fetchItem()
      this.item = this.recipe(this.$route.params.id)
      this.loadAdsense = false
      // this.recipeLog()
    }
  },
  methods: {
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
    handleScroll (event) {
      if (this.loadAdsense == false) this.loadAdsense = true
    },
  },
  beforeCreate () {
    // this.fetchItem()
    console.log('fetching recipe data')
    // this.loading = true
    this.$store
      .dispatch('RECIPE', this.$route.params.id)
      .then( response => {
        console.log(response)
        this.item = response.data
        this.loading = true
      })
  },
  created () {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  mounted () {
    this.$nextTick(() => {
      this.loadComments = true
    })
  },
}
</script>
