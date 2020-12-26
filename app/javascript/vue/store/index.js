import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import { vuexLocal } from '../util/store';
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

export const createStore = () => {

  let vueStore = JSON.parse(localStorage.getItem('cuisinier_rebelle'))
  let data = {}

  if (vueStore) {
    // // Force Update
    // try {
    //   if (vueStore.timestamp && vueStore.timestamp < 1605233042272) vueStore = null
    //   else if (vueStore.data.timestamp && vueStore.data.timestamp < 1605317110896) vueStore = null
    //   else if (!vueStore.data.user.hasOwnProperty('locale')) vueStore = null
    //   else console.log('Nothing to lose !')
    // } catch (e) {
    //   console.log(e)
    // }

    // // Delete localStorage
    // if (vueStore == null) localStorage.removeItem('cuisinier_rebelle')
    localStorage.removeItem('cuisinier_rebelle')
  }

  vueStore = vuexLocal.storage.getItem()

  if (vueStore) {
    console.log('loading vueStore')
    data = vueStore.data
  }
  else {
    console.log('initiate vuex store')
    data = {
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

  return new Vuex.Store({
    state: {
      data: data
    },
    getters,
    mutations,
    actions,
    plugins: [vuexLocal.plugin]
  });
}
