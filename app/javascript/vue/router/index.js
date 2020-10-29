import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import { createStore } from '../store'
// import { createRouter } from '../router'
import { sync } from 'vuex-router-sync'

// create store and router instances
const store = createStore()
// console.log(store)

const Home = () => import('../views/Home.vue')
const Login = () => import('../views/Login.vue')
const Recipe = () => import('../views/Recipe.vue')
const Signup = () => import('../views/Signup.vue')

const ifAuthenticated = (to, from, next) => {
  store
  .dispatch('IS_AUTHENTICATED', {})
  .then(() => {
    console.log(`isAuthenticated: ${ store.getters.isAuthenticated }`)
    console.log(to)
    // console.log(from)
    if(to.meta.auth) {
      console.log(`auth: ${ to.meta.auth }`)
      if (to.name === 'Login' && store.getters.isAuthenticated) next({ name: 'Home' })
      if (to.name !== 'Login' && !store.getters.isAuthenticated) next({ name: 'Login' })
      else {
        // window.location.href = '/login'
        next()
      }
    }
    else next()
  })
}

export const createRouter = () => {
  return new VueRouter({
    mode: 'history',
    fallback: false,
    // base: '/p',
    routes: [
      // {
      //   path: '/manifeste',
      //   name: 'Manifeste',
      //   redirect: '/p/manifeste',
      // },
      // { path: '/', redirect: '/status/top' },
      { path: '/fr', redirect: '/' },
      { path: '/en', redirect: '/' },
      { path: '/es', redirect: '/' },
      // { path: '/logout', redirect: '/' },
      // {
      //   path: '/hashtag/:query',
      //   name: 'Hashtag',
      //   component: Hashtag,
      //   meta: {
      //     auth: true // A protected route
      //   },
      //   beforeEnter: ifAuthenticated,
      // },
      // {
      //   path: '/search',
      //   name: 'Search',
      //   component: Search,
      //   meta: {
      //     auth: true // A protected route
      //   },
      //   beforeEnter: ifAuthenticated,
      // },
      // {
      //   path: '/u/:user_id',
      //   redirect: '/:user_id'
      // },
      // {
      //   path: '/:user_id',
      //   name: 'User',
      //   component: User,
      //   meta: {
      //     auth: true // A protected route
      //   },
      //   beforeEnter: ifAuthenticated,
      // },
      // {
      //   path: '/:user_id/status/:id',
      //   name: 'Post',
      //   component: Post,
      //   meta: {
      //     auth: false // A protected route
      //   },
      //   beforeEnter: ifAuthenticated,
      // },
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
        path: '/r/:id',
        name: 'Recipe',
        component: Recipe,
        meta: {
          auth: false // A protected route
        },
        beforeEnter: ifAuthenticated,
      },
      {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
          auth: false // A protected route
        },
        beforeEnter: ifAuthenticated,
      },
    ],
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    }
  })
}

const router = createRouter()
// console.log(router)

// sync the router with the vuex store.
// this registers `store.state.route`
const unsync = sync(store, router)
// console.log('router')
unsync()
