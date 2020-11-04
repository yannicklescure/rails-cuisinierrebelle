import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

export const createStore = () => {
  return new Vuex.Store({
    state: {
      data: {
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
    },
    getters,
    mutations,
    actions
  });
}
