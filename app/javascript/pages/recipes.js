import { cookiesToObject } from "../components/cookies";
import { lazyLoad } from "../components/lazy-load";
import { newRecipeButton } from "../components/recipe-button-new";
import { setCardsParams } from "../util";

const max = x => {
  if (x === 5) return 25
  else return 24
}

const localRecipes = () => {
  const data = localStorage.getItem('recipes')
  if (data) return JSON.parse(data);
  else return null
}

const fetchRecipes = (init) => {
  return fetch(init.url, init.options)
    .then(response => response.json())
    .then(result => {
      const data = result.data;
      console.log(data)
      data.timestamp = (new Date).getTime()
      localStorage.setItem('recipes', JSON.stringify(data));
      return data;
    })
    .catch(ex => {
      console.log('parsing failed', ex);
    });
}

const setLazyLoad = (init, data) => {
  init.data = data;
  lazyLoad(init);
}

export const recipes = (location) => {
  // if (currentController === null || currentController === 'users' || currentController === 'bookmarks' || (currentController === 'recipes' && currentPage === null)) {
  // console.log(root.dataset.recipes);
  const body = document.querySelector('body');
  const userSignedIn = body.dataset.user === 'true';
  const cookies = cookiesToObject(document.cookie);
  const device = body.dataset.device;
  const cardsMaxCount = max(setCardsParams().count);
  // const cardsMax = square(setCardsCount(window.innerWidth))

  let options;
  if(userSignedIn) {
    options = {
      headers: {
        'X-User-Email': atob(decodeURIComponent(cookies.user_email)),
        'X-User-Token': atob(decodeURIComponent(cookies.user_token))
      }
    };
  } else {
    options = {};
  }

  const init = {
    // url: `/api/v1/recipes?cards=${document.querySelector('#root').dataset.recipes}`,
    url: `/api/v1/recipes?cards=${cardsMaxCount}`,
    userSignedIn: userSignedIn,
    currentController: location.currentController,
    currentPage: location.currentPage,
    user_email: cookies.user_email,
    user_token: cookies.user_token,
    locale: location.currentLang,
    device: device,
    cards: cardsMaxCount,
    options: options
  };
  if (location.query) {
    // console.log(location.query);
    init.url = `/api/v1/recipes?query=${location.query}`;
  }

  let data = localRecipes();

  if (data) setLazyLoad(init, data)
  else fetchRecipes(init).then(data => setLazyLoad(init, data))

  if (userSignedIn && device === 'desktop') {
    setTimeout(() => {
      newRecipeButton(location);
    },2000);
  }
  // }
}
