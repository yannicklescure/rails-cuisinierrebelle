<template>
  <div :style="{ marginTop: navbarHeight + 'px' }">
    <div v-if="item" class="container py-3 mb-5 recipe" style="height: auto !important;">
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
                  <div class="mr-3 btn btn-dark btn-sm py-0">Follow</div>
                </div>
              </div>
            </div>
          </div>
      <div class="d-flex flex-column flex-md-row align-items-center justify-content-center justify-content-md-end order-1 w-100">
        <div class="order-0 order-md-1 d-flex align-items-center mt-3 mt-md-0">
          <div id="print" class="mouse-pointer ml-3 text-decoration-none text-body">
            <i class="material-icons md-18 d-flex text-body">print</i>
          </div>
          <div class="mouse-pointer ml-3 text-body text-decoration-none d-flex align-items-center">
            <i class="material-icons md-18 align-icons">bookmark</i>
          </div>
          <div class="mouse-pointer ml-3 text-danger text-decoration-none d-flex align-items-center">
            <i class="material-icons md-18 align-icons">favorite</i>
            <span class="text-muted font-weight-lighter ml-1">
              {{ item.recipe.likesCount }}
            </span>
          </div>
          <div class="d-flex align-items-center ml-3">
            <i class="material-icons md-18 align-icons">visibility</i>
            <span class="text-muted font-weight-lighter ml-1">
              {{ item.recipe.viewsCount }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-md-5 order-1 order-md-1 d-flex flex-column justify-content-center align-items-center">
      <div class="text-center">
        <div class="h1">{{ item.recipe.title }}</div>
        <div v-if="item.recipe.subtile" class="h2 text-secondary">{{ item.recipe.subtile }}</div>
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

  {{ item.recipe.direction }}

  <div v-if="item.recipe.video" class="row mt-5 d-print-none">
    <div class="col col-md-8 mx-auto">
      <div class="embed-responsive embed-responsive-16by9">
        <iframe class="embed-responsive-item" :src="item.recipe.video" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
      </div>
    </div>
  </div>
  <div class="d-print-none">
  <hr>
  <div class="h4 mb-3">Other recipes</div>
    <card-small v-for="index in 5" :key="index" :componentKey="index" />
  </div>

  <div id="comments" ref="comments" class="d-print-none">
  <hr>
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
import CardSmall from '../components/CardSmall'

export default {
  name: 'Recipe',
  data () {
    return {
      componentKey: 0,
      navbarHeight: 0,
    }
  },
  components: {
    CardSmall
  },
  methods: {
    getNavbarHeight () {
      return this.$store.getters.navbarHeight
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
        window.scrollTo(scrollOptions);
        window.history.pushState("object or string", "Title", this.$route.path);
      }
    },
  },
  computed: {
    item () {
      return this.$store.getters.recipe(this.$route.params.id)
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.navbarHeight = this.getNavbarHeight()
      this.scroll2Anchor()
    })
  }
}
</script>
