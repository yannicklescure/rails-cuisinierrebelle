import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

export const createStore = () => {

  const vueStore = JSON.parse(localStorage.getItem('cuisinier_rebelle'))
  let data = {}

  if (vueStore) {
    console.log('loading vueStore from store')
    data = vueStore.data
  }
  else {
    console.log('initiate vueStore from store')
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
      user: {
        email: null,
        authentication_token: null
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
