import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import { vuexLocal } from '../util/store';
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const setStore = data => {
  return new Vuex.Store({
    state: {
      data: data
    },
    getters,
    mutations,
    actions,
    plugins: [vuexLocal.plugin]
  })
}

const dataObj = () => {
  return {
    bannerImage: {
      id: null,
      url: null,
      link: {
        download: null,
      },
      user: {
        name: null,
        username: null
      }
    },
    authorization: null,
    isAuthenticated: false,
    lastUpdated: 0,
    recipes: [],
    search: {
      users: [],
      recipes: [],
    },
    timestamp: null,
    notifications: {
      data: []
    },
    user: {
      email: null,
      authentication_token: null,
      facebookAuth: false,
      locale: 'fr',
      bookmarks: [],
      followers: {
        count: 0,
        data: [],
      },
      following: {
        count: 0,
        data: [],
      }
    },
    pages: [],
    users: [],
    render: {
      navbarHeight: 0,
    }
  }
}

export const createStore = () => {

  let vueStore = JSON.parse(localStorage.getItem('cuisinier_rebelle'))
  if (vueStore) localStorage.removeItem('cuisinier_rebelle')

  console.log('initiate vuex store')
  const data = dataObj()

  return setStore(data)
}
