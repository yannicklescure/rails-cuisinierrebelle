import Vue from 'vue'

const saveToLocalStorage = (state, caller) => {
  // console.log(caller)
  // console.log(state)
  // localStorage.setItem('cuisinier_rebelle', JSON.stringify({ data: state.data }))
}

const clearUserData = (state) => {
  state.data.user = {
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
  }
  state.data.authorization = {
    authorizationToken: null,
    refreshToken: null,
    expireAt: null
  }
  state.data.isAuthenticated = false

  return state
}

export default {

  SET_BANNER_IMAGE: (state, payload) => {
    console.log(payload)
    // state.data.bannerImage = payload
    state.data.bannerImage = payload.data.bannerImage
    saveToLocalStorage(state, 'SET_BANNER_IMAGE')
  },

  USER_NOTIFICATIONS: (state, payload) => {
    console.log(payload.data.notification)
    state.data.user.notification = payload.data.notification
    saveToLocalStorage(state, 'USER_NOTIFICATIONS')
  },

  NOTIFICATIONS: (state, payload) => {
    console.log(payload)
    // state.data.notifications = payload.data
    for (const [key, value] of Object.entries(payload.data)) {
      // console.log(`${key}: ${value}`)
      state.data.notifications[key] = payload.data[key]
    }
  },

  COMMENT_LIKE: (state, payload) => {
    // console.log('COMMENT_LIKE')
    state.data.user.commentLikes.push(payload.comment_id)

    const recipe = state.data.recipes.filter(r => r.recipe.id === payload.recipe_id)[0]
    const recipePosition = state.data.recipes.indexOf(recipe)
    const comment = state.data.recipes[recipePosition].comments.filter(r => r.id === payload.comment_id)[0]
    const commentPosition = state.data.recipes[recipePosition].comments.indexOf(comment)
    state.data.recipes[recipePosition].comments[commentPosition].likes += 1
    saveToLocalStorage(state, 'COMMENT_LIKE')
  },

  COMMENT_UNLIKE: (state, payload) => {
    const el = state.data.user.commentLikes.filter(r => r === payload.comment_id)[0]
    const position = state.data.user.commentLikes.indexOf(el)
    state.data.user.commentLikes.splice(position, 1)

    const recipe = state.data.recipes.filter(r => r.recipe.id === payload.recipe_id)[0]
    const recipePosition = state.data.recipes.indexOf(recipe)
    const comment = state.data.recipes[recipePosition].comments.filter(r => r.id === payload.comment_id)[0]
    const commentPosition = state.data.recipes[recipePosition].comments.indexOf(comment)
    state.data.recipes[recipePosition].comments[commentPosition].likes -= 1
    saveToLocalStorage(state, 'COMMENT_UNLIKE')
  },

  REPLY_LIKE: (state, payload) => {
    state.data.user.replyLikes.push(payload.reply_id)

    const recipe = state.data.recipes.filter(r => r.recipe.id === payload.recipe_id)[0]
    const recipePosition = state.data.recipes.indexOf(recipe)
    const comment = state.data.recipes[recipePosition].comments.filter(r => r.id === payload.comment_id)[0]
    const commentPosition = state.data.recipes[recipePosition].comments.indexOf(comment)
    const reply = state.data.recipes[recipePosition].comments[commentPosition].replies.filter(r => r.id === payload.reply_id)[0]
    const replyPosition = state.data.recipes[recipePosition].comments[commentPosition].replies.indexOf(reply)
    state.data.recipes[recipePosition].comments[commentPosition].replies[replyPosition].likes += 1
    saveToLocalStorage(state, 'REPLY_LIKE')
  },

  REPLY_UNLIKE: (state, payload) => {
    const el = state.data.user.replyLikes.filter(r => r === payload.reply_id)[0]
    const position = state.data.user.replyLikes.indexOf(el)
    state.data.user.replyLikes.splice(position, 1)

    const recipe = state.data.recipes.filter(r => r.recipe.id === payload.recipe_id)[0]
    const recipePosition = state.data.recipes.indexOf(recipe)
    const comment = state.data.recipes[recipePosition].comments.filter(r => r.id === payload.comment_id)[0]
    const commentPosition = state.data.recipes[recipePosition].comments.indexOf(comment)
    const reply = state.data.recipes[recipePosition].comments[commentPosition].replies.filter(r => r.id === payload.reply_id)[0]
    const replyPosition = state.data.recipes[recipePosition].comments[commentPosition].replies.indexOf(reply)
    state.data.recipes[recipePosition].comments[commentPosition].replies[replyPosition].likes -= 1
    saveToLocalStorage(state, 'REPLY_UNLIKE')
  },

  REPLY_EDIT: (state, payload) => {
    console.log(payload)
    // console.log(state)
    const recipe = state.data.recipes.filter(r => r.recipe.id === payload.data.recipe.id)[0]
    console.log(recipe)
    const position = state.data.recipes.indexOf(recipe)
    console.log(position)
    const comment = state.data.recipes[position].comments.filter(comment => comment.id === payload.data.id)[0]
    const pos = state.data.recipes[position].comments.indexOf(comment)
    state.data.recipes[position].comments[pos] = payload.data
    saveToLocalStorage(state, 'REPLY_EDIT')
  },

  REPLY_DELETE: (state, payload) => {
    console.log(payload)
    console.log(state)
    const recipe = state.data.recipes.filter(r => r.recipe.id === payload.recipe_id)[0]
    console.log(recipe)
    const position = state.data.recipes.indexOf(recipe)
    console.log(position)
    const comment = state.data.recipes[position].comments.filter(c => c.id === payload.comment_id)[0]
    const pos = state.data.recipes[position].comments.indexOf(comment)
    const reply = state.data.recipes[position].comments[pos].replies.filter(r => r.id === payload.id)[0]
    const p = state.data.recipes[position].comments[pos].replies.indexOf(reply)
    state.data.recipes[position].comments[pos].replies.splice(p, 1)
    saveToLocalStorage(state, 'REPLY_DELETE')
  },

  REPLY_NEW: (state, payload) => {
    console.log(payload)
    // console.log(state)
    const recipe = state.data.recipes.filter(r => r.recipe.id === payload.data.recipe.id)[0]
    console.log(recipe)
    const position = state.data.recipes.indexOf(recipe)
    console.log(position)
    const comment = state.data.recipes[position].comments.filter(comment => comment.id === payload.data.id)[0]
    const pos = state.data.recipes[position].comments.indexOf(comment)
    state.data.recipes[position].comments[pos] = payload.data
    saveToLocalStorage(state, 'REPLY_NEW')
  },

  COMMENT_DELETE: (state, payload) => {
    console.log(payload)
    // console.log(state)
    const recipe = state.data.recipes.filter(r => r.recipe.id === payload.recipe_id)[0]
    console.log(recipe)
    const position = state.data.recipes.indexOf(recipe)
    console.log(position)
    const comment = state.data.recipes[position].comments.filter(c => c.id === payload.comment_id)[0]
    const pos = state.data.recipes[position].comments.indexOf(comment)
    state.data.recipes[position].comments.splice(pos, 1)
    saveToLocalStorage(state, 'COMMENT_DELETE')
  },

  COMMENT_EDIT: (state, payload) => {
    console.log(payload)
    // console.log(state)
    const recipe = state.data.recipes.filter(r => r.recipe.id === payload.data.recipe.id)[0]
    console.log(recipe)
    const position = state.data.recipes.indexOf(recipe)
    console.log(position)
    const comment = state.data.recipes[position].comments.filter(comment => comment.id === payload.data.id)[0]
    const pos = state.data.recipes[position].comments.indexOf(comment)
    state.data.recipes[position].comments[pos] = payload.data
    saveToLocalStorage(state, 'COMMENT_EDIT')
  },

  COMMENT_NEW: (state, payload) => {
    console.log(payload)
    // console.log(state)
    const recipe = state.data.recipes.filter(r => r.recipe.id === payload.data.recipe.id)[0]
    console.log(recipe)
    const position = state.data.recipes.indexOf(recipe)
    console.log(position)
    state.data.recipes[position].comments.push(payload.data)
    saveToLocalStorage(state, 'COMMENT_NEW')
  },

  BOOKMARK: (state, payload) => {
    console.log(payload)
    // console.log(state)
    state.data.user.bookmarks.push(payload)
    console.log(`bookmarks: ${ state.data.user.bookmarks.length }`)

    const recipe = state.data.recipes.filter(recipe => recipe.recipe.id === payload.recipe_id)[0]
    const position = state.data.recipes.indexOf(recipe)
    state.data.recipes[position].recipe.bookmarks += 1
    saveToLocalStorage(state, 'BOOKMARK')
  },

  UNBOOKMARK: (state, payload) => {
    console.log(payload)
    // console.log(state)
    const bookmark = state.data.user.bookmarks.filter(bookmark => bookmark.recipe_id === payload.recipe_id)[0]
    let position = state.data.user.bookmarks.indexOf(bookmark)
    state.data.user.bookmarks.splice(position, 1)
    console.log(`bookmarks: ${ state.data.user.bookmarks.length }`)

    const recipe = state.data.recipes.filter(recipe => recipe.recipe.id === payload.recipe_id)[0]
    position = state.data.recipes.indexOf(recipe)
    state.data.recipes[position].recipe.bookmarks -= 1
    saveToLocalStorage(state, 'UNBOOKMARK')
  },

  FOLLOW: (state, payload) => {
    console.log(payload)
    state.data.user.following.count += 1
    state.data.user.following.data.push(payload.data.user)
    const user = state.data.users.filter(user => user.slug === payload.data.user.slug)[0]
    const position = state.data.users.indexOf(user)
    state.data.users[position].followers.count += 1
    state.data.users[position].followers.data.push(payload.data.user)
    saveToLocalStorage(state, 'FOLLOW')
  },

  UNFOLLOW: (state, payload) => {
    console.log(payload)
    state.data.user.following.count -= 1
    let user = state.data.user.following.data.filter(user => user.slug === payload.user)[0]
    let position = state.data.user.following.data.indexOf(user)
    state.data.user.following.data.splice(position, 1)
    user = state.data.users.filter(user => user.slug === payload.user)[0]
    position = state.data.users.indexOf(user)
    state.data.users[position].followers.count -= 1
    state.data.users[position].followers.data.splice(position, 1)
    saveToLocalStorage(state, 'UNFOLLOW')
  },

  LIKE: (state, payload) => {
    console.log(payload)
    // console.log(state)
    state.data.user.likes.push(payload)
    console.log(`user's likes: ${ state.data.user.likes.length }`)

    const recipe = state.data.recipes.filter(recipe => recipe.recipe.id === payload.recipe_id)[0]
    const position = state.data.recipes.indexOf(recipe)
    state.data.recipes[position].recipe.likes += 1
    saveToLocalStorage(state, 'LIKE')
  },

  UNLIKE: (state, payload) => {
    console.log(payload)
    // console.log(state)
    const like = state.data.user.likes.filter(like => like.recipe_id === payload.recipe_id)[0]
    let position = state.data.user.likes.indexOf(like)
    state.data.user.likes.splice(position, 1)
    console.log(`user's likes: ${ state.data.user.likes.length }`)

    const recipe = state.data.recipes.filter(recipe => recipe.recipe.id === payload.recipe_id)[0]
    position = state.data.recipes.indexOf(recipe)
    state.data.recipes[position].recipe.likes -= 1
    saveToLocalStorage(state, 'UNLIKE')
  },

  SET_DATA: (state, payload) => {
    // console.log(state)
    // console.log(payload)
    for (const [key, value] of Object.entries(payload.data)) {
      // console.log(`${key}: ${value}`)
      state.data[key] = payload.data[key]
    }
    // state.data = payload.data
    console.log(state.data)
    // state.data.lastUpdated = new Date().getTime()
    saveToLocalStorage(state, 'SET_DATA')
  },

  SET_PAGES: (state, payload) => {
    // console.log(state)
    console.log(payload)
    // for (const [key, value] of Object.entries(payload.data)) {
    //   // console.log(`${key}: ${value}`)
    //   state.data.pages[key] = payload.data[key]
    // }
    // state.data.bannerImage = payload.data.bannerImage
    state.data.pages = payload.data.pages
    // state.data = payload.data
    console.log(state.data)
    // state.data.lastUpdated = new Date().getTime()
    saveToLocalStorage(state, 'SET_PAGES')
  },

  PAGE_NEW: (state, payload) => {
    state.data.pages.push(payload.data)
    saveToLocalStorage(state, 'PAGE_NEW')
  },

  PAGE_EDIT: (state, payload) => {
    const page = state.data.pages.filter(r => r.id === payload.data.id)[0]
    console.log(page)
    if (page) {
      const position = state.data.pages.indexOf(page)
      console.log(position)
      state.data.pages[position] = payload.data
      saveToLocalStorage(state, 'PAGE_EDIT')
    }
  },

  RECIPE_DELETE: (state, payload) => {
    console.log(payload)
    console.log(state.data.recipes.length)
    const recipe = state.data.recipes.filter(item => item.recipe.id === parseInt(payload.data.recipe.id))[0]
    console.log(recipe)
    const position = state.data.recipes.indexOf(recipe)
    console.log(position)
    state.data.recipes.splice(position, 1)
    console.log(state.data.recipes.length)
    saveToLocalStorage(state, 'RECIPE_DELETE')
  },

  RECIPE_EDIT: (state, payload) => {
    console.log(payload)
    saveToLocalStorage(state, 'RECIPE_EDIT')
  },

  RECIPE_NEW: (state, payload) => {
    state.data.recipes.push(payload.data)
    // state.data.lastUpdated = new Date().getTime()
    saveToLocalStorage(state, 'RECIPE_NEW')
  },

  RECIPE: (state, payload) => {
    // console.log('### RECIPE ###')
    // console.log(state)
    // console.log(payload)
    const recipe = state.data.recipes.filter(r => r.recipe.id === parseInt(payload.data.recipe.id))[0]
    console.log(recipe)
    if (recipe) {
      const position = state.data.recipes.indexOf(recipe)
      console.log(position)
      state.data.recipes[position] = payload.data
      // console.log(state.data)
      // state.data.lastUpdated = new Date().getTime()
      saveToLocalStorage(state, 'RECIPE')
    }
  },

  USERS: (state, payload) => {
    // console.log('### USERS ###')
    // console.log(payload)
    state.data.users = payload.data.data.users
    // state.data.lastUpdated = new Date().getTime()
    saveToLocalStorage(state, 'USERS')
  },

  RECIPES: (state, payload) => {
    console.log('### RECIPES ###')
    console.log(state)
    console.log(payload)
    state.data.recipes = payload.data.recipes
    saveToLocalStorage(state, 'RECIPES')
  },

  SEARCH: (state, payload) => {
    console.log('### SEARCH ###')
    console.log(state)
    console.log(payload)
    state.data.search.recipes = payload.data.recipes
    // state.data.lastUpdated = new Date().getTime()
    saveToLocalStorage(state, 'SEARCH')
  },

  RECIPE_LOG: (state, payload) => {
    console.log(payload)
    const recipe = state.data.recipes.filter(r => r.recipe.id === payload.data.recipe.id)[0]
    console.log(recipe)
    const position = state.data.recipes.indexOf(recipe)
    console.log(position)
    state.data.recipes[position].recipe.views = payload.views
    // state.data.user.points.splice(position, 1)
    saveToLocalStorage(state, 'RECIPE_LOG')
  },

  LOG_IN: (state, payload) => {
    console.log(payload)
    // for (const [key, value] of Object.entries(payload.data)) {
    //   // console.log(`${key}: ${value}`);
    //   state.data[key] = payload.data[key]
    // }
    state.data.user = payload.data

    // console.log(payload.headers['access-token'])
    // console.log(payload.headers['refresh-token'])
    state.data.authorization = {
      authorizationToken: payload.headers['access-token'],
      refreshToken: payload.headers['refresh-token'],
      expireAt: payload.headers['expire-at']
    }
    state.data.isAuthenticated = true
    saveToLocalStorage(state, 'LOG_IN')
  },

  LOG_OUT: (state, payload) => {
    console.log(payload)
    // console.log(state)
    state = clearUserData(state)
    saveToLocalStorage(state, 'LOG_OUT')
  },

  IS_AUTHENTICATED: (state, payload) => {
    console.log(payload)
    state.data.isAuthenticated = payload.data.isAuthenticated
    if (payload.data.isAuthenticated) {
      console.log('User is authenticated.')
    }
    else {
      state = clearUserData(state)
      saveToLocalStorage(state, 'IS_AUTHENTICATED')
    }
  },

  REFRESH_ACCESS_TOKEN: (state, payload) => {
    // console.log(payload)
    // for (const [key, value] of Object.entries(payload.data)) {
    //   console.log(`${key}: ${value}`);
    //   state.data[key] = payload.data[key]
    // }
    // state.data.user = payload.data
    // state.data.authorization = payload.headers.authorization.split('Bearer ')[1]
    // console.log(payload.headers['access-token'])
    // console.log(payload.headers['refresh-token'])
    // console.log(payload.headers['expire-at'])
    state.data.authorization = {
      authorizationToken: payload.headers['access-token'],
      refreshToken: payload.headers['refresh-token'],
      expireAt: payload.headers['expire-at']
    }
    state.data.isAuthenticated = true
    saveToLocalStorage(state, 'REFRESH_ACCESS_TOKEN')
  },

  USER_DELETE: (state, payload) => {
    console.log('USER_DELETE')
  },

  NAVBAR_HEIGHT: (state, payload) => {
    state.data.render.navbarHeight = payload
    // context.commit("NAVBAR_HEIGHT", navbarHeight)
    saveToLocalStorage(state, 'NAVBAR_HEIGHT')
  },


  // SET_NEW_COMMENT: (state, payload) => {
  //   console.log(payload)
  //   const item = state.data.posts.filter(item => item.id === parseInt(state.route.params.id))[0]
  //   // console.log(item)

  //   const id = parseInt(state.data.lastCommentId) + 1
  //   state.data.lastCommentId = id

  //   const newComment = {
  //     children: null,
  //     content: payload.content,
  //     id: id,
  //     name: payload.name,
  //     slug: payload.slug,
  //     picture: payload.picture,
  //     timestamp: payload.timestamp,
  //     user_id: payload.user_id,
  //     parent: null
  //   }

  //   if (payload.parent === null) {
  //     // console.log('new comment')
  //   } else {
  //     console.log('new reply')
  //     const parent = item.comments.filter(item => item.id === parseInt(payload.parent))[0]
  //     newComment.parent = {
  //       ancestry: null,
  //       content: parent.content,
  //       created_at: new Date(parent.timestamp).toISOString(),
  //       id: parent.id,
  //       updated_at: new Date(parent.timestamp).toISOString(),
  //       user_id: parent.user_id
  //     }
  //     if (parent.children === null) parent.children = []
  //     parent.children.push({
  //       content: payload.content,
  //       id: id,
  //       name: payload.name,
  //       slug: payload.slug,
  //       picture: payload.picture,
  //       timestamp: payload.timestamp,
  //       user_id: payload.user_id
  //     })
  //   }
  //   item.comments.push(newComment)
  // },

  // SET_FOLLOWING: (state, payload) => {
  //   console.log(payload)
  //   // const post = state.data.user.following.filter(item => item.id === parseInt(payload.id))[0]
  //   console.log(payload.type)
  //   if (payload.type === 'follow') {
  //     state.data.user.following.push({
  //       id: payload.data.id,
  //       name: payload.data.name,
  //       slug: payload.data.slug,
  //       picture: payload.data.picture,
  //     })
  //     console.log(state.data.user.following)
  //   }
  //   else {
  //     const position = state.data.user.following.map(user => user.id).indexOf(parseInt(payload.id))
  //     if (position >= 0) {
  //       state.data.user.following.splice(position, 1)
  //     } else {
  //       console.log('error: cannot find element')
  //       console.log(`position ${position}`)
  //       console.log(payload.id)
  //       console.log(state.data.user.following)
  //     }
  //   }
  // },

  // SET_LIKED_POST: (state, payload) => {
  //   console.log(payload)
  //   const post = state.data.posts.filter(item => item.id === parseInt(payload.id))[0]
  //   // const position = state.data.posts.indexOf(post)
  //   // state.data.posts.splice(position, 1)
  //   if (payload.status === 200) {
  //     // post.points += 1
  //     state.data.user.points.push(parseInt(payload.id))
  //   }
  //   else {
  //     // post.points -= 1
  //     const position = state.data.user.points.indexOf(parseInt(payload.id))
  //     state.data.user.points.splice(position, 1)
  //   }
  // },

  // SET_LIKED_POST_ALT: (state, payload) => {
  //   console.log(payload)
  //   const post = state.data.userShow.posts.filter(item => item.id === parseInt(payload.id))[0]
  //   // const position = state.data.posts.indexOf(post)
  //   // state.data.posts.splice(position, 1)
  //   if (payload.status === 200) {
  //     // post.points += 1
  //     state.data.user.points.push(parseInt(payload.id))
  //   }
  //   else {
  //     // post.points -= 1
  //     const position = state.data.user.points.indexOf(parseInt(payload.id))
  //     state.data.user.points.splice(position, 1)
  //   }
  // },

  // SET_PINNED_POST: (state, payload) => {
  //   console.log(payload)
  //   const post = state.data.userShow.posts.filter(item => item.id === parseInt(payload.id))[0]
  //   const position = state.data.userShow.posts.indexOf(post)
  //   console.log(position)
  //   console.log(payload.pin)
  //   if (position != 0) state.data.userShow.posts[0].pin = false
  //   state.data.userShow.posts[position].pin = payload.pin

  //   let arr = state.data.userShow.posts.sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1).reverse()
  //   if (payload.pin) {
  //     const pin = state.data.userShow.posts.filter(item => item.pin === true)[0]
  //     console.log(pin)
  //     if (pin) {
  //       arr.unshift(arr.splice(arr.indexOf(pin), 1)[0])
  //     }
  //   }
  //   console.log(arr)
  //   state.data.userShow.posts = arr
  // },

  // DELETE_POST: (state, payload) => {
  //   console.log(payload)
  //   if (payload.parentId) {
  //     const post = state.data.posts.filter(item => item.id === parseInt(payload.parentId))[0]
  //     console.log(post)
  //     const forward = post.forwards.filter(item => item.id === parseInt(payload.forwardId))[0]
  //     let position = post.forwards.indexOf(forward)
  //     post.forwards.splice(position,1)
  //     position = state.data.posts.indexOf(post)
  //     state.data.posts.splice(position, 1, post)
  //   }
  //   if (state.route.name === 'user') {
  //     console.log(payload)
  //     const post = state.data.userShow.posts.filter(item => item.id === parseInt(payload.postId))[0]
  //     console.log(post)
  //     if (post.forward) {
  //       const parent = state.data.userShow.posts.filter(item => item.id === parseInt(post.forward.id))[0]
  //       const position = state.data.userShow.posts.indexOf(parent)
  //       const el = parent.forwards.filter(item => item.id === payload.postId)
  //       const pos = parent.forwards.indexOf(el)
  //       parent.forwards.splice(pos, 1)
  //       state.data.userShow.posts.splice(position, 1, parent)
  //     }
  //     const position = state.data.userShow.posts.indexOf(post)
  //     console.log(position)
  //     state.data.userShow.posts.splice(position, 1)
  //   }
  //   else {
  //     const post = state.data.posts.filter(item => item.id === parseInt(payload.postId))[0]
  //     const position = state.data.posts.indexOf(post)
  //     state.data.posts.splice(position, 1)
  //   }

  // },

  // REMOVE_COMMENT: (state, payload) => {
  //   const posts = state.data.posts.map(item => item.id)
  //   const post_position = posts.indexOf(parseInt(payload.post_id))
  //   const comments = state.data.posts[post_position].comments.map(comment => comment.id)
  //   const comment_position = comments.indexOf(parseInt(payload.comment_id))
  //   state.data.posts[post_position].comments.splice(comment_position, 1)
  // },

  // SET_NEW_POST: (state, payload) => {
  //   // state.data = payload
  //   const newPost = payload
  //   newPost.comments = []
  //   newPost.forward = null
  //   newPost.forwards = []
  //   // console.log('newPost')
  //   // console.log(newPost)
  //   state.data.posts.push(newPost)
  //   state.data.lastPostId += 1
  // },

  // SET_FORWARD_POST: (state, { payload, page }) => {
  //   console.log(page)
  //   console.log(payload)
  //   // const stateData = page === 'user' ? state.data.userShow.posts : state.data.posts
  //   const result = (stateData, payload) => {
  //     console.log(payload)
  //     let post = stateData.filter(item => item.id === parseInt(payload.parent.id))[0]
  //     post.forwards = payload.parent.forwards
  //     console.log(`forwards: ${post.forwards.length}`)
  //     let position = stateData.indexOf(post)
  //     stateData.splice(position, 1, post)
  //     if (payload.create) {
  //       post = payload.post
  //       post.forward = payload.parent
  //       post.comments = []
  //       post.forwards = []
  //       post.points = 0
  //       post.pin = false
  //       // stateData.splice(0, 0, post)
  //       stateData.unshift(post)
  //       state.data.user.forwards.push(payload.forward)
  //     }
  //     else {
  //       post = stateData.filter(item => item.id === parseInt(payload.post.id))[0]
  //       position = stateData.indexOf(post)
  //       stateData.splice(position, 1)

  //       post = state.data.user.forwards.filter(item => item.id === parseInt(payload.parent.id))[0]
  //       position = state.data.user.forwards.indexOf(payload.parent.id)
  //       state.data.user.forwards.splice(position,1)
  //     }
  //     return stateData
  //   }
  //   if (page === 'user') state.data.userShow.posts = result(state.data.userShow.posts, payload)
  //   else state.data.posts = result(state.data.posts, payload)
  // },

  // SET_EDIT_POST: (state, payload) => {
  //   const post = state.data.posts.filter(item => item.id === parseInt(payload.id))[0]
  //   const position = state.data.posts.indexOf(post)
  //   state.data.posts.splice(position, 1, payload)
  // },

  // SET_SEARCH_POSTS: (state, payload) => {
  //   console.log(payload)
  //   state.data.searchPosts = payload
  // },

  // SET_USER_POSTS: (state, payload) => {
  //   console.log(payload.data)
  //   state.data.userShow = payload.data
  // },

  // SET_STORE: (state, payload) => {
  //   console.log(payload)
  //   state.data = payload
  // },

  // SET_DATA: (state, payload) => {
  //   console.log(payload)
  //   // state.data = payload
  //   state.data.lastCommentId = payload.lastCommentId
  //   state.data.lastPostId = payload.lastPostId
  //   state.data.posts = payload.posts
  //   state.data.user = payload.user
  //   // state.data.points = payload.points
  //   // console.log(payload.pages)
  //   // if (payload.pages != undefined && payload.pages.length > 0) state.data.pages = payload.pages
  //   // if (state.data.pages === undefined) state.data.pages = []
  //   // else state.data.pages = payload.pages
  //   state.lastUpdated = new Date().getTime()
  // },

  // SET_PAGES: (state, payload) => {
  //   console.log(payload)
  //   // if (state.data.pages === undefined) state.data.pages = []
  //   // console.log(payload.pages)
  //   state.data.pages = payload.pages.map(page => page)
  //   // console.log(state.data.pages)
  //   // state.data.user = payload.user
  //   state.lastUpdated = new Date().getTime()
  // },

  // SET_TIME: (state, payload) => {
  //   state.lastUpdated = new Date().getTime()
  // },

  // SET_LOG_OUT: (state, payload) => {
  //   console.log('logout')
  //   state.data.user = null
  //   state.data.userShow.posts = []
  // },
}
