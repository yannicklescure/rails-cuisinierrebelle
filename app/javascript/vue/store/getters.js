// import { sortItemsDesc } from '../util/filters'
// import { filterDate } from '../util/filters'

const metaCsrf = document.querySelector("meta[name='csrf-token']")
const csrfToken = metaCsrf.getAttribute('content')
import { isMobile } from 'mobile-device-detect'

export default {
  // pages (state) {
  //   // state.data.pages.filter(page => page.id === this.$route.params.id )[0]
  //   // console.log(state.data.pages)
  //   return state.data.pages
  // },
  // searchPosts (state) {
  //   // console.log(state.data.searchPosts)
  //   return state.data.searchPosts.sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1).reverse()
  // },
  timestamp () {
    return state.data.timestamp
  },
  mobile () {
    return isMobile
  },
  csrfToken (state) {
    return csrfToken
  },
  bannerImage (state) {
    return state.data.bannerImage
  },
  isAuthenticated (state, getters) {
    return state.data.isAuthenticated
    // console.log(state.data.user)
    // return state.data.user.email != null
  },
  facebookAuth (state, getters) {
    // return state.data.isAuthenticated
    // console.log(state.data.user)
    return state.data.user.facebookAuth
  },
  search (state) {
    return state.data.search
  },
  navbarHeight (state) {
    // console.log(state)
    return state.data.render.navbarHeight
  },
  countRecipeComments (state) {
    return item => {
      const counts = item.comments.map(comment => comment.replies.length)
      let sum = counts.length
      counts.map(res => sum += res)
      return sum
    }
  },
  bookmarks (state) {
    return state.data.user.authentication_token ? state.data.user.bookmarks
      .sort((a, b) => (new Date(a.created_at).getTime() > new Date(b.created_at).getTime()) ? 1 : -1).reverse()
      .map(bookmark => state.data.recipes.filter(item => item.recipe.id === bookmark.recipe_id)[0]) : []
  },
  userRecipes (state) {
    return keyword => state.data.recipes.filter( item => {
      return item.user.slug === keyword
    })
    .sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1).reverse()
  },
  top100 (state) {
    return state.data.recipes.sort((a, b) => (a.recipe.views > b.recipe.views) ? 1 : -1).reverse().slice(0, 100)
  },
  recipe (state) {
    return keyword => state.data.recipes.filter( item => {
      return item.recipe.slug === keyword
    })[0];
  },
  recipes (state) {
    return state.data.recipes.sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1).reverse()
  },
  page (state) {
    return keyword => state.data.pages.filter( item => {
      return item.slug === keyword
    })[0];
  },
  pages (state) {
    return state.data.pages.sort((a, b) => (a.title > b.title) ? 1 : -1)
  },
  usersFilter (state) {
    return keyword => state.data.users.filter( user => {
      return user.slug === keyword
    })[0];
  },
  notifications (state) {
    return state.data.notifications
  },
  currentUser (state) {
    return state.data.user
  },
  // userPinnedPost (state) {
  //   return state.data.userShow.posts.filter(item => item.pin === true)
  // },
  // userShow (state, getters) {
  //   const pin = getters.currentUserPinnedPost.length > 0 ? getters.currentUserPinnedPost[0] : false
  //   console.log(pin)
  //   let arr = state.data.userShow.posts
  //   console.log(arr)
  //   if (pin) {
  //     arr.unshift(arr.splice(arr.indexOf(pin), 1)[0])
  //   }
  //   arr = arr.sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1).reverse()
  //   console.log(arr)
  //   return {
  //     user: state.data.userShow,
  //     posts: arr
  //   }
  //   // return state.data.userShow.posts.sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1).reverse()
  // },
  // posts (state, getters) {
  //   console.log(state.data.posts)
  //   // let arr = []
  //   // state.data.posts.forEach (post => {
  //   //   arr.push(post)
  //   //   post.forwards.forEach(item => arr.push(item))
  //   // })
  //   // // arr.push(state.data.posts)
  //   // console.log(arr)
  //   // return arr.sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1).reverse()
  //   return state.data.posts.sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1).reverse()
  // },
  // // last24hoursFeed (state) {
  // //   return sortItemsDesc(state.data.posts.filter(item => item.timestamp > filterDate(1)))
  // // },
  // // last7daysFeed (state) {
  // //   return sortItemsDesc(state.data.posts.filter(item => item.timestamp > filterDate(7)))
  // // },
  // // last30daysFeed (state) {
  // //   return sortItemsDesc(state.data.posts.filter(item => item.timestamp > filterDate(30)))
  // // },
  // // todayFeed (state) {
  // //   return sortItemsDesc(state.data.posts.filter(item => item.timestamp > new Date().setHours(0,0,0,0)))
  // // },
}
