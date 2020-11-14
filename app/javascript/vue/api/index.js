import axios from 'axios'
// import Unsplash, { toJson } from 'unsplash-js';

// const logRequests = !!process.env.DEBUG_API
// // console.log(logRequests)

// const api = (child, options) => {
//   logRequests && console.log(`fetching ${child}...`)
//   return axios.create({
//     baseURL: child,
//     timeout: 1000,
//   });
// }

// const fetch = (URI, options) => {
//   return Promise.resolve(api(URI, options))
//     .then(response => response.get())
//     .then(result => {
//       return result;
//     })
//     .catch(ex => {
//       console.log('parsing failed', ex);
//     });
// }

// export const fetchItem = (URI, item) => {
//   return fetch(URI)
// }

const metaCsrf = document.querySelector("meta[name='csrf-token']")
const csrfToken = metaCsrf.getAttribute('content')

const domain = 'https://www.cuisinierrebelle.com'
// const domain = ''

export const bookmark = (context, payload) => {
  return axios({
    validateStatus: status => {
      console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'post',
    url: `${domain}/api/v1/bookmarks`,
    headers: {
      'Authorization': `Bearer ${context.state.data.authorization}`,
    },
    data: {
      recipe_id: payload.recipe_id,
      user_id: payload.user_id,
      bookmark: {
        recipe_id: payload.recipe_id,
        user_id: payload.user_id,
      }
    }
  })
  .catch(error => {
    console.log(error.toJSON());
    return error
  });
}

export const unbookmark = (context, payload) => {
  return axios({
    validateStatus: status => {
      console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'delete',
    url: `${domain}/api/v1/bookmarks/${payload.recipe_id}`,
    headers: {
      'Authorization': `Bearer ${context.state.data.authorization}`,
    },
    data: {}
  })
  .catch(error => {
    console.log(error.toJSON());
    return error
  });
}

export const like = (context, payload) => {
  return axios({
    validateStatus: status => {
      console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'post',
    url: `${domain}/api/v1/likes`,
    headers: {
      'Authorization': `Bearer ${context.state.data.authorization}`,
    },
    data: {
      recipe_id: payload.recipe_id,
      user_id: payload.user_id,
      like: {
        recipe_id: payload.recipe_id,
        user_id: payload.user_id,
      }
    }
  })
  .catch(error => {
    console.log(error.toJSON());
    return error
  });
}

export const unlike = (context, payload) => {
  return axios({
    validateStatus: status => {
      console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'delete',
    url: `${domain}/api/v1/likes/${payload.recipe_id}`,
    headers: {
      'Authorization': `Bearer ${context.state.data.authorization}`,
    },
    data: {}
  })
  .catch(error => {
    console.log(error.toJSON());
    return error
  });
}

export const recipe = (context, payload) => {
  return axios({
    validateStatus: status => {
      console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'get',
    url: `${domain}/api/v1/recipes/${payload}`,
  })
  .catch(error => {
    console.log(error.toJSON());
    return error
  });
}

export const recipes = (context, payload) => {
  return axios({
    validateStatus: status => {
      console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'get',
    url: `${domain}/api/v1/recipes`,
  })
  .catch(error => {
    console.log(error.toJSON());
    return error
  });
}

export const recipeLog = (context, payload) => {
  console.log(context)
  // console.log($('meta[name="csrf-token"]').attr('content'))
  return axios({
    validateStatus: status => {
      console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'post',
    url: `${domain}/api/v1/recipe_logs`,
    headers: {
      // 'X-CSRF-Token': csrfToken,
      // 'X-User-Email': context.getters.currentUser ? context.getters.currentUser.email : null,
      // 'X-User-Token': context.getters.currentUser ? context.getters.currentUser.authentication_token : null
    },
    data: {
      recipe_id: payload.recipe.id,
      user_id: context.getters.currentUser ? context.getters.currentUser.id : null,
      recipe_log: {
        recipe_id: payload.recipe.id,
        user_id: context.getters.currentUser ? context.getters.currentUser.id : null,
      }
    }
  })
  .catch(error => {
    console.log(error.toJSON());
    return error
  });
}

export const login = (context, user) => {
  // console.log(user)
  // console.log($('meta[name="csrf-token"]').attr('content'))
  return axios({
    validateStatus: status => {
      console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'post',
    url: `${domain}/api/v1/users/sign_in`,
    headers: {
      'X-CSRF-Token': csrfToken,
      // 'Accept-Encoding': 'gzip',
    },
    data: {
      user: {
        email: user.email,
        password: user.password
      }
    }
  })
  .catch(error => {
    console.log(error.toJSON());
    return error
  });
}

export const logout = (context, user) => {
  return axios({
    method: 'delete',
    url: `${domain}/api/v1/users/sign_out`,
    headers: {
      'X-CSRF-Token': csrfToken,
      // 'X-User-Email': context.getters.currentUser.email,
      // 'X-User-Token': context.getters.currentUser.authentication_token
      'Authorization': `Bearer ${context.state.data.authorization}`,
      // 'Accept-Encoding': 'gzip',
    },
    data: {
      // email: context.getters.currentUser.email,
      // authentication_token: context.getters.currentUser.authentication_token
    }
  })
  .catch(error => {
    console.log(error.response)
  })
}

// const unsplash = new Unsplash({ accessKey: 'nHSH2XMCvdAgrKbLMHs1M1u7vWUW8vxEmyHvDsTOLTs' });

// export const fetchBannerPicture = (query) => {
//   return unsplash.photos.getRandomPhoto({
//     query: query
//   })
//   .then(toJson)
//   .catch(error => {
//     console.log(error.response)
//   })
// }

export const fetchState = async (context, {}) => {
  console.log(`${domain}/api/v1/state`)
  return await axios({
    method: 'get',
    url: `${domain}/api/v1/state`,
    headers: {
      // 'Accept-Encoding': 'gzip',
    },
  })
  .catch(error => {
    console.log(error.response)
  })
}

export const isAuthenticated = (context, user) => {
  // console.log(`isAuthenticated? ${context.getters.currentUser.email}`)
  // console.log(context.getters.currentUser.email)
  // console.log( context.getters.currentUser.authentication_token)
  const token = context.state.data.authorization
  // console.log(token)
  return axios({
    method: 'get',
    url: `${domain}/api/v1/state`,
    headers: {
      'Authorization': token != null ? `Bearer ${token}` : null,
      // 'Accept-Encoding': 'gzip',
    },
    params: {
      query: 'isAuthenticated',
      // email: context.getters.currentUser.email,
      // authentication_token: context.getters.currentUser.authentication_token
    }
  })
  .catch(error => {
    console.log(error.response)
  })
}

// export const follow = (context, { id, type }) => {
//   return axios({
//     method: 'post',
//     url: `/api/v1/user/${id}/${type}`,
//     headers: {
//       'X-User-Email': context.getters.currentUser.email,
//       'X-User-Token': context.getters.currentUser.token
//     },
//     data: {
//       id: id,
//       type: type
//     }
//   })
//   .catch(error => {
//     console.log(error.response)
//   })
// }

// export const liked = (context, { id }) => {
//   return axios({
//     method: 'post',
//     url: `/api/v1/points`,
//     headers: {
//       'X-User-Email': context.getters.currentUser.email,
//       'X-User-Token': context.getters.currentUser.token
//     },
//     data: {
//       post_id: id
//     }
//   })
//   .catch(error => {
//     console.log(error.response)
//   })
// }

// export const pin = (context, { id }) => {
//   return axios({
//     method: 'patch',
//     url: `/api/v1/pin/${id}`,
//     headers: {
//       'X-User-Email': context.getters.currentUser.email,
//       'X-User-Token': context.getters.currentUser.token
//     },
//     data: {
//       id: id
//     }
//   })
//   .catch(error => {
//     console.log(error.response)
//   })
// }

// export const fetchSearchQuery = (context, { query }) => {
//   console.log(query)
//   return axios({
//     method: 'get',
//     url: `/api/v1/search?query=${query}`
//   })
//   .catch(error => {
//     console.log(error.response)
//   })
// }

// export const fetchUserPosts = (context, { user }) => {
//   return axios({
//     method: 'get',
//     url: `/api/v1/user/${user}`
//   })
//   .catch(error => {
//     console.log(error.response)
//   })
// }

// export const fetchPosts = (context, {}) => {
//   return axios({
//     method: 'get',
//     url: `/api/v1/status`
//   })
//   .catch(error => {
//     console.log(error.response)
//   })
// }

// export const fetchPages = (context, {}) => {
//   return axios({
//     method: 'get',
//     url: `/api/v1/pages`
//   })
//   .catch(error => {
//     console.log(error.response)
//   })
// }

// export const addNewComment = (context, { ancestry, post }) => {
//   const url = ancestry !== null ? `/api/v1/comments/${ancestry.id}/reply` : '/api/v1/comments'
//   console.log('context')
//   console.log(context)
//   return axios({
//     method: 'post',
//     url: url,
//     headers: {
//       'X-User-Email': context.getters.currentUser.email,
//       'X-User-Token': context.getters.currentUser.token
//     },
//     data: {
//       content: post.content,
//       post: context.state.route.params.id
//     }
//   })
//   .catch(error => {
//     console.log(error.response)
//   })
// }

// export const addNewPost = (context, { post }) => {
//   return axios({
//     method: 'post',
//     url: '/api/v1/status',
//     headers: {
//       'X-User-Email': context.getters.currentUser.email,
//       'X-User-Token': context.getters.currentUser.token
//     },
//     data: {
//       content: post.content,
//       // post: context.state.route.params.id
//     }
//   })
//   .catch(error => {
//     console.log(error.response)
//   })
// }

// export const forwardPost = (context, { post }) => {
//   return axios({
//     method: 'post',
//     url: `/api/v1/status/${post.id}/forward`,
//     headers: {
//       'X-User-Email': context.getters.currentUser.email,
//       'X-User-Token': context.getters.currentUser.token
//     },
//     data: {
//       content: post.id,
//       // post: context.state.route.params.id
//     }
//   })
//   .catch(error => {
//     console.log(error.response)
//   })
// }

// export const editPost = (context, { post }) => {
//   return axios({
//     method: 'patch',
//     url: `/api/v1/status/${post.id}`,
//     headers: {
//       'X-User-Email': context.getters.currentUser.email,
//       'X-User-Token': context.getters.currentUser.token
//     },
//     data: {
//       content: post.content,
//       // post: context.state.route.params.id
//     }
//   })
//   .catch(error => {
//     console.log(error.response)
//   })
// }

// export const deletePost = (context, { id }) => {
//   return axios({
//     method: 'delete',
//     url: `/api/v1/status/${id}`,
//     headers: {
//       'X-User-Email': context.getters.currentUser.email,
//       'X-User-Token': context.getters.currentUser.token
//     },
//     // data: {
//     //   // content: post.content,
//     //   // post: context.state.route.params.id
//     // }
//   })
//   .catch(error => {
//     console.log(error.response)
//   })
// }

// export const deleteComment = (context, { id }) => {
//   return axios({
//     method: 'delete',
//     url: `/api/v1/comments/${id}`,
//     headers: {
//       'X-User-Email': context.getters.currentUser.email,
//       'X-User-Token': context.getters.currentUser.token
//     },
//     // data: {
//     //   // content: post.content,
//     //   // post: context.state.route.params.id
//     // }
//   })
//   .catch(error => {
//     console.log(error.response)
//   })
// }
