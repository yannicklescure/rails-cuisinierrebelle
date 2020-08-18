import { cards } from "./cards";

const filterRecipes = (el, recipes) => {
  return recipes.filter(recipe => {
    if(recipe.user.slug === el) return recipe;
  });
}

const arrRecipes = (init, options, data) => {
  let recipes = [];
  let userLikes = [];
  let userBookmarks = [];
  let render = false;
  if(init.userSignedIn && data.user) {
    if(data.user.likes) userLikes = data.user.likes.map(like => like.recipe_id);
    if(data.user.bookmarks) userBookmarks = data.user.bookmarks.map(bookmark => bookmark.recipe_id);
    switch(init.currentPage) {
      case null:
        recipes = data.recipes;
        render = recipes.length > 0;
        break;
      case 'index':
        recipes = data.recipes;
        render = recipes.length > 0;
        break;
      case `${data.user.auth.slug}/recipes`:
        if (data.user.recipes) recipes = filterRecipes(data.user.auth.slug, data.recipes);
        render = recipes.length > 0;
        break;
      case `${data.user.auth.slug}/bookmarks`:
        recipes = data.recipes.filter(recipe => userBookmarks.includes(recipe.id));
        render = recipes.length > 0;
        break;
      case `${init.currentPage}`:
        // if (init.currentPage != null) recipes = filterRecipes(init.currentPage, data.recipes);
        if (init.currentPage != null) recipes = filterRecipes(init.currentPage, data.recipes);
        render = recipes.length > 0;
        break;
      default:
        recipes = [];
        render = false;
    }
  } else {
    switch(init.currentPage) {
      case null:
        recipes = data.recipes;
        render = recipes.length > 0;
        break;
      case 'index':
        recipes = data.recipes;
        render = recipes.length > 0;
        break;
      case `${init.currentPage}`:
        if (init.currentPage != null) recipes = filterRecipes(init.currentPage, data.recipes);
        render = recipes.length > 0;
        break;
      default:
        recipes = [];
        render = false;
    }
  }
  const result = {
    recipes: recipes,
    userLikes: userLikes,
    userBookmarks: userBookmarks,
    render: render
  };
  return result;
}

const renderRecipes = (init, options, data, callback = () => {}) => {
  const cardsMax = 24;

  const arrRecipesObj = arrRecipes(init, options, data)
  let recipes = arrRecipesObj.recipes;
  let render = arrRecipesObj.render;
  let userLikes = arrRecipesObj.userLikes;
  let userBookmarks = arrRecipesObj.userBookmarks;

  let cardsQty = recipes.length > cardsMax ? cardsMax : recipes.length;
  const root = document.querySelector('#root');
  let start = parseInt(root.dataset.recipes) - 24 > 0 ? parseInt(root.dataset.recipes) - 24 : 0;
  let end = recipes.length;
  if (render) {
    let initCards = {
      init: init,
      data: data,
      array: recipes,
      bookmarks: userBookmarks,
      likes: userLikes,
      type: 'card',
      cardsQty: cardsQty,
      start: start,
      end: end,
    };
    // console.log(init);
    if (init.device != 'desktop') {
      if (init.currentPage && init.currentPage != 'index' && !init.currentPage.match(/.*\/.*/)) initCards.type = 'grid';
      const root = document.querySelector('#root');
      root.classList.remove('p-md-2');
      root.classList.add('row');
      root.style.padding = '14px';
    }
    cards(initCards);
  }
  callback();
}

const fetchRecipes = (init, options) => {
  return fetch(init.url, options)
  .then(response => response.json())
  .then(result => {
    const data = result.data;
    return data;
  })
  .catch(ex => {
    console.log('parsing failed', ex);
  });
}

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

export const lazyLoad = (init) => {

  // console.log(init);
  // console.log(init.device);
  // GET https://secure.example.com?user_email=alice@example.com&user_token=1G8_s7P-V-4MGojaKD7a
  let options;
  if(init.userSignedIn) {
    options = {
      headers: {
        'X-User-Email': atob(decodeURIComponent(init.user_email)),
        'X-User-Token': atob(decodeURIComponent(init.user_token))
      }
    };
  } else {
    options = {};
  }

  const root = document.querySelector('#root');

  if (init.url.match(/.+?query=.+/) && parseInt(root.dataset.recipes) == 0) {
    init.url = `/api/v1/recipes`;
  }

  // console.log(init);
  if (init.currentController === 'u') {
    init.url = `/api/v1/recipes?slug=${init.currentPage}`;
  }

  if (init.currentPage && init.currentPage.match(/.*\/bookmarks/)) {
    init.url = `/api/v1/recipes?bookmarks=true`;
  }
  if (init.currentPage && init.currentPage.match(/.*\/recipes/)) {
    init.url = `/api/v1/recipes?recipes=true`;
  }

  fetchRecipes(init, options).then(data => {
    if (data.recipes.length > 0) {
      renderRecipes(init, options, data, () => {
        document.querySelector('#spinner').remove();
        const cardsMax = max(setCardsCount(window.innerWidth));
        let renderCards = data.recipes.length % cardsMax === 0;
        let cardsQty = data.recipes.length > cardsMax ? cardsMax : data.recipes.length;
        let cardNodeElement = document.querySelector(`[data-recipe="${data.recipes[data.recipes.length-1].id}"]`);
        console.log(data.recipes)
        console.log(cardNodeElement)
        let cardNodeElementTop = cardNodeElement ? cardNodeElement.offsetParent.offsetTop : 75;
        window.addEventListener('scroll', () => {
          console.log(`cardNodeElementTop ${cardNodeElementTop}`)
          let trigger = Math.round(window.scrollY + window.innerHeight);
          if (cardNodeElement && renderCards) {
            if (trigger >= cardNodeElementTop) {
              let newCardsQty = cardsQty + data.recipes.length;
              // init.url = `/api/v1/recipes?cards=${newCardsQty}`;
              const initUrl = init.url.match(/(.*)(&|\?)cards=(.*)/);
              if (initUrl) {
                init.url = `${initUrl[1]}${initUrl[2]}cards=${newCardsQty}`
              } else {
                init.url += `&cards=${newCardsQty}`
              }
              root.dataset.recipes = newCardsQty;
              renderCards = false;
              fetchRecipes(init, options).then(data => {
                if (data.recipes) {
                  renderRecipes(init, options, data, () => {
                    cardsQty = newCardsQty;
                    cardNodeElement = document.querySelector(`[data-recipe="${data.recipes[data.recipes.length-1].id}"]`);
                    if (cardNodeElement) cardNodeElementTop = window.scrollY + cardNodeElement.getBoundingClientRect().top;
                    renderCards = data.recipes.length % cardsMax === 0;
                  });
                }
              });
            }
          }
        });
      });
    } else {
      document.querySelector('#spinner').remove();
    }
  });
}
