import { cookiesToObject } from "../components/cookies";
import { lazyLoad } from "../components/lazy-load";
import { newRecipeButton } from "../components/recipe-button-new";
import { setCardsParams } from "../util";
import { localRecipes } from "../util";
import { fetchRecipes } from "../util";
import { formattedTime } from "../util";
import { setInit } from "../util";

const setLazyLoad = (init, data) => {
  console.log(data);
  init.data = data;
  lazyLoad(init);
}

export const recipes = (location) => {
  // if (currentController === null || currentController === 'users' || currentController === 'bookmarks' || (currentController === 'recipes' && currentPage === null)) {
  // console.log(root.dataset.recipes);
  const init = setInit(location);

  let data = localRecipes();
  if (data && data.timestamp < 1599875782173) { // Force localStorage cleanup
    localStorage.removeItem('recipes'); // To remove
    data = null;
  }

  const waitingTime = 3 * 60 * 1000; // 3 minutes
  console.log(data);
  // if (!data) data = { timestamp: new Date().getTime() }
  if (data != null) {
    formattedTime(data.timestamp);
    formattedTime(data.timestamp + waitingTime);
    formattedTime(new Date().getTime());
  }

  if (data && !(data.timestamp + waitingTime <= new Date().getTime())) {
    console.log('localStorage');
    setLazyLoad(init, data);
  }
  else {
    console.log('fetch server');
    fetchRecipes(init).then(result => setLazyLoad(init, result));
  }

  if (init.userSignedIn && init.device === 'desktop') {
    setTimeout(() => {
      newRecipeButton(location);
    },2000);
  }
  // }
}
