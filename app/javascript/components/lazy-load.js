import { cards } from "./cards";

const filterRecipes = (el, recipes) => {
  return recipes.filter(recipe => {
    if(recipe.user.slug === el) return recipe;
  });
}

const renderRecipes = (init, options) => {
  fetch(init.url, options)
  .then(response => response.json())
  .then(result => {
    const data = result.data;
    let array = data.recipes;
    const cardsMax = 24;
    let recipes = [];
    let userLikes = [];
    let userBookmarks = [];
    let render = false;
    if(init.userSignedIn && data.user) {
      if(data.user.likes) userLikes = data.user.likes.map(like => like.recipe_id);
      if(data.user.bookmarks) userBookmarks = data.user.bookmarks.map(bookmark => bookmark.recipe_id);
      switch(init.currentPage) {
        case null:
          recipes = array;
          render = recipes.length > 0;
          break;
        case 'index':
          recipes = array;
          render = recipes.length > 0;
          break;
        case `${data.user.auth.slug}/recipes`:
          if (data.user.recipes) recipes = filterRecipes(data.user.auth.slug, data.recipes);
          render = recipes.length > 0;
          break;
        case `${data.user.auth.slug}/bookmarks`:
          recipes = array.filter(recipe => userBookmarks.includes(recipe.id));
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
    } else {
      switch(init.currentPage) {
        case null:
          recipes = array;
          render = recipes.length > 0;
          break;
        case 'index':
          recipes = array;
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

    let cardsQty = recipes.length > cardsMax ? cardsMax : recipes.length;
    if (render) {
      cards({
        init: init,
        data: data,
        array: recipes,
        bookmarks: userBookmarks,
        likes: userLikes,
        cardsQty: cardsQty,
        start: 0,
        end: cardsQty
      });
      window.addEventListener('scroll', (event) => {
        let cardNodeElement = document.querySelector(`[data-recipe="${recipes[cardsQty-1].id}"]`);
        let cardNodeElementTop = cardNodeElement ? cardNodeElement.offsetParent.offsetTop : 75;
        const banner = document.querySelector('.banner');
        let renderCards = true;
        let trigger = Math.round(window.scrollY + window.innerHeight);
        if (cardNodeElement) {
          if (trigger >= cardNodeElementTop && renderCards) {
            let newCardsQty = cardsQty + cardsMax <= recipes.length ? cardsQty + cardsMax : recipes.length;
            cards({
              init: init,
              data: data,
              array: recipes,
              bookmarks: userBookmarks,
              likes: userLikes,
              cardsQty: cardsQty,
              start: cardsQty,
              end: newCardsQty
            });
            cardsQty = newCardsQty;
            cardNodeElement = document.querySelector(`[data-recipe="${recipes[cardsQty-1].id}"]`);
            cardNodeElementTop = window.scrollY + cardNodeElement.getBoundingClientRect().top;
          }
          if (cardsQty == recipes.length) {
            renderCards = false;
          }
        }
      });
    }
    document.querySelector('#spinner').remove();
  })
  .catch(ex => {
    console.log('parsing failed', ex);
  });
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

  renderRecipes(init, options);
}
