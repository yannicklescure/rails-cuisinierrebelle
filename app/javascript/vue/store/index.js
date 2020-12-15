import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

export const createStore = () => {

  let vueStore = JSON.parse(localStorage.getItem('cuisinier_rebelle'))
  let data = {}

  if (vueStore) {
    // Force Update
    try {
      if (vueStore.timestamp && vueStore.timestamp < 1605233042272) vueStore = null
      else if (vueStore.data.timestamp && vueStore.data.timestamp < 1605317110896) vueStore = null
      else if (!vueStore.data.user.hasOwnProperty('locale')) vueStore = null
      else console.log('Nothing to lose !')
    } catch (e) {
      console.log(e)
    }

    // Delete localStorage
    if (vueStore == null) localStorage.removeItem('cuisinier_rebelle')
  }

  if (vueStore) {
    console.log('loading vueStore')
    data = vueStore.data
  }
  else {
    console.log('initiate vuex store')
    data = {
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
    actions
  });
}
