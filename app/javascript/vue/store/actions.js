import Vue from 'vue'
import axios from 'axios'
import * as api from '../api'
import jwt from 'jsonwebtoken'
// import { getBannerPicture } from '../util/unsplash'

const fetchBannerImage = (context, {}) => {
  return api.fetchBannerImage(context, {})
    .then(response => {
      if (response.status === 200) context.commit("SET_BANNER_IMAGE", response.data)
    })
    .catch(error => {
      // console.log(error)
      return error
    })
}

const fetchUsers = (context, {}) => {
  return api.users(context, {})
    .then(response => {
      if (response.status === 200) context.commit("USERS", response)
    })
    .catch(error => {
      // console.log(error)
      return error
    })
}

const fetchPages = (context, {}) => {
  return api.fetchPages(context, {})
    .then(response => {
      context.commit("SET_PAGES", response.data)
    })
    .catch(error => {
      // console.log(error)
      return error
    })
}

const fetchStore = (context, {}) => {
  console.log('fetch state data')
  return api.fetchState(context, {})
    .then(response => {
      console.log(response)
      commit("SET_DATA", response.data)
      return response.data
    })
    .catch(error => {
      // console.log(error)
      return error
    })
}

export default {

  SET_STORE: async (context, {}) => {
    await fetchBannerImage(context, {})
    await fetchStore(context, {})
    await fetchPages(context, {})
    await fetchUsers(context, {})
    return true
  },

  SET_BANNER_IMAGE: (context, payload) => {
    // getBannerPicture()
    //   .then(image => {
    //     console.log(image)
    //     context.commit("SET_BANNER_IMAGE", image)
    //   })
    console.log(payload)
    context.commit("SET_BANNER_IMAGE", payload)
  },

  USER_NOTIFICATIONS: (context, payload) => {
    // console.log(payload)
    return api.userNotifications(context, payload)
      .then(response => {
        console.log(`response.status ${response.status}`)
        if (response.status === 200) context.commit("USER_NOTIFICATIONS", response)
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },

  NOTIFICATIONS: (context, payload) => {
    // console.log(payload)
    return api.notifications(context, payload)
      .then(response => {
        console.log(`response.status ${response.status}`)
        if (response.status === 200) context.commit("NOTIFICATIONS", response)
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },


  SEARCH: (context, payload) => {
    // console.log(payload)
    return api.search(context, payload)
      .then(response => {
        console.log(`response.status ${response.status}`)
        if (response.status === 200) context.commit("SEARCH", response)
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },

  REPLY_EDIT: (context, payload) => {
    // console.log(payload)
    return api.replyEdit(context, payload)
      .then(response => {
        console.log(`response.status ${response.status}`)
        if (response.status === 200) context.commit("REPLY_EDIT", response)
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },

  REPLY_DELETE: (context, payload) => {
    // console.log(payload)
    return api.replyDelete(context, payload)
      .then(response => {
        console.log(`response.status ${response.status}`)
        if (response.status === 204) context.commit("REPLY_DELETE", payload)
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },

  REPLY_LIKE: (context, payload) => {
    // console.log(payload)
    return api.replyLike(context, payload)
      .then(response => {
        console.log(`response.status ${response.status}`)
        if (response.status === 200) context.commit("REPLY_LIKE", payload)
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },

  REPLY_UNLIKE: (context, payload) => {
    // console.log(payload)
    return api.replyUnlike(context, payload)
      .then(response => {
        console.log(`response.status ${response.status}`)
        if (response.status === 204) context.commit("REPLY_UNLIKE", payload)
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },

  COMMENT_LIKE: (context, payload) => {
    // console.log(payload)
    return api.commentLike(context, payload)
      .then(response => {
        console.log(`response.status ${response.status}`)
        if (response.status === 200) context.commit("COMMENT_LIKE", payload)
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },

  COMMENT_UNLIKE: (context, payload) => {
    // console.log(payload)
    return api.commentUnlike(context, payload)
      .then(response => {
        console.log(`response.status ${response.status}`)
        if (response.status === 204) context.commit("COMMENT_UNLIKE", payload)
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },

  COMMENT_DELETE: (context, payload) => {
    // console.log(payload)
    return api.commentDelete(context, payload)
      .then(response => {
        console.log(`response.status ${response.status}`)
        if (response.status === 204) context.commit("COMMENT_DELETE", payload)
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },

  REPLY_NEW: (context, payload) => {
    // console.log(payload)
    return api.replyNew(context, payload)
      .then(response => {
        console.log(`response.status ${response.status}`)
        if (response.status === 200) context.commit("REPLY_NEW", response)
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },

  COMMENT_EDIT: (context, payload) => {
    // console.log(payload)
    return api.commentEdit(context, payload)
      .then(response => {
        console.log(`response.status ${response.status}`)
        if (response.status === 200) context.commit("COMMENT_EDIT", response)
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },

  COMMENT_NEW: (context, payload) => {
    // console.log(payload)
    return api.commentNew(context, payload)
      .then(response => {
        console.log(`response.status ${response.status}`)
        if (response.status === 200) context.commit("COMMENT_NEW", response)
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },

  BOOKMARK: (context, payload) => {
    // console.log(payload)
    return api.bookmark(context, payload)
      .then(response => {
        console.log(`response.status ${response.status}`)
        if (response.status === 200) context.commit("BOOKMARK", payload)
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },

  FOLLOWERS: (context, payload) => {
    // console.log(payload)
    return api.followers(context, payload)
      .then(response => {
        console.log(`response.status ${response.status}`)
        // if (response.status === 200) context.commit("FOLLOWERS", payload)
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },

  UNBOOKMARK: (context, payload) => {
    // console.log(payload)
        return api.unbookmark(context, payload)
      .then(response => {
        console.log(`response.status ${response.status}`)
        if (response.status === 204) context.commit("UNBOOKMARK", payload)
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },

  FOLLOW: (context, payload) => {
    // console.log(payload)
    return api.follow(context, payload)
      .then(response => {
        console.log(`response.status ${response.status}`)
        console.log(response)
        if (response.status === 200) context.commit("FOLLOW", response)
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },

  UNFOLLOW: (context, payload) => {
    // console.log(payload)
    return api.unfollow(context, payload)
      .then(response => {
        console.log(`response.status ${response.status}`)
        console.log(response)
        if (response.status === 200) context.commit("UNFOLLOW", payload)
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },

  LIKE: (context, payload) => {
    // console.log(payload)
    return api.like(context, payload)
      .then(response => {
        console.log(`response.status ${response.status}`)
        console.log(response)
        if (response.status === 200) context.commit("LIKE", payload)
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },

  UNLIKE: (context, payload) => {
    // console.log(payload)
        return api.unlike(context, payload)
      .then(response => {
        console.log(`response.status ${response.status}`)
        console.log(response)
        if (response.status === 204) context.commit("UNLIKE", payload)
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },

  IS_AUTHENTICATED: (context, payload) => {
    return api.isAuthenticated(payload)
      .then(response => {
        console.log(response)
        context.commit("IS_AUTHENTICATED", response)
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },

  USERS: (context, payload) => {
    // console.log(context.state.data.user)
    return api.users(context, payload)
      .then(response => {
        if (response.status === 200) context.commit("USERS", response)
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },

  PAGE_NEW: (context, payload) => {
    // console.log(context.state.data.user)
    return api.pageNew(context, payload)
      .then(response => {
        if (response.status === 200) {
          context.commit("PAGE_NEW", response)
        }
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },

  PAGE_EDIT: (context, payload) => {
    // console.log(context.state.data.user)
    return api.pageEdit(context, payload)
      .then(response => {
        if (response.status === 200) {
          context.commit("PAGE_EDIT", response)
        }
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },

  RECIPE_DELETE: (context, payload) => {
    // console.log(context.state.data.user)
    return api.recipeDelete(context, payload)
      .then(response => {
        console.log(response)
        if (response.status === 200) context.commit("RECIPE_DELETE", response)
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },

  RECIPE_EDIT: (context, payload) => {
    // console.log(context.state.data.user)
    return api.recipeEdit(context, payload)
      .then(response => {
        console.log(response)
        if (response.status === 200) context.commit("RECIPE_EDIT", response)
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },

  RECIPE_NEW: (context, payload) => {
    // console.log(context.state.data.user)
    return api.recipeNew(context, payload)
      .then(response => {
        if (response.status === 200) context.commit("RECIPE_NEW", response)
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },

  RECIPE: (context, payload) => {
    // console.log(context.state.data.user)
    return api.recipe(context, payload)
      .then(response => {
        if (response.status === 200) context.commit("RECIPE", response)
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },

  RECIPES: (context, payload) => {
    // console.log(context.state.data.user)
    return api.recipes(context, payload)
      .then(response => {
        if (response.status === 200) context.commit("RECIPES", response.data)
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },

  RECIPE_LOG: (context, payload) => {
    console.log(context.state.data.user)
    return api.recipeLog(context, payload)
      .then(response => {
        if (response.status === 200) context.commit("RECIPE_LOG", { data: payload, views: response.data.views })
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },

  REGISTRATION_CONFIRMATION: (context, payload) => {
    return api.confirmRegistration(context, payload)
      .then(response => {
        console.log(response)
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },

  SIGN_UP: (context, user) => {
    console.log(context.state.data)
    return api.signUp(context, user)
      .then(response => {
        console.log(response)
        // const token = response.headers.authorization.split('Bearer ')[1]
        // console.log(token)
        // console.log(jwt.decode(token))
        // if (response.status === 200) context.commit("SIGN_UP", response)
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },

  FACEBOOK_LOG_IN: (context, payload) => {
    const loginUser = payload => {
      console.log(payload)
      // LOGIN USER
      return api.login(context, payload)
        .then(response => {
          if (response.status === 200) context.commit("LOG_IN", response)
          return response
        })
        .catch(error => {
          // console.log(error)
          return error
        })
    }

    return api.facebookLogin(context, payload)
      .then(response => {
        console.log(response)
        if (response.data.isUser) {
          console.log(response)
          const payload = {
            authResponse: response.data.authResponse,
            user: {
              email: response.data.user.email,
              password: null
            }
          }
          console.log(payload)
          return loginUser(payload)
        }
        else {
          // CREATE USER
          // response.data.isFacebookUser = true
          // response.data.authResponse = response.data.authResponse
          // response.data.user.password = { accessToken: response.data.authResponse.accessToken }
          // console.log(response.data.user)
          const payload = {
            authResponse: response.data.authResponse,
            user: {
              first_name: response.data.user.firstName,
              last_name: response.data.user.lastName,
              email: response.data.user.email,
              // password: response.data.user.password,
              // confirmation: response.data.user.confirmation,
            }
          }
          console.log(payload)
          return api.signUp(context, payload)
            .then(response => {
              console.log(response)
              const payload = {
                authResponse: response.data.authResponse,
                user: {
                  email: response.data.user.email,
                  password: null
                }
              }
              return loginUser(payload)
            })
            .catch(error => {
              // console.log(error)
              return error
            })
        }
        // return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },

  PASSWORD_RESET: (context, payload) => {
    return api.passwordReset(context, payload)
      .then(response => {
        // if (response.status === 200) context.commit("LOG_IN", response)
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },

  PASSWORD_RESET_VERIFICATION: (context, payload) => {
    return api.passwordResetVerification(context, payload)
      .then(response => {
        // if (response.status === 200) context.commit("LOG_IN", response)
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },

  REQUEST_PASSWORD_RESET: (context, payload) => {
    return api.requestPasswordReset(context, payload)
      .then(response => {
        // if (response.status === 200) context.commit("LOG_IN", response)
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },

  RESEND_CONFIRMATION_INSTRUCTIONS: (context, payload) => {
    // console.log(context.state.data)
    return api.resendConfirmationInstructions(context, payload)
      .then(response => {
        // const token = response.headers.authorization.split('Bearer ')[1]
        // console.log(token)
        // console.log(jwt.decode(token))
        // if (response.status === 200) context.commit("LOG_IN", response)
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },

  LOG_IN: (context, user) => {
    // console.log(context.state.data)
    return api.login(context, user)
      .then(response => {
        // const token = response.headers.authorization.split('Bearer ')[1]
        // console.log(token)
        // console.log(jwt.decode(token))
        if (response.status === 200) context.commit("LOG_IN", response)
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
  },

  LOG_OUT: (context, {}) => {
    console.log(context.state.data)
    return api.logout(context, context.state.data.user.auth)
      .then(response => {
        console.log(response)
        if (response && response.status === 200) {
          context.commit("LOG_OUT", {})
          return response
        }
      })
  },

  REFRESH_ACCESS_TOKEN: (context, payload) =>  {
    return api.refreshAccessToken(context, {})
      .then(response => {
        console.log(response.data.message)
        context.commit("REFRESH_ACCESS_TOKEN", response)
        return response
      })
      .catch(error => {
        // console.log(error)
        return error
      })
    // refreshAccessToken
    // parseInt(new Date().getTime()/1000)
  },

  USER_DELETE: (context, payload) => {
    console.log(context.state.data)
    return api.userDelete(context, payload)
      .then(response => {
        console.log(response)
        if (response.status === 204) context.commit("USER_DELETE", {})
        return response
      })
  },

  NAVBAR_HEIGHT: (context, navbarHeight) => {
    context.commit("NAVBAR_HEIGHT", navbarHeight)
    // localStorage.setItem('cuisinier_rebelle', JSON.stringify(context.state.data))
  },

  // // FETCH_PAGES: (context, { id }) => {
  // //   const vueStore = JSON.parse(localStorage.getItem('vueStore'))
  // //   // console.log(vueStore)
  // //   if (vueStore) {
  // //     console.log('vueStore')
  // //     if ( new Date().getTime() - vueStore.lastUpdated > 1000 * 60 * 3 ) {
  // //       console.log('fetching server, refresh vueStore')
  // //       return createVueStorePage(context, { id })
  // //     } else {
  // //       console.log('loading vueStore')
  // //       context.commit("SET_PAGES", vueStore.data)
  // //       return vueStore
  // //     }
  // //   } else {
  // //     console.log('fetching server, initiate vueStore')
  // //     return createVueStorePage(context, { id })
  // //   }
  // // },

  // SEARCH_QUERY: (context, { query }) => {
  //   console.log(query)
  //   console.log('fetch search query')
  //   return context.dispatch('SET_STORE', {})
  //     .then(() => {
  //       return fetchSearchQuery(context, { query })
  //         .then(response => {
  //          console.log(response.data)
  //          context.commit("SET_SEARCH_POSTS", response.data.posts)
  //          // context.dispatch('FETCH_ITEMS', {})
  //          return response
  //         })
  //     })
  // },

  // FETCH_USER_POSTS: (context, { user }) => {
  //   console.log(user)
  //   console.log('fetch posts')
  //   return context.dispatch('SET_STORE', {})
  //     .then(() => {
  //       return fetchUserPosts(context, { user })
  //         .then(response => {
  //          console.log(response.data)
  //          context.commit("SET_USER_POSTS", response.data)
  //          // context.dispatch('FETCH_ITEMS', {})
  //          return response
  //         })
  //     })
  // },

  // ADD_NEW_COMMENT: (context, { ancestry, post }) => {
  //   return addNewComment(context, { ancestry, post })
  //     .then(response => {
  //       console.log(response.data)
  //       context.commit("SET_NEW_COMMENT", response.data)
  //       return response.data
  //     })
  //     .finally(result => {
  //       localStorage.setItem('vueStore', JSON.stringify(context.state))
  //       return result
  //     })
  // },

  // ADD_NEW_POST: (context, { post }) => {
  //   return addNewPost(context, { post })
  //     .then(response => {
  //       context.commit("SET_NEW_POST", response.data)
  //       return response.data
  //     })
  //     .finally(result => {
  //       localStorage.setItem('vueStore', JSON.stringify(context.state))
  //       return result
  //     })
  // },

  // FORWARD_POST: (context, { post, page }) => {
  //   return forwardPost(context, { post })
  //     .then(response => {
  //       // console.log(response)
  //       context.commit("SET_FORWARD_POST", { payload: response.data, page: page })
  //       return response
  //     })
  //     .finally(result => {
  //       localStorage.setItem('vueStore', JSON.stringify(context.state))
  //       return result
  //     })
  // },

  // EDIT_POST: (context, { post }) => {
  //   return editPost(context, { post })
  //     .then(response => {
  //       // console.log(response)
  //       context.commit("SET_EDIT_POST", response.data)
  //       return response
  //     })
  //     .finally(result => {
  //       localStorage.setItem('vueStore', JSON.stringify(context.state))
  //       return result
  //     })
  // },

  // DELETE_ITEM: (context, { id }) => {
  //   console.log(id)
  //   return deletePost(context, { id })
  //     .then(response => {
  //       console.log(response.data)
  //       context.commit("DELETE_POST", response.data)
  //       return response
  //     })
  //     .finally(result => {
  //       localStorage.setItem('vueStore', JSON.stringify(context.state))
  //       return result
  //     })
  // },

  // DELETE_COMMENT: (context, { post_id, comment_id }) => {
  //   console.log({ post_id, comment_id })
  //   return deleteComment(context, { id: comment_id })
  //     .then(response => {
  //       context.commit("REMOVE_COMMENT", { post_id, comment_id })
  //       return response
  //     })
  //     .finally(result => {
  //       localStorage.setItem('vueStore', JSON.stringify(context.state))
  //       return result
  //     })
  // },

  // PIN_POST: (context, { id }) => {
  //   console.log({ id })
  //   return pin(context, { id: id })
  //     .then(response => {
  //       context.commit("SET_PINNED_POST", response.data)
  //       console.log(response)
  //       return response
  //     })
  //     .finally(result => {
  //       localStorage.setItem('vueStore', JSON.stringify(context.state))
  //       return result
  //     })
  // },

  // LIKED_POST: (context, { id }) => {
  //   console.log(id)
  //   return liked(context, { id })
  //     .then(response => {
  //       if (context.state.data.userShow.posts.length > 0) {
  //         context.commit("SET_LIKED_POST_ALT", {
  //           id: id,
  //           status: response.status
  //         })
  //       } else {
  //         context.commit("SET_LIKED_POST", {
  //           id: id,
  //           status: response.status
  //         })
  //       }
  //       return response
  //     })
  //     .finally(result => {
  //       localStorage.setItem('vueStore', JSON.stringify(context.state))
  //       return result
  //     })
  // },

  // FOLLOW_USER: (context, { id, type }) => {
  //   console.log(id)
  //   return follow(context, { id, type })
  //     .then(response => {
  //       // if (context.state.data.userShow.posts.length > 0) {
  //         context.commit("SET_FOLLOWING", {
  //           id: id,
  //           data: response.data,
  //           type: type,
  //           status: response.status
  //         })
  //       // } else {
  //       //   context.commit("SET_LIKED_POST", {
  //       //     id: id,
  //       //     status: response.status
  //       //   })
  //       // }
  //       return response
  //     })
  //     .finally(result => {
  //       localStorage.setItem('vueStore', JSON.stringify(context.state))
  //       return result
  //     })
  // },

  // LOG_OUT: (context, {}) => {
  //   context.commit("SET_LOG_OUT", {})
  //   .then(() => {
  //     // localStorage.removeItem('vueStore');
  //     localStorage.setItem('vueStore', JSON.stringify(context.state))
  //   })
  // }
}
