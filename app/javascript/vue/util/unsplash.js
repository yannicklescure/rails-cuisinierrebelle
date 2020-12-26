import Unsplash, { toJson } from 'unsplash-js';
const unsplash = new Unsplash({ accessKey: 'nHSH2XMCvdAgrKbLMHs1M1u7vWUW8vxEmyHvDsTOLTs' });

export const getBannerPicture = (state) => {
  const query = "cooking, food, kitchen"
  // fetchBannerPicture(query)
  return unsplash.photos.getRandomPhoto({
      query: query
    })
    .then(toJson)
    .then(response => {
      console.log(response)
      return {
        id: response.id,
        url: `${response.urls.raw}&w=1600&h=900&fm=webp`,
        link: {
          download: response.links.download,
        },
        user: {
          name: response.user.name,
          username: response.user.username,
        }
      }
    })
    .catch(error => {
      console.log(error.response)
    })
}
