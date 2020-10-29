import axios from 'axios'

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

export const login = (context, user) => {
  // console.log(user)
  // console.log($('meta[name="csrf-token"]').attr('content'))
  return axios({
    validateStatus: status => {
      console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'post',
    url: `/api/v1/users/sign_in`,
    headers: {
      'X-CSRF-Token': csrfToken,
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
    url: `/api/v1/users/sign_out`,
    headers: {
      'X-CSRF-Token': csrfToken,
      // 'X-User-Email': context.getters.user.email,
      // 'X-User-Token': context.getters.user.authentication_token
    },
    data: {
      // email: context.getters.user.email,
      // authentication_token: context.getters.user.authentication_token
    }
  })
  .catch(error => {
    console.log(error.response)
  })
}

export const fetchState = (context, {}) => {
  return axios({
    method: 'get',
    url: `/api/v1/state`
  })
  .catch(error => {
    console.log(error.response)
  })
}

export const isAuthenticated = (context, user) => {
  console.log('isAuthenticated?')
  console.log(context.getters.user.email)
  console.log( context.getters.user.authentication_token)
  return axios({
    method: 'get',
    url: `/api/v1/state`,
    headers: {
      'X-CSRF-Token': csrfToken,
      'X-User-Email': context.getters.user.email,
      'X-User-Token': context.getters.user.authentication_token
    },
    params: {
      query: 'isAuthenticated',
      email: context.getters.user.email,
      authentication_token: context.getters.user.authentication_token
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
//       'X-User-Email': context.getters.user.email,
//       'X-User-Token': context.getters.user.token
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
//       'X-User-Email': context.getters.user.email,
//       'X-User-Token': context.getters.user.token
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
//       'X-User-Email': context.getters.user.email,
//       'X-User-Token': context.getters.user.token
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
//       'X-User-Email': context.getters.user.email,
//       'X-User-Token': context.getters.user.token
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
//       'X-User-Email': context.getters.user.email,
//       'X-User-Token': context.getters.user.token
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
//       'X-User-Email': context.getters.user.email,
//       'X-User-Token': context.getters.user.token
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
//       'X-User-Email': context.getters.user.email,
//       'X-User-Token': context.getters.user.token
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
//       'X-User-Email': context.getters.user.email,
//       'X-User-Token': context.getters.user.token
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
//       'X-User-Email': context.getters.user.email,
//       'X-User-Token': context.getters.user.token
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
