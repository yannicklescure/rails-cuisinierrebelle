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
  if (!init.dataRecipes) init.dataRecipes = data.recipes;
  init.data = data;
  if (init.query) {
    init.data = data.search.recipes.length > 0 ? data.search : data
    init.dataRecipes = init.data.recipes;
  }
  lazyLoad(init);
}

const getLastRecipeTimestamp = (init) => {
  init.url = '/api/v1/recipes?timestamp=true';
  return fetch(init.url, init.options)
    .then(response => response.json())
    .then(result => console.log(result))
}

export const recipes = (location) => {
  // if (currentController === null || currentController === 'users' || currentController === 'bookmarks' || (currentController === 'recipes' && currentPage === null)) {
  // console.log(root.dataset.recipes);
  const init = setInit(location);

  let data = localRecipes();
  const lastRecipeTimestamp = getLastRecipeTimestamp(init);
  console.log(lastRecipeTimestamp)
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

    if (init.url.match(/.+?query=.+/)) {
      console.log('fetch search')
      // init.url = `/api/v1/recipes`;
      // init.dataRecipes = data.state.recipes;
      // console.log(init.dataRecipes)
      fetchRecipes(init).then(result => setLazyLoad(init, result));
    }

    else if (init.currentController === 'u' && init.currentPage.match(/.*\/bookmarks/)) {
      console.log('bookmarks')
      init.url = `/api/v1/recipes?bookmarks=true`;
      console.log(init.dataRecipes)
      data = data.user.bookmarks || null
      init.dataRecipes = data.recipes;
      console.log('######################')
      console.log(data)
      console.log('######################')
      setLazyLoad(init, data);
    }

    else if (init.currentController === 'u' && !init.currentPage.match(/.*\/bookmarks/)) {
      init.url = `/api/v1/recipes?slug=${init.currentPage}`;
      console.log(init.currentPage.match(/\w+/)[0])
      data = data.getters.users.filter(user => user.slug === init.currentPage.match(/\w+/)[0])[0] || null
      init.dataRecipes = data.recipes;
      console.log(init.dataRecipes)
      setLazyLoad(init, data);
    }

    else {
      init.dataRecipes = data.state.recipes;
      console.log(init.dataRecipes)
      setLazyLoad(init, data);
    }

  }
  else {
    console.log('fetch server');
    init.url = `/api/v1/recipes`;
    fetchRecipes(init).then(result => setLazyLoad(init, result));
  }

  if (init.userSignedIn && init.device === 'desktop') {
    setTimeout(() => {
      newRecipeButton(location);
    },2000);
  }
  // }
}
