(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["hello_vue~._a"],{

/***/ "./app/javascript/vue/store/index.js":
/*!*******************************************!*\
  !*** ./app/javascript/vue/store/index.js ***!
  \*******************************************/
/*! exports provided: createStore */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createStore", function() { return createStore; });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions */ "./app/javascript/vue/store/actions.js");
/* harmony import */ var _mutations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mutations */ "./app/javascript/vue/store/mutations.js");
/* harmony import */ var _getters__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./getters */ "./app/javascript/vue/store/getters.js");


vue__WEBPACK_IMPORTED_MODULE_0__["default"].use(vuex__WEBPACK_IMPORTED_MODULE_1__["default"]);



var createStore = function createStore() {
  var vueStore = JSON.parse(localStorage.getItem('cuisinier_rebelle'));
  var data = {};

  if (vueStore) {
    // Remove localStorage prior VueJS
    if (vueStore.timestamp && vueStore.timestamp < 1605233042272) {
      localStorage.removeItem('cuisinier_rebelle');
      vueStore = null;
    } // Force Update


    if (vueStore.data.timestamp && vueStore.data.timestamp < 1605317110896) {
      localStorage.removeItem('cuisinier_rebelle');
      vueStore = null;
    }
  }

  if (vueStore) {
    console.log('loading vueStore');
    data = vueStore.data;
  } else {
    console.log('initiate vuex store');
    data = {
      authorization: null,
      isAuthenticated: false,
      lastUpdated: 0,
      recipes: [],
      search: {
        users: [],
        recipes: []
      },
      timestamp: null,
      user: {
        email: null,
        authentication_token: null,
        bookmarks: [],
        followers: {
          count: 0,
          data: []
        },
        following: {
          count: 0,
          data: []
        }
      },
      users: [],
      render: {
        navbarHeight: 0
      }
    };
  }

  return new vuex__WEBPACK_IMPORTED_MODULE_1__["default"].Store({
    state: {
      data: data
    },
    getters: _getters__WEBPACK_IMPORTED_MODULE_4__["default"],
    mutations: _mutations__WEBPACK_IMPORTED_MODULE_3__["default"],
    actions: _actions__WEBPACK_IMPORTED_MODULE_2__["default"]
  });
};

/***/ }),

/***/ "./app/javascript/vue/store/mutations.js":
/*!***********************************************!*\
  !*** ./app/javascript/vue/store/mutations.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



var saveToLocalStorage = function saveToLocalStorage(state, caller) {
  console.log(caller);
  console.log(state);
  localStorage.setItem('cuisinier_rebelle', JSON.stringify({
    data: state.data
  }));
};

/* harmony default export */ __webpack_exports__["default"] = ({
  COMMENT_LIKE: function COMMENT_LIKE(state, payload) {
    // console.log('COMMENT_LIKE')
    state.data.user.commentLikes.push(payload.comment_id);
    var recipe = state.data.recipes.filter(function (r) {
      return r.recipe.id === payload.recipe_id;
    })[0];
    var recipePosition = state.data.recipes.indexOf(recipe);
    var comment = state.data.recipes[recipePosition].comments.filter(function (r) {
      return r.id === payload.comment_id;
    })[0];
    var commentPosition = state.data.recipes[recipePosition].comments.indexOf(comment);
    state.data.recipes[recipePosition].comments[commentPosition].likes += 1;
    saveToLocalStorage(state, 'COMMENT_LIKE');
  },
  COMMENT_UNLIKE: function COMMENT_UNLIKE(state, payload) {
    var el = state.data.user.commentLikes.filter(function (r) {
      return r === payload.comment_id;
    })[0];
    var position = state.data.user.commentLikes.indexOf(el);
    state.data.user.commentLikes.splice(position, 1);
    var recipe = state.data.recipes.filter(function (r) {
      return r.recipe.id === payload.recipe_id;
    })[0];
    var recipePosition = state.data.recipes.indexOf(recipe);
    var comment = state.data.recipes[recipePosition].comments.filter(function (r) {
      return r.id === payload.comment_id;
    })[0];
    var commentPosition = state.data.recipes[recipePosition].comments.indexOf(comment);
    state.data.recipes[recipePosition].comments[commentPosition].likes -= 1;
    saveToLocalStorage(state, 'COMMENT_UNLIKE');
  },
  REPLY_LIKE: function REPLY_LIKE(state, payload) {
    state.data.user.replyLikes.push(payload.reply_id);
    var recipe = state.data.recipes.filter(function (r) {
      return r.recipe.id === payload.recipe_id;
    })[0];
    var recipePosition = state.data.recipes.indexOf(recipe);
    var comment = state.data.recipes[recipePosition].comments.filter(function (r) {
      return r.id === payload.comment_id;
    })[0];
    var commentPosition = state.data.recipes[recipePosition].comments.indexOf(comment);
    var reply = state.data.recipes[recipePosition].comments[commentPosition].replies.filter(function (r) {
      return r.id === payload.reply_id;
    })[0];
    var replyPosition = state.data.recipes[recipePosition].comments[commentPosition].replies.indexOf(reply);
    state.data.recipes[recipePosition].comments[commentPosition].replies[replyPosition].likes += 1;
    saveToLocalStorage(state, 'REPLY_LIKE');
  },
  REPLY_UNLIKE: function REPLY_UNLIKE(state, payload) {
    var el = state.data.user.replyLikes.filter(function (r) {
      return r === payload.reply_id;
    })[0];
    var position = state.data.user.replyLikes.indexOf(el);
    state.data.user.replyLikes.splice(position, 1);
    var recipe = state.data.recipes.filter(function (r) {
      return r.recipe.id === payload.recipe_id;
    })[0];
    var recipePosition = state.data.recipes.indexOf(recipe);
    var comment = state.data.recipes[recipePosition].comments.filter(function (r) {
      return r.id === payload.comment_id;
    })[0];
    var commentPosition = state.data.recipes[recipePosition].comments.indexOf(comment);
    var reply = state.data.recipes[recipePosition].comments[commentPosition].replies.filter(function (r) {
      return r.id === payload.reply_id;
    })[0];
    var replyPosition = state.data.recipes[recipePosition].comments[commentPosition].replies.indexOf(reply);
    state.data.recipes[recipePosition].comments[commentPosition].replies[replyPosition].likes -= 1;
    saveToLocalStorage(state, 'REPLY_UNLIKE');
  },
  REPLY_EDIT: function REPLY_EDIT(state, payload) {
    console.log(payload); // console.log(state)

    var recipe = state.data.recipes.filter(function (r) {
      return r.recipe.id === payload.data.recipe.id;
    })[0];
    console.log(recipe);
    var position = state.data.recipes.indexOf(recipe);
    console.log(position);
    var comment = state.data.recipes[position].comments.filter(function (comment) {
      return comment.id === payload.data.id;
    })[0];
    var pos = state.data.recipes[position].comments.indexOf(comment);
    state.data.recipes[position].comments[pos] = payload.data;
    saveToLocalStorage(state, 'REPLY_EDIT');
  },
  REPLY_DELETE: function REPLY_DELETE(state, payload) {
    console.log(payload);
    console.log(state);
    var recipe = state.data.recipes.filter(function (r) {
      return r.recipe.id === payload.recipe_id;
    })[0];
    console.log(recipe);
    var position = state.data.recipes.indexOf(recipe);
    console.log(position);
    var comment = state.data.recipes[position].comments.filter(function (c) {
      return c.id === payload.comment_id;
    })[0];
    var pos = state.data.recipes[position].comments.indexOf(comment);
    var reply = state.data.recipes[position].comments[pos].replies.filter(function (r) {
      return r.id === payload.id;
    })[0];
    var p = state.data.recipes[position].comments[pos].replies.indexOf(reply);
    state.data.recipes[position].comments[pos].replies.splice(p, 1);
    saveToLocalStorage(state, 'REPLY_DELETE');
  },
  REPLY_NEW: function REPLY_NEW(state, payload) {
    console.log(payload); // console.log(state)

    var recipe = state.data.recipes.filter(function (r) {
      return r.recipe.id === payload.data.recipe.id;
    })[0];
    console.log(recipe);
    var position = state.data.recipes.indexOf(recipe);
    console.log(position);
    var comment = state.data.recipes[position].comments.filter(function (comment) {
      return comment.id === payload.data.id;
    })[0];
    var pos = state.data.recipes[position].comments.indexOf(comment);
    state.data.recipes[position].comments[pos] = payload.data;
    saveToLocalStorage(state, 'REPLY_NEW');
  },
  COMMENT_DELETE: function COMMENT_DELETE(state, payload) {
    console.log(payload); // console.log(state)

    var recipe = state.data.recipes.filter(function (r) {
      return r.recipe.id === payload.recipe_id;
    })[0];
    console.log(recipe);
    var position = state.data.recipes.indexOf(recipe);
    console.log(position);
    var comment = state.data.recipes[position].comments.filter(function (c) {
      return c.id === payload.comment_id;
    })[0];
    var pos = state.data.recipes[position].comments.indexOf(comment);
    state.data.recipes[position].comments.splice(pos, 1);
    saveToLocalStorage(state, 'COMMENT_DELETE');
  },
  COMMENT_EDIT: function COMMENT_EDIT(state, payload) {
    console.log(payload); // console.log(state)

    var recipe = state.data.recipes.filter(function (r) {
      return r.recipe.id === payload.data.recipe.id;
    })[0];
    console.log(recipe);
    var position = state.data.recipes.indexOf(recipe);
    console.log(position);
    var comment = state.data.recipes[position].comments.filter(function (comment) {
      return comment.id === payload.data.id;
    })[0];
    var pos = state.data.recipes[position].comments.indexOf(comment);
    state.data.recipes[position].comments[pos] = payload.data;
    saveToLocalStorage(state, 'COMMENT_EDIT');
  },
  COMMENT_NEW: function COMMENT_NEW(state, payload) {
    console.log(payload); // console.log(state)

    var recipe = state.data.recipes.filter(function (r) {
      return r.recipe.id === payload.data.recipe.id;
    })[0];
    console.log(recipe);
    var position = state.data.recipes.indexOf(recipe);
    console.log(position);
    state.data.recipes[position].comments.push(payload.data);
    saveToLocalStorage(state, 'COMMENT_NEW');
  },
  BOOKMARK: function BOOKMARK(state, payload) {
    console.log(payload); // console.log(state)

    state.data.user.bookmarks.push(payload);
    console.log("bookmarks: ".concat(state.data.user.bookmarks.length));
    var recipe = state.data.recipes.filter(function (recipe) {
      return recipe.recipe.id === payload.recipe_id;
    })[0];
    var position = state.data.recipes.indexOf(recipe);
    state.data.recipes[position].recipe.bookmarks += 1;
    saveToLocalStorage(state, 'BOOKMARK');
  },
  UNBOOKMARK: function UNBOOKMARK(state, payload) {
    console.log(payload); // console.log(state)

    var bookmark = state.data.user.bookmarks.filter(function (bookmark) {
      return bookmark.recipe_id === payload.recipe_id;
    })[0];
    var position = state.data.user.bookmarks.indexOf(bookmark);
    state.data.user.bookmarks.splice(position, 1);
    console.log("bookmarks: ".concat(state.data.user.bookmarks.length));
    var recipe = state.data.recipes.filter(function (recipe) {
      return recipe.recipe.id === payload.recipe_id;
    })[0];
    position = state.data.recipes.indexOf(recipe);
    state.data.recipes[position].recipe.bookmarks -= 1;
    saveToLocalStorage(state, 'UNBOOKMARK');
  },
  FOLLOW: function FOLLOW(state, payload) {
    console.log(payload);
    state.data.user.following.count += 1;
    state.data.user.following.data.push(payload.data.user);
    var user = state.data.users.filter(function (user) {
      return user.slug === payload.data.user.slug;
    })[0];
    var position = state.data.users.indexOf(user);
    state.data.users[position].followers.count += 1;
    state.data.users[position].followers.data.push(payload.data.user);
    saveToLocalStorage(state, 'FOLLOW');
  },
  UNFOLLOW: function UNFOLLOW(state, payload) {
    console.log(payload);
    state.data.user.following.count -= 1;
    var user = state.data.user.following.data.filter(function (user) {
      return user.slug === payload.user;
    })[0];
    var position = state.data.user.following.data.indexOf(user);
    state.data.user.following.data.splice(position, 1);
    user = state.data.users.filter(function (user) {
      return user.slug === payload.user;
    })[0];
    position = state.data.users.indexOf(user);
    state.data.users[position].followers.count -= 1;
    state.data.users[position].followers.data.splice(position, 1);
    saveToLocalStorage(state, 'UNFOLLOW');
  },
  LIKE: function LIKE(state, payload) {
    console.log(payload); // console.log(state)

    state.data.user.likes.push(payload);
    console.log("user's likes: ".concat(state.data.user.likes.length));
    var recipe = state.data.recipes.filter(function (recipe) {
      return recipe.recipe.id === payload.recipe_id;
    })[0];
    var position = state.data.recipes.indexOf(recipe);
    state.data.recipes[position].recipe.likes += 1;
    saveToLocalStorage(state, 'LIKE');
  },
  UNLIKE: function UNLIKE(state, payload) {
    console.log(payload); // console.log(state)

    var like = state.data.user.likes.filter(function (like) {
      return like.recipe_id === payload.recipe_id;
    })[0];
    var position = state.data.user.likes.indexOf(like);
    state.data.user.likes.splice(position, 1);
    console.log("user's likes: ".concat(state.data.user.likes.length));
    var recipe = state.data.recipes.filter(function (recipe) {
      return recipe.recipe.id === payload.recipe_id;
    })[0];
    position = state.data.recipes.indexOf(recipe);
    state.data.recipes[position].recipe.likes -= 1;
    saveToLocalStorage(state, 'UNLIKE');
  },
  IS_AUTHENTICATED: function IS_AUTHENTICATED(state, payload) {
    console.log(state);
    console.log(payload);
    state.data.isAuthenticated = payload.isAuthenticated;

    if (payload.isAuthenticated === false) {
      state.data.user = {
        email: null,
        authentication_token: null
      };
      state.data.authorization = null; // state.data.isAuthenticated = false
      // state.data.lastUpdated = new Date().getTime() + (1000 * 60 * 3)
    }

    saveToLocalStorage(state, 'IS_AUTHENTICATED');
  },
  SET_DATA: function SET_DATA(state, payload) {
    // console.log(state)
    // console.log(payload)
    for (var _i2 = 0, _Object$entries = Object.entries(payload.data); _i2 < _Object$entries.length; _i2++) {
      var _ref3 = _Object$entries[_i2];

      var _ref2 = _slicedToArray(_ref3, 2);

      var key = _ref2[0];
      var value = _ref2[1];
      // console.log(`${key}: ${value}`)
      state.data[key] = payload.data[key];
    } // state.data = payload.data


    console.log(state.data); // state.data.lastUpdated = new Date().getTime()

    saveToLocalStorage(state, 'SET_DATA');
  },
  RECIPE_NEW: function RECIPE_NEW(state, payload) {
    state.data.recipes.push(payload.data); // state.data.lastUpdated = new Date().getTime()

    saveToLocalStorage(state, 'RECIPE_NEW');
  },
  RECIPE: function RECIPE(state, payload) {
    // console.log('### RECIPE ###')
    // console.log(state)
    // console.log(payload)
    var recipe = state.data.recipes.filter(function (r) {
      return r.recipe.id === payload.data.recipe.id;
    })[0];
    console.log(recipe);

    if (recipe) {
      var position = state.data.recipes.indexOf(recipe);
      console.log(position);
      state.data.recipes[position] = payload.data; // console.log(state.data)
      // state.data.lastUpdated = new Date().getTime()

      saveToLocalStorage(state, 'RECIPE');
    }
  },
  USERS: function USERS(state, payload) {
    console.log('### USERS ###');
    console.log(payload);
    state.data.users = payload.data.data.users; // state.data.lastUpdated = new Date().getTime()

    saveToLocalStorage(state, 'USERS');
  },
  RECIPES: function RECIPES(state, payload) {
    console.log('### RECIPES ###');
    console.log(state);
    console.log(payload);

    if (state.data.recipes.length === 0) {
      state.data.recipes = payload.data; // state.data.lastUpdated = new Date().getTime()

      saveToLocalStorage(state, 'RECIPES');
    }
  },
  SEARCH: function SEARCH(state, payload) {
    console.log('### SEARCH ###');
    console.log(state);
    console.log(payload);
    state.data.search.recipes = payload.data.recipes; // state.data.lastUpdated = new Date().getTime()

    saveToLocalStorage(state, 'SEARCH');
  },
  RECIPE_LOG: function RECIPE_LOG(state, payload) {
    console.log(payload);
    var recipe = state.data.recipes.filter(function (r) {
      return r.recipe.id === payload.data.recipe.id;
    })[0];
    console.log(recipe);
    var position = state.data.recipes.indexOf(recipe);
    console.log(position);
    state.data.recipes[position].recipe.views = payload.views; // state.data.user.points.splice(position, 1)

    saveToLocalStorage(state, 'RECIPE_LOG');
  },
  LOG_IN: function LOG_IN(state, payload) {
    console.log(payload);
    state.data.user = payload.data;
    state.data.authorization = payload.headers.authorization.split('Bearer ')[1];
    state.data.isAuthenticated = true; // state.data.lastUpdated = new Date().getTime()

    console.log(state);
    saveToLocalStorage(state, 'LOG_IN');
  },
  LOG_OUT: function LOG_OUT(state, payload) {
    console.log(payload);
    console.log(state);
    state.data.user = {
      email: null,
      authentication_token: null
    };
    state.data.authorization = null;
    state.data.isAuthenticated = false; // state.data.lastUpdated = new Date().getTime() + (1000 * 60 * 3)

    saveToLocalStorage(state, 'LOG_OUT');
  },
  NAVBAR_HEIGHT: function NAVBAR_HEIGHT(state, payload) {
    state.data.render.navbarHeight = payload; // context.commit("NAVBAR_HEIGHT", navbarHeight)

    saveToLocalStorage(state, 'NAVBAR_HEIGHT');
  } // SET_NEW_COMMENT: (state, payload) => {
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

});

/***/ }),

/***/ 0:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 1:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 2:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 3:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 4:
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 5:
/*!************************!*\
  !*** crypto (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 6:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 7:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 8:
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 9:
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

}]);
//# sourceMappingURL=hello_vue~._a-d21bc15564399578c434.chunk.js.map