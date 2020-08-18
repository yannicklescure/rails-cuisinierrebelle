import { cookiesToObject } from "../components/cookies";
import { lazyLoad } from "../components/lazy-load";
import { newRecipeButton } from "../components/recipe-button-new";

const setCardsCount = (width) => {
  console.log(width);
  if (width >= 1600) return 6;
  else if (width >= 1400) return 5;
  // Extra large screen / wide desktop
  // xl: 1200px
  else if (width >= 1200) return 4;
  // Large screen / desktop
  // lg: 992px,
  else if (width >= 992) return 4;
  // Medium screen / tablet
  // md: 768px,
  else if (width >= 768) return 3;
  // Small screen / phone
  // sm: 576px,
  else if (width >= 576) return 2;
  // Extra small screen / phone
  // xs: 0,
  else return 1;
}

const max = x => {
  if (x === 5) return 25
  else return 24
}

export const recipes = (location) => {
  // if (currentController === null || currentController === 'users' || currentController === 'bookmarks' || (currentController === 'recipes' && currentPage === null)) {
  // console.log(root.dataset.recipes);
  const body = document.querySelector('body');
  const userSignedIn = body.dataset.user === 'true';
  const cookies = cookiesToObject(document.cookie);
  const device = body.dataset.device;

  // const cardsMax = square(setCardsCount(window.innerWidth))

  const init = {
    // url: `/api/v1/recipes?cards=${document.querySelector('#root').dataset.recipes}`,
    url: `/api/v1/recipes?cards=${max(setCardsCount(window.innerWidth))}`,
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

  if (userSignedIn && device === 'desktop') {
    setTimeout(() => {
      newRecipeButton(location);
    },2000);
  }
  // }
}
