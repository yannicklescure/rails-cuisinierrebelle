// import Unsplash, { toJson } from 'unsplash-js';
// const unsplash = new Unsplash({ accessKey: 'nHSH2XMCvdAgrKbLMHs1M1u7vWUW8vxEmyHvDsTOLTs' });

import nodeFetch from 'node-fetch';
import { createApi } from 'unsplash-js';

export const unsplash = createApi({
  accessKey: 'nHSH2XMCvdAgrKbLMHs1M1u7vWUW8vxEmyHvDsTOLTs',
  fetch: nodeFetch,
});

export const getBannerPicture = (viewport) => {
  // fetchBannerPicture(query)
  return unsplash.photos.getRandom({
      query: "food",
      count: 1,
    })
    .then(response => {
      console.log(response)
      const data = response.response[0]
      return {
        id: data.id,
        url: `${data.urls.raw}&w=${viewport.width}&h=${viewport.height}&fm=webp`,
        link: {
          download: data.links.download,
        },
        user: {
          name: data.user.name,
          username: data.user.username,
        }
      }
    })
    .catch(error => {
      console.log(error.response)
    })
}
