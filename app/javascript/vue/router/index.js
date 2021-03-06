import axios from 'axios'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Meta from 'vue-meta'

Vue.use(VueRouter)
Vue.use(Meta)

import store from '../store'

import { vuexLocal } from '../util/store'
// console.log(vuexLocal.storage.getItem())

// import { createStore } from '../store'
// import { createRouter } from '../router'
// import { sync } from 'vuex-router-sync'

// create store and router instances
// const store = createStore()
// console.log(store)

// const router = createRouter()
// console.log(router)

// // sync the router with the vuex store.
// // this registers `store.state.route`
// const unsync = sync(store, router)
// // console.log('router')
// unsync()

const Admin = () => import('../views/Admin.vue')
const Bookmarks = () => import('../views/Bookmarks.vue')
const Home = () => import('../views/Home.vue')
const Login = () => import('../views/Login.vue')
const NotFound = () => import('../views/NotFound.vue')
const Notifications = () => import('../views/Notifications.vue')
const Page = () => import('../views/Page.vue')
const PageEdit = () => import('../views/PageEdit.vue')
const PageNew = () => import('../views/PageNew.vue')
const Pages = () => import('../views/Pages.vue')
const PasswordResetRequest = () => import('../views/password/Request.vue')
const PasswordReset = () => import('../views/password/Reset.vue')
const Recipe = () => import('../views/Recipe.vue')
const Recipes = () => import('../views/Recipes.vue')
const RecipeEdit = () => import('../views/RecipeEdit.vue')
const RecipeNew = () => import('../views/RecipeNew.vue')
const RegistrationConfirmation = () => import('../views/RegistrationConfirmation.vue')
const SearchRecipes = () => import('../views/SearchRecipes.vue')
const Signup = () => import('../views/Signup.vue')
const Top100 = () => import('../views/Top100.vue')
const UserDelete = () => import('../views/UserDelete.vue')
const UserFollowers = () => import('../views/UserFollowers.vue')
const UserFollowing = () => import('../views/UserFollowing.vue')
const UserRecipes = () => import('../views/UserRecipes.vue')
const UserSettings = () => import('../views/UserSettings.vue')

const nextAction = (to, from, next, isAuthenticated) => {
  if(to.meta.auth) {
    // console.log(`auth: ${ to.meta.auth }`)
    console.log(`name: ${ to.name }`)

    if (isAuthenticated) {
      if (to.name === 'Login') next({ name: 'Home' })
      else next()
    }
    else {
      if (to.name === 'Home') next()
      else if (to.name != 'Login') next({ name: 'Login' })
      else next()
    }
  }
  else next()
}

const ifAuthenticated = async (to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated
  nextAction(to, from, next, isAuthenticated)
}

const routes = [
  // {
  //   path: '/:locale',
  //   children: []
  // },
  // {
  //   // Include the locales you support between ()
  //   path: '/:locale(en|es|fr)?/:id?',
  //   // path: '/fr/r/:id',
  //   // component: {
  //   //   beforeRouteEnter: setLocale,
  //   //   beforeRouteUpdate: setLocale,
  //   //   // render(h) { return h('router-view'); }
  //   // },
  //   redirect: to => {
  //     console.log(to)
  //     const { hash, params, query } = to
  //     // if (query.to === 'foo') {
  //     //   return { path: '/foo', query: null }
  //     // }
  //     // if (hash === '#baz') {
  //     //   return { name: 'baz', hash: '' }
  //     // }
  //     if (params.id) {
  //       return '/r/:id'
  //     } else {
  //       return '/'
  //     }
  //   }
  // },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: {
      auth: true // A protected route
    },
    beforeEnter: ifAuthenticated,
  },

  {
    path: '/confirmation',
    name: 'RegistrationConfirmation',
    component: RegistrationConfirmation,
  },
  {
    path: '/s',
    name: 'Search',
    component: SearchRecipes,
  },
  {
    path: '/top100',
    name: 'Top100',
    component: Top100,
    meta: {
      auth: false // A protected route
    },
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      auth: true // A protected route
    },
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    meta: {
      auth: false // A protected route
    },
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/notifications',
    name: 'Notifications',
    component: Notifications,
    meta: {
      auth: true // A protected route
    },
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/bookmarks',
    name: 'Bookmarks',
    component: Bookmarks,
    meta: {
      auth: true // A protected route
    },
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/p/new',
    name: 'PageNew',
    component: PageNew,
    props: true,
    meta: {
      auth: true // A protected route
    },
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/p/:id/edit',
    name: 'PageEdit',
    component: PageEdit,
    props: true,
    meta: {
      auth: true // A protected route
    },
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/p/:id',
    name: 'Page',
    component: Page,
    meta: {
      auth: false // A protected route
    },
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/admin/pages',
    name: 'Pages',
    component: Pages,
    meta: {
      auth: false // A protected route
    },
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/u/:id',
    name: 'UserRecipes',
    component: UserRecipes,
    meta: {
      auth: false // A protected route
    },
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/:locale?/users/:id',
    redirect: '/u/:id'
  },
  {
    path: '/u/:id/followers',
    name: 'UserFollowers',
    component: UserFollowers,
    meta: {
      auth: false // A protected route
    },
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/u/:id/following',
    name: 'UserFollowing',
    component: UserFollowing,
    meta: {
      auth: true // A protected route
    },
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/u/:id/delete',
    name: 'UserDelete',
    component: UserDelete,
    meta: {
      auth: true // A protected route
    },
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/u/:id/settings',
    name: 'UserSettings',
    component: UserSettings,
    meta: {
      auth: true // A protected route
    },
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/r/:id/edit',
    name: 'RecipeEdit',
    component: RecipeEdit,
    props: true,
    meta: {
      auth: true // A protected route
    },
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/r/new',
    name: 'RecipeNew',
    component: RecipeNew,
    meta: {
      auth: true // A protected route
    },
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/recipes',
    name: 'Recipes',
    component: Recipes,
    meta: {
      auth: true // A protected route
    },
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/r/:id',
    name: 'Recipe',
    component: Recipe,
    meta: {
      auth: false // A protected route
    },
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/users/password/new',
    name: 'PasswordResetRequest',
    component: PasswordResetRequest,
    meta: {
      auth: false // A protected route
    },
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/users/password/reset',
    name: 'PasswordReset',
    component: PasswordReset,
    meta: {
      auth: false // A protected route
    },
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/:locale?/recipes/:id',
    redirect: '/r/:id'
  },
  {
    path: '/:locale/:controller/:id',
    redirect: '/:controller/:id'
  },
  {
    path: '/:locale(es|fr|en)?',
    name: 'Home',
    component: Home,
    meta: {
      auth: true // A protected route
    },
    beforeEnter: ifAuthenticated,
    children: [
    ]
  },
  { path: "*", component: NotFound }
]

const router = new VueRouter({
  mode: 'history',
  fallback: false,
  routes: routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

export default router
