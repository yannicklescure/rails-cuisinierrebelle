import { cookiesToObject } from "../components/cookies";
import { lazyLoad } from "../components/lazy-load";

export const recipes = (root, location) => {
  // if (currentController === null || currentController === 'users' || currentController === 'bookmarks' || (currentController === 'recipes' && currentPage === null)) {
  // console.log(root.dataset.recipes);
  const userSignedIn = document.querySelector('body').dataset.user === 'true';
  const cookies = cookiesToObject(document.cookie);
  const device = document.querySelector('body').dataset.device;

  const init = {
    url: `/api/v1/recipes?cards=${root.dataset.recipes}`,
    userSignedIn: userSignedIn,
    currentController: location.currentController,
    currentPage: location.currentPage,
    user_email: cookies.user_email,
    user_token: cookies.user_token,
    locale: location.currentLang,
    device: device
  };
  if (location.query) {
    // console.log(location.query);
    init.url = `/api/v1/recipes?query=${location.query}`;
  }
  lazyLoad(init);
  // }
}
