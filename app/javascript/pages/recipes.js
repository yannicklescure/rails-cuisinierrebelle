import { cookiesToObject } from "../components/cookies";
import { lazyLoad } from "../components/lazy-load";
import { newRecipeButton } from "../components/recipe-button-new";
import { setCardsParams } from "../util";
import { localRecipes } from "../util";
import { fetchRecipes } from "../util";
import { formattedTime } from "../util";
import { setInit } from "../util";
import { setSkeleton } from "../components/skeleton";

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
  return fetch('/api/v1/recipes?timestamp=true', init.options)
    .then(response => response.json())
    .then(result => {
      setRecipes(init, result.timestamp)
      console.log(result);
    })
}

export const recipes = (location) => {
  // setSkeleton();

  const init = setInit(location);
  getLastRecipeTimestamp(init);
  window.addEventListener('resize', () => {
    getLastRecipeTimestamp(init);
  })
}

export const setRecipes = (init, lastRecipeTimestamp) => {

  let data = localRecipes(init);
  Promise.resolve(data && data.timestamp < lastRecipeTimestamp)
  .then(reload => {
    console.log(reload)
    if(reload || reload === null) { // Force localStorage cleanup
      localStorage.removeItem('recipes'); // To remove
      // data = null;
      console.log('fetch server');
      init.url = `/api/v1/recipes`;
      fetchRecipes(init).then(result => setLazyLoad(init, result));
    }
    else {
      console.log('fetch localStorage');

      console.log(init.url)
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
  })

  if (init.userSignedIn && init.device === 'desktop') {
    setTimeout(() => {
      newRecipeButton(location);
    },1500);
  }
  // }
}
