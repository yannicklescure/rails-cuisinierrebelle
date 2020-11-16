import axios from 'axios'
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

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

const Bookmarks = () => import('../views/Bookmarks.vue')
const Home = () => import('../views/Home.vue')
const Login = () => import('../views/Login.vue')
const NotFound = () => import('../views/NotFound.vue')
const Recipe = () => import('../views/Recipe.vue')
const RecipeNew = () => import('../views/RecipeNew.vue')
const Signup = () => import('../views/Signup.vue')
const Top100 = () => import('../views/Top100.vue')
const UserFollowers = () => import('../views/UserFollowers.vue')
const UserFollowing = () => import('../views/UserFollowing.vue')
const UserSettings = () => import('../views/UserSettings.vue')
const UserRecipes = () => import('../views/UserRecipes.vue')

const ifAuthenticated = async (to, from, next) => {
  const vueStore = JSON.parse(localStorage.getItem('cuisinier_rebelle'))
  let isAuthenticated = false
  if (vueStore) {
    console.log(vueStore)
    if (vueStore.data.authorization) {
      // store
      //   .dispatch('IS_AUTHENTICATED', {})
      //   .then(response => {
      //     console.log(response)
      //     vueStore.data.isAuthenticated = response.isAuthenticated
      //     isAuthenticated = response.isAuthenticated
      //     localStorage.setItem('cuisinier_rebelle
      //   })
      await axios({
        method: 'get',
        url: `/api/v1/state`,
        headers: {
          'Authorization': `Bearer ${vueStore.data.authorization}`,
        },
        params: {
          query: 'isAuthenticated',
        }
      })
      .then(response => {
        // console.log(response)
        vueStore.data.isAuthenticated = response.data.isAuthenticated
        if (response.data.isAuthenticated === false) {
          vueStore.data.user = { email: null, authentication_token: null }
          vueStore.data.authorization = null
          vueStore.data.lastUpdated = new Date().getTime() + (1000 * 60 * 3)
        }
        isAuthenticated = response.data.isAuthenticated
        localStorage.setItem('cuisinier_rebelle', JSON.stringify({ data: vueStore.data }))
      })
      .catch(error => {
        console.log(error.response)
      })
    }
  }
  // const isAuthenticated = store.getters.isAuthenticated

  console.log(`from: ${from.path}`)
  console.log(`to: ${to.path}`)
  // store
  // .dispatch('IS_AUTHENTICATED', {})
  // .then(() => {
    console.log(`isAuthenticated: ${ isAuthenticated }`)
    if(to.meta.auth) {
      // console.log(`auth: ${ to.meta.auth }`)
      if (to.name === 'Login' && isAuthenticated) next({ name: 'Home' })
      if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
      else {
        // window.location.href = '/login'
        next()
      }
    }
    else next()
  // })
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
    path: '/bookmarks',
    name: 'Bookmarks',
    component: Bookmarks,
    meta: {
      auth: true // A protected route
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
    path: '/users/:id',
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
    path: '/u/:id/settings',
    name: 'UserSettings',
    component: UserSettings,
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
    path: '/r/:id',
    name: 'Recipe',
    component: Recipe,
    meta: {
      auth: false // A protected route
    },
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/recipes/:id',
    redirect: '/r/:id'
  },
  {
    path: '/:locale/:controller/:id',
    redirect: '/:controller/:id'
  },
  {
    path: '/:locale?',
    name: 'Home',
    component: Home,
    meta: {
      auth: false // A protected route
    },
    beforeEnter: ifAuthenticated,
    children: [
    ]
  },
  { path: "*", component: NotFound }
]

export const createRouter = () => {
  return new VueRouter({
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
}
