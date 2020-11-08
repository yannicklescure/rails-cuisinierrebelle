import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import { createStore } from '../store'
// import { createRouter } from '../router'
import { sync } from 'vuex-router-sync'

// create store and router instances
const store = createStore()
console.log(store)

const Home = () => import('../views/Home.vue')
const Login = () => import('../views/Login.vue')
const Recipe = () => import('../views/Recipe.vue')
const Signup = () => import('../views/Signup.vue')
const NotFound = { template: "<div>not found</div>" }

const ifAuthenticated = (to, from, next) => {
  const vueStore = JSON.parse(localStorage.getItem('cuisinier_rebelle'))

  console.log(`from: ${from.path}`)
  console.log(`to: ${to.path}`)
  // store
  // .dispatch('IS_AUTHENTICATED', {})
  // .then(() => {
    console.log(`isAuthenticated: ${ vueStore.data.isAuthenticated }`)
    if(to.meta.auth) {
      // console.log(`auth: ${ to.meta.auth }`)
      if (to.name === 'Login' && vueStore.data.isAuthenticated) next({ name: 'Home' })
      if (to.name !== 'Login' && !vueStore.data.isAuthenticated) next({ name: 'Login' })
      else {
        // window.location.href = '/login'
        next()
      }
    }
    else next()
  // })
}

const routes = [
  { path: '/fr', redirect: '/' },
  { path: '/en', redirect: '/' },
  { path: '/es', redirect: '/' },
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

// const router = createRouter()
// // console.log(router)

// // sync the router with the vuex store.
// // this registers `store.state.route`
// const unsync = sync(store, router)
// // console.log('router')
// unsync()
