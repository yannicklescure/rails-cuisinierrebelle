// const { cookiesToObject } = await import("../components/cookies");
// const { setCardsParams } = await import("../util");
// const { formattedTime } = await import("../util");
// const { setSkeleton } = await import("../components/skeleton");

const setLazyLoad = async (init, data) => {
  console.log(data);
  if (!init.dataRecipes) init.dataRecipes = data.recipes;
  init.data = data;
  if (init.query) {
    init.data = data.search.recipes.length > 0 ? data.search : data
    init.dataRecipes = init.data.recipes;
  }
  const { lazyLoad } = await import("../components/lazy-load");
  lazyLoad(init);
}

const getLastRecipeTimestamp = (init) => {
  return fetch('/api/v1/recipes?timestamp=true', init.options)
    .then(response => response.json())
    .then(result => result.timestamp)
}

export const recipes = async (location) => {
  const { setInit } = await import("../util");
  const init = await setInit(location);
  const lastRecipeTimestamp = await getLastRecipeTimestamp(init);
  setRecipes(init, lastRecipeTimestamp);
  console.log(lastRecipeTimestamp);
  window.addEventListener('resize', () => {
    setRecipes(init, lastRecipeTimestamp);
  })
}

const setRecipes = async (init, lastRecipeTimestamp) => {

  console.log(init);
  const { localRecipes } = await import("../util");
  let data = await localRecipes(init);
  // Promise.resolve(data && data.timestamp < lastRecipeTimestamp)
  const { fetchRecipes } = await import("../util");
  if (data) {
    if (data.timestamp < lastRecipeTimestamp) {
      localStorage.removeItem('cuisinier_rebelle'); // To remove
      // data = null;
      console.log('fetch server');
      init.url = `/api/v1/recipes`;
      const result = await fetchRecipes(init);
      console.log(result)
      setLazyLoad(init, result);
    }
    else {
      console.log(lastRecipeTimestamp);
      console.log(data.timestamp);
      console.log('fetch localStorage');
      console.log(typeof data);
      const { setStore } = await import("../util");
      setStore(data);
      console.log(init.url);
      if (init.url.match(/.+?query=.+/)) {
        console.log('fetch search')
        // init.url = `/api/v1/recipes`;
        // init.dataRecipes = data.state.recipes;
        // console.log(init.dataRecipes)
        // fetchRecipes(init).then(result => setLazyLoad(init, result));
        const result = await fetchRecipes(init)
        setLazyLoad(init, result);
      }

      else if (init.currentController === 'u' && init.currentPage.match(/.*\/bookmarks/)) {
        console.log('bookmarks')
        init.url = `/api/v1/recipes?bookmarks=true`;
        console.log(init.dataRecipes)
        data = data.user.bookmarks || null
        init.dataRecipes = data.recipes;
        console.log(data)
        setLazyLoad(init, data);
      }

      else if (init.currentController === 'u' && !init.currentPage.match(/.*\/bookmarks/)) {
        init.url = `/api/v1/recipes?slug=${init.currentPage}`;
        console.log(init.currentPage.match(/\w+/)[0])
        data = data.getters.currentUsers.filter(user => user.slug === init.currentPage.match(/\w+/)[0])[0] || null
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
  }
  else {
    localStorage.removeItem('cuisinier_rebelle'); // To remove
    // data = null;
    console.log('fetch server');
    init.url = `/api/v1/recipes`;
    fetchRecipes(init).then(result => setLazyLoad(init, result));
  }
}
