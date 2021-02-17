<template>
  <div class="d-flex flex-column flex-md-row justify-content-between">
    <div id="recipe-user" :class="[{'mb-0': mobile}, 'd-print-none d-flex align-items-center order-0']">
      <div class="d-flex flex-grow-1 m-0 align-items-center">
        <div class="d-flex flex-grow-1 flex-grow-md-0 justify-content-between justify-md-content-start align-items-center">
          <img :src="item.user.image.thumb.url" width="24px" height="24px" class="rounded-circle mr-2" style="object-fit: cover;">
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
    <div v-if="!mobile && (item.user.id === currentUser.id)" class="d-print-none">
      <router-link :to="`/r/${item.recipe.slug}/edit`" class="text-body text-capitalize text-decoration-none" >{{ $t('recipe.edit') }}</router-link>
    </div>
    <div v-if="mobile" class="py-2">
      <div
        class="recipe-image d-flex justify-content-center align-items-center"
        v-lazy:background-image.container="item.recipe.photo.card.url"
      >
      </div>
    </div>
    <div v-if="mobile" class="d-flex order-0 align-items-center justify-content-between mb-3 mb-md-0 d-print-none">
      <div class="d-flex order-0 align-items-start">
        <btn-like :item="item" />
        <btn-comment :item="item" />
        <btn-share :item="item" />
      </div>
      <div class="d-flex order-1 align-items-end">
        <btn-visit :item="item" class="ml-2" />
        <btn-bookmark :item="item" />
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
</template>

<script>
import { mapGetters } from 'vuex'
const BtnBookmark = () => import('../buttons/Bookmark.vue')
const BtnComment = () => import('../buttons/Comment.vue')
const BtnLike = () => import('../buttons/Like.vue')
const BtnPrint = () => import('../buttons/Print.vue')
const BtnShare = () => import('../buttons/Share.vue')
const BtnVisit = () => import('../buttons/Visit.vue')

export default {
  name: 'RecipeHead',
  props: ['item'],
  components: {
    BtnBookmark,
    BtnComment,
    BtnLike,
    BtnPrint,
    BtnShare,
    BtnVisit,
  },
  computed: {
    ...mapGetters([
      'currentUser',
      'mobile',
    ]),
  },
}
</script>
