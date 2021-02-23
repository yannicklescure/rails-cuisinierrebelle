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

// const metaCsrf = document.querySelector("meta[name='csrf-token']")
// const context.getters.csrfToken = metaCsrf.getAttribute('content')

// const domain = 'https://www.cuisinierrebelle.com'
const domain = ''

export const userNotifications = (context, payload) => {
  return axios({
    validateStatus: status => {
      console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'patch',
    url: `${ domain }/api/v1/notification/${payload.id}`,
    headers: {
      'Authorization': `Bearer ${ context.state.data.authorization.authorizationToken }`,
      'Refresh-Token': context.state.data.authorization.refreshToken,
    },
    data: {
      notification: payload.notification,
    }
  })
  .catch(error => {
    console.log(error.toJSON());
    return error
  });
}

export const notifications = (context, payload) => {
  return axios({
    validateStatus: status => {
      console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'get',
    url: `${ domain }/api/v1/notifications`,
    headers: {
      'Authorization': `Bearer ${ context.state.data.authorization.authorizationToken }`,
      'Refresh-Token': context.state.data.authorization.refreshToken,
    },
  })
  .catch(error => {
    console.log(error.toJSON());
    return error
  });
}

export const commentLike = (context, payload) => {
  return axios({
    validateStatus: status => {
      console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'post',
    url: `${ domain }/api/v1/comments/${ payload.comment_id }/likes`,
    headers: {
      'Authorization': `Bearer ${ context.state.data.authorization.authorizationToken }`,
      'Refresh-Token': context.state.data.authorization.refreshToken,
    },
    data: {
      // comment_id: payload.comment_id,
    }
  })
  .catch(error => {
    console.log(error.toJSON());
    return error
  });
}

export const commentUnlike = (context, payload) => {
  return axios({
    validateStatus: status => {
      console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'delete',
    url: `${ domain }/api/v1/comments/${ payload.comment_id }/likes/0`,
    headers: {
      'Authorization': `Bearer ${ context.state.data.authorization.authorizationToken }`,
      'Refresh-Token': context.state.data.authorization.refreshToken,
    },
    data: {
      // comment_id: payload.comment_id,
    }
  })
  .catch(error => {
    console.log(error.toJSON());
    return error
  });
}

export const commentDelete = (context, payload) => {
  return axios({
    validateStatus: status => {
      console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'delete',
    url: `${ domain }/api/v1/comments/${ payload.comment_id }`,
    headers: {
      'Authorization': `Bearer ${ context.state.data.authorization.authorizationToken }`,
      'Refresh-Token': context.state.data.authorization.refreshToken,
    },
    data: {
      // comment_id: payload.comment_id,
    }
  })
  .catch(error => {
    console.log(error.toJSON());
    return error
  });
}

export const replyLike = (context, payload) => {
  return axios({
    validateStatus: status => {
      console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'post',
    url: `${ domain }/api/v1/comments/${ payload.comment_id }/replies/${ payload.reply_id }/likes`,
    headers: {
      'Authorization': `Bearer ${ context.state.data.authorization.authorizationToken }`,
      'Refresh-Token': context.state.data.authorization.refreshToken,
    },
    data: {
      // recipe_id: payload.recipe_id,
      // comment_id: payload.comment_id,
      // user_id: payload.user_id,
      // content: payload.content,
    }
  })
  .catch(error => {
    console.log(error.toJSON());
    return error
  });
}

export const replyUnlike = (context, payload) => {
  return axios({
    validateStatus: status => {
      console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'delete',
    url: `${ domain }/api/v1/comments/${ payload.comment_id }/replies/${ payload.reply_id }/likes/0`,
    headers: {
      'Authorization': `Bearer ${ context.state.data.authorization.authorizationToken }`,
      'Refresh-Token': context.state.data.authorization.refreshToken,
    },
    data: {
      // recipe_id: payload.recipe_id,
      // comment_id: payload.comment_id,
      // user_id: payload.user_id,
      // content: payload.content,
    }
  })
  .catch(error => {
    console.log(error.toJSON());
    return error
  });
}

export const replyEdit = (context, payload) => {
  return axios({
    validateStatus: status => {
      console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'patch',
    url: `${ domain }/api/v1/comments/${ payload.comment_id }/replies/${ payload.id }`,
    headers: {
      'Authorization': `Bearer ${ context.state.data.authorization.authorizationToken }`,
      'Refresh-Token': context.state.data.authorization.refreshToken,
    },
    data: {
      recipe_id: payload.recipe_id,
      comment_id: payload.comment_id,
      user_id: payload.user_id,
      content: payload.content,
    }
  })
  .catch(error => {
    console.log(error.toJSON());
    return error
  });
}

export const replyDelete = (context, payload) => {
  return axios({
    validateStatus: status => {
      console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'delete',
    url: `${ domain }/api/v1/comments/${ payload.comment_id }/replies/${ payload.id }`,
    headers: {
      'Authorization': `Bearer ${ context.state.data.authorization.authorizationToken }`,
      'Refresh-Token': context.state.data.authorization.refreshToken,
    },
    data: {
      // comment_id: payload.comment_id,
    }
  })
  .catch(error => {
    console.log(error.toJSON());
    return error
  });
}

export const replyNew = (context, payload) => {
  return axios({
    validateStatus: status => {
      console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'post',
    url: `${ domain }/api/v1/comments/${ payload.comment_id }/replies`,
    headers: {
      'Authorization': `Bearer ${ context.state.data.authorization.authorizationToken }`,
      'Refresh-Token': context.state.data.authorization.refreshToken,
    },
    data: {
      recipe_id: payload.recipe_id,
      user_id: payload.user_id,
      comment_id: payload.comment_id,
      content: payload.content,
      // comment: {
      //   recipe_id: payload.recipe_id,
      //   user_id: payload.user_id,
      //   content: payload.content,
      // }
    }
  })
  .catch(error => {
    console.log(error.toJSON());
    return error
  });
}

export const commentEdit = (context, payload) => {
  return axios({
    validateStatus: status => {
      console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'patch',
    url: `${ domain }/api/v1/comments/${ payload.id }`,
    headers: {
      'Authorization': `Bearer ${ context.state.data.authorization.authorizationToken }`,
      'Refresh-Token': context.state.data.authorization.refreshToken,
    },
    data: {
      recipe_id: payload.recipe_id,
      user_id: payload.user_id,
      content: payload.content,
      // comment: {
      //   recipe_id: payload.recipe_id,
      //   user_id: payload.user_id,
      //   content: payload.content,
      // }
    }
  })
  .catch(error => {
    console.log(error.toJSON());
    return error
  });
}

export const commentNew = (context, payload) => {
  return axios({
    validateStatus: status => {
      console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'post',
    url: `${ domain }/api/v1/comments`,
    headers: {
      'Authorization': `Bearer ${ context.state.data.authorization.authorizationToken }`,
      'Refresh-Token': context.state.data.authorization.refreshToken,
    },
    data: {
      recipe_id: payload.recipe_id,
      user_id: payload.user_id,
      content: payload.content,
      // comment: {
      //   recipe_id: payload.recipe_id,
      //   user_id: payload.user_id,
      //   content: payload.content,
      // }
    }
  })
  .catch(error => {
    console.log(error.toJSON());
    return error
  });
}

export const bookmark = (context, payload) => {
  return axios({
    validateStatus: status => {
      console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'post',
    url: `${ domain }/api/v1/bookmarks`,
    headers: {
      'Authorization': `Bearer ${ context.state.data.authorization.authorizationToken }`,
      'Refresh-Token': context.state.data.authorization.refreshToken,
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
    url: `${ domain }/api/v1/bookmarks/${payload.recipe_id}`,
    headers: {
      'Authorization': `Bearer ${ context.state.data.authorization.authorizationToken }`,
      'Refresh-Token': context.state.data.authorization.refreshToken,
    },
    data: {}
  })
  .catch(error => {
    console.log(error.toJSON());
    return error
  });
}

export const follow = (context, payload) => {
  return axios({
    validateStatus: status => {
      console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'post',
    url: `${ domain }/api/v1/users/${ payload.user }/follow`,
    headers: {
      'Authorization': `Bearer ${ context.state.data.authorization.authorizationToken }`,
      'Refresh-Token': context.state.data.authorization.refreshToken,
    },
    params: {
      user_slug: payload.user
    }
  })
  .catch(error => {
    console.log(error.toJSON());
    return error
  });
}

export const unfollow = (context, payload) => {
  return axios({
    validateStatus: status => {
      console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'post',
    url: `${ domain }/api/v1/users/${ payload.user }/unfollow`,
    headers: {
      'Authorization': `Bearer ${ context.state.data.authorization.authorizationToken }`,
      'Refresh-Token': context.state.data.authorization.refreshToken,
    },
    params: {
      user_slug: payload.user
    }
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
    url: `${ domain }/api/v1/likes`,
    headers: {
      'Authorization': `Bearer ${ context.state.data.authorization.authorizationToken }`,
      'Refresh-Token': context.state.data.authorization.refreshToken,
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
    url: `${ domain }/api/v1/likes/${payload.recipe_id}`,
    headers: {
      'Authorization': `Bearer ${ context.state.data.authorization.authorizationToken }`,
      'Refresh-Token': context.state.data.authorization.refreshToken,
    },
    data: {}
  })
  .catch(error => {
    console.log(error.toJSON());
    return error
  });
}

export const followers = (context, payload) => {
  return axios({
    validateStatus: status => {
      console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'get',
    url: `${ domain }/api/v1/users/${payload}/followers`,
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
    url: `${ domain }/api/v1/recipes/${payload}`,
  })
  .catch(error => {
    console.log(error.toJSON());
    return error
  });
}

export const users = (context, payload) => {
  return axios({
    validateStatus: status => {
      console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'get',
    url: `${ domain }/api/v1/users`,
  })
  .catch(error => {
    console.log(error.toJSON());
    return error
  });
}

export const fetchBannerImage = (context, payload) => {
  return axios({
    validateStatus: status => {
      console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'get',
    url: `${ domain }/api/v1/unsplash_images`,
  })
  .catch(error => {
    console.log(error.toJSON());
    return error
  });
}

export const fetchPages = (context, payload) => {
  return axios({
    validateStatus: status => {
      console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'get',
    url: `${ domain }/api/v1/pages`,
  })
  .catch(error => {
    console.log(error.toJSON());
    return error
  });
}

export const pageNew = (context, payload) => {
  // console.log(payload)
  const FormData = require('form-data');
  const formData = new FormData();
  formData.append('title', payload.title);
  formData.append('content', payload.content);
  formData.append('locale', payload.locale);
  return axios({
    validateStatus: status => {
      console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'post',
    url: `${ domain }/api/v1/pages/`,
    headers: {
      'Authorization': `Bearer ${ context.state.data.authorization.authorizationToken }`,
      'Refresh-Token': context.state.data.authorization.refreshToken,
      'Content-Type': 'multipart/form-data',
    },
    data: formData
  })
  .catch(error => {
    console.log(error.toJSON());
    return error
  });
}

export const pageEdit = (context, payload) => {
  // console.log(payload)
  const FormData = require('form-data');
  const formData = new FormData();
  formData.append('title', payload.title);
  formData.append('content', payload.content);
  formData.append('locale', payload.locale);
  return axios({
    validateStatus: status => {
      console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'patch',
    url: `${ domain }/api/v1/pages/${ payload.id }`,
    headers: {
      'Authorization': `Bearer ${ context.state.data.authorization.authorizationToken }`,
      'Refresh-Token': context.state.data.authorization.refreshToken,
      'Content-Type': 'multipart/form-data',
    },
    data: formData
  })
  .catch(error => {
    console.log(error.toJSON());
    return error
  });
}

export const recipeDelete = (context, payload) => {
  // console.log(payload)
  return axios({
    validateStatus: status => {
      console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'delete',
    url: `${ domain }/api/v1/recipes/${ payload.id }`,
    headers: {
      'Authorization': `Bearer ${ context.state.data.authorization.authorizationToken }`,
      'Refresh-Token': context.state.data.authorization.refreshToken,
      'Content-Type': 'multipart/form-data',
    },
  })
  .catch(error => {
    console.log(error.toJSON());
    return error
  });
}

export const recipeEdit = (context, payload) => {
  // console.log(payload)
  const FormData = require('form-data');
  const formData = new FormData();
  formData.append('title', payload.title);
  formData.append('subtitle', payload.subtitle);
  formData.append('video', payload.video);
  formData.append('direction', payload.direction);
  formData.append('description', payload.description);
  formData.append('photo', payload.photo);
  formData.append('tag_list', payload.tagList);
  return axios({
    validateStatus: status => {
      console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'patch',
    url: `${ domain }/api/v1/recipes/${ payload.id }`,
    headers: {
      'Authorization': `Bearer ${ context.state.data.authorization.authorizationToken }`,
      'Refresh-Token': context.state.data.authorization.refreshToken,
      'Content-Type': 'multipart/form-data',
    },
    data: formData
  })
  .catch(error => {
    console.log(error.toJSON());
    return error
  });
}

export const recipeNew = (context, payload) => {
  // console.log(payload)
  const FormData = require('form-data');
  const formData = new FormData();
  formData.append('title', payload.title);
  formData.append('subtitle', payload.subtitle);
  formData.append('video', payload.video);
  formData.append('direction', payload.direction);
  formData.append('description', payload.description);
  formData.append('photo', payload.photo);
  formData.append('tag_list', payload.tagList);
  return axios({
    validateStatus: status => {
      console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'post',
    url: `${ domain }/api/v1/recipes`,
    headers: {
      'Authorization': `Bearer ${ context.state.data.authorization.authorizationToken }`,
      'Refresh-Token': context.state.data.authorization.refreshToken,
      'Content-Type': 'multipart/form-data',
    },
    data: formData
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
    url: `${ domain }/api/v1/recipes`,
  })
  .catch(error => {
    console.log(error.toJSON());
    return error
  });
}

export const recipeLog = (context, payload) => {
  // console.log(context)
  // console.log($('meta[name="csrf-token"]').attr('content'))
  return axios({
    validateStatus: status => {
      console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'post',
    url: `${ domain }/api/v1/recipe_logs`,
    headers: {
      'X-CSRF-Token': context.getters.csrfToken,
      'Authorization': `Bearer ${ context.state.data.authorization.authorizationToken }`,
      'Refresh-Token': context.state.data.authorization.refreshToken,
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

export const confirmRegistration = (context, payload) => {
  // console.log(`${ domain }/api/v1/search`)
  return axios({
    method: 'get',
    url: `${ domain }/api/v1/users/confirmation`,
    headers: {
      'X-CSRF-Token': context.getters.csrfToken,
    },
    params: {
      confirmation_token: payload.token
    },
  })
  .catch(error => {
    console.log(error.response)
  })
}

export const signUp = (context, payload) => {
  // console.log(payload)
  // console.log($('meta[name="csrf-token"]').attr('content'))
  return axios({
    validateStatus: status => {
      console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'post',
    url: `${ domain }/api/v1/users`,
    headers: {
      'X-CSRF-Token': context.getters.csrfToken,
      // 'Accept-Encoding': 'gzip',
    },
    data: payload
    // data: {
    //   "user": {
    //     "first_name": payload.firstName,
    //     "last_name": payload.lastName,
    //     "email": payload.email,
    //     "password": payload.password,
    //     "password_confirmation": payload.confirmation
    //   }
    // }
  })
  .catch(error => {
    console.log(error.toJSON());
    return error
  });
}

export const facebookLogin = (context, payload) => {
  return axios({
    validateStatus: status => {
      console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'get',
    url: `${ domain }/api/v1/facebook`,
    headers: {
      'X-CSRF-Token': context.getters.csrfToken,
      // 'Accept-Encoding': 'gzip',
      // 'Authorization': `Bearer ${ context.state.data.authorization.authorizationToken }`,
      'Refresh-Token': context.state.data.authorization.refreshToken,
    },
    params: payload
  })
  .catch(error => {
    console.log(error.toJSON());
    return error
  });
}

export const passwordResetVerification = (context, payload) => {
  // console.log(user)
  // console.log($('meta[name="csrf-token"]').attr('content'))
  return axios({
    validateStatus: status => {
      console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'post',
    url: `${ domain }/api/v1/users/password/reset_verification`,
    headers: {
      'X-CSRF-Token': context.getters.csrfToken,
      // 'Accept-Encoding': 'gzip',
    },
    data: payload
    // data: {
    //   user: {
    //     email: payload.email,
    //     password: payload.password
    //   }
    // }
  })
  .catch(error => {
    console.log(error.toJSON());
    return error
  });
}

export const passwordReset = (context, payload) => {
  // console.log(user)
  // console.log($('meta[name="csrf-token"]').attr('content'))
  return axios({
    validateStatus: status => {
      console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'post',
    url: `${ domain }/api/v1/users/password/reset`,
    headers: {
      'X-CSRF-Token': context.getters.csrfToken,
      // 'Accept-Encoding': 'gzip',
    },
    data: payload
    // data: {
    //   user: {
    //     email: payload.email,
    //     password: payload.password
    //   }
    // }
  })
  .catch(error => {
    console.log(error.toJSON());
    return error
  });
}

export const requestPasswordReset = (context, payload) => {
  // console.log(user)
  // console.log($('meta[name="csrf-token"]').attr('content'))
  return axios({
    validateStatus: status => {
      console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'post',
    url: `${ domain }/api/v1/users/password/request`,
    headers: {
      'X-CSRF-Token': context.getters.csrfToken,
      // 'Accept-Encoding': 'gzip',
    },
    data: payload
    // data: {
    //   user: {
    //     email: payload.email,
    //     password: payload.password
    //   }
    // }
  })
  .catch(error => {
    console.log(error.toJSON());
    return error
  });
}

export const resendConfirmationInstructions = (context, payload) => {
  // console.log(payload)
  // console.log($('meta[name="csrf-token"]').attr('content'))
  return axios({
    validateStatus: status => {
      console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'post',
    url: `${ domain }/api/v1/users/resend_confirmation_instructions`,
    headers: {
      'X-CSRF-Token': context.getters.csrfToken,
      // 'Accept-Encoding': 'gzip',
    },
    data: payload
    // data: {
    //   user: {
    //     email: payload.email,
    //     password: payload.password
    //   }
    // }
  })
  .catch(error => {
    console.log(error.toJSON());
    return error
  });
}

export const refreshAccessToken = (context, payload) => {
  // console.log(payload)
  return axios({
    method: 'post',
    url: `${ domain }/api/users/tokens`,
    headers: {
      'Authorization': `Bearer ${ context.state.data.authorization.authorizationToken }`,
      'Refresh-Token': context.state.data.authorization.refreshToken
    },
    // params: {
    //   // query: 'isAuthenticated',
    // }
  })
  .catch(error => {
    console.log(error)
  })
}

export const login = (context, payload) => {
  // console.log(user)
  // console.log($('meta[name="csrf-token"]').attr('content'))
  return axios({
    validateStatus: status => {
      console.log(status)
      return status < 500; // Resolve only if the status code is less than 500
    },
    method: 'post',
    url: `${ domain }/api/users/sign_in`,
    headers: {
      'X-CSRF-Token': context.getters.csrfToken,
      // 'Accept-Encoding': 'gzip',
    },
    data: payload
    // data: {
    //   user: {
    //     email: payload.email,
    //     password: payload.password
    //   }
    // }
  })
  .catch(error => {
    console.log(error.toJSON());
    return error
  });
}

export const logout = (context, payload) => {
  return axios({
    method: 'delete',
    url: `${ domain }/api/users/sign_out`,
    headers: {
      'X-CSRF-Token': context.getters.csrfToken,
      // 'X-User-Email': context.getters.currentUser.email,
      // 'X-User-Token': context.getters.currentUser.authentication_token
      'Authorization': `Bearer ${ context.state.data.authorization.authorizationToken }`,
      'Refresh-Token': context.state.data.authorization.refreshToken,
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

export const userDelete = (context, payload) => {
  return axios({
    method: 'delete',
    url: `${ domain }/api/v1/users`,
    headers: {
      'X-CSRF-Token': context.getters.csrfToken,
      'Authorization': `Bearer ${ context.state.data.authorization.authorizationToken }`,
      'Refresh-Token': context.state.data.authorization.refreshToken,
    },
    data: {
      content: payload.content
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



export const search = (context, payload) => {
  // console.log(`${ domain }/api/v1/search`)
  return axios({
    method: 'get',
    url: `${ domain }/api/v1/search`,
    params: {
      query: payload.query
    },
  })
  .catch(error => {
    console.log(error.response)
  })
}

export const fetchState = (context, {}) => {
  // console.log(`${ domain }/api/v1/state`)
  return axios({
    method: 'get',
    url: `${ domain }/api/v1/state`,
    headers: {
      // 'Accept-Encoding': 'gzip',
    },
  })
  .catch(error => {
    console.log(error.response)
  })
}

export const isAuthenticated = (payload) => {
  // console.log(payload)
  // console.log(payload.authorizationToken)
  // console.log(payload.refreshToken)
  return axios({
    method: 'get',
    url: `${ domain }/api/v1/users/status`,
    headers: {
      'Authorization': `Bearer ${ payload.authorizationToken }`,
      'Refresh-Token': payload.refreshToken
    },
    // params: {
    //   query: 'isAuthenticated',
    // }
  })
  .catch(error => {
    console.log(error)
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
