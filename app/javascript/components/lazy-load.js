import { cards } from "./cards";
import { setCardsParams } from "../util";
import { fetchRecipes } from "../util";

const max = x => {
  if (x === 5) return 25
  else return 24
}

const filterRecipes = (el, recipes) => {
  return recipes.filter(recipe => {
    if(recipe.user.slug === el) return recipe;
  });
}

const arrRecipes = (init, data) => {
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
        recipes = data.recipes.filter(item => userBookmarks.includes(item.recipe.id));
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
  console.log(result)
  return result;
}

const renderRecipes = (init, data, callback = () => {}) => {
  const cardsMax = init.cards;
  console.log(init);
  console.log(data);
  const arrRecipesObj = arrRecipes(init, data);
  let recipes = arrRecipesObj.recipes;
  let render = arrRecipesObj.render;
  let userLikes = arrRecipesObj.userLikes;
  let userBookmarks = arrRecipesObj.userBookmarks;
  console.log(recipes);
  console.log(render);
  console.log(userLikes);
  console.log(userBookmarks);

  let cardsQty = recipes.length > cardsMax ? cardsMax : recipes.length;
  const root = document.querySelector('#root');
  // let start = parseInt(root.dataset.recipes) - init.cards > 0 ? parseInt(root.dataset.recipes) - init.cards : 0;
  // let start = parseInt(root.dataset.recipes) - init.cards > 0 ? parseInt(root.dataset.recipes) - init.cards : 0;
  // let end = recipes.length;
  if (render) {
    let params = {
      init: init,
      data: data,
      array: recipes,
      bookmarks: userBookmarks,
      likes: userLikes,
      type: 'card',
      cardsQty: cardsQty,
      // start: start,
      // end: end,
    };
    // console.log(init);
    if (init.device != 'desktop') {
      if (init.currentPage && init.currentPage != 'index' && !init.currentPage.match(/.*\/.*/)) params.type = 'grid';
      // const root = document.querySelector('#root');
      root.classList.remove('p-md-2');
      root.classList.add('row');
      root.style.padding = '14px';
    }

    console.log(params);

    if (params.array.length > params.init.cards) {
      const allRecipes = document.querySelector('#root').dataset.recipes;
      console.log(allRecipes);
      if (params.array.length >= allRecipes) {
        const batchSize = Math.ceil(document.querySelector('#root').dataset.recipes / params.init.cards);
        // console.log(batchSize);
        // console.log((batchSize * params.init.cards) > params.array.length);
        // console.log(params.array.length)
        // console.log(document.querySelector('#root').dataset.recipes);
        // console.log(params.init.cards);
        // console.log(batchSize * params.init.cards);
        console.log(params.array.length);
        console.log(params.init.cards);
        params.init.cards = (batchSize * params.init.cards) > params.array.length ? allRecipes % params.init.cards : params.init.cards
      }
      params.array = params.array.slice(params.array.length - params.init.cards)
    }
    else {
      console.log(params.array.length > params.init.cards)
      console.log(params.array.length)
      console.log(params.init.cards)
    }

    console.log(params)
    cards(params);
  }
  callback();
}

export const lazyLoad = (init) => {

  // console.log(init);
  // console.log(init.device);
  // GET https://secure.example.com?user_email=alice@example.com&user_token=1G8_s7P-V-4MGojaKD7a

  const root = document.querySelector('#root');

  if (init.url.match(/.+?query=.+/) && parseInt(root.dataset.recipes) == 0) {
    init.url = `/api/v1/recipes`;
  }

  // console.log(init);
  if (init.currentController === 'u') {
    init.url = `/api/v1/recipes?slug=${init.currentPage}`;
  }

  if (init.currentPage && init.currentPage.match(/.*\/bookmarks/)) {
    console.log('bookmarks')
    init.url = `/api/v1/recipes?bookmarks=true`;
  }
  if (init.currentPage && init.currentPage.match(/.*\/recipes/)) {
    init.url = `/api/v1/recipes?recipes=true`;
  }

  const data = init.data;
  const options = init.options;

  const cardNodeElementAnchor = (data) => document.querySelector(`[data-recipe="${data.recipes[data.recipes.length-1].recipe.id}"]`);

  if (data) {
    console.log(data.recipes)
    if (data.recipes.length > 0) {
      data.recipes = data.state.recipes.slice(0, 24);
      renderRecipes(init, data, () => {
        document.querySelector('#spinner').remove();
        const cardsMax = max(setCardsParams().count);
        console.log(cardsMax);
        let renderCards = data.recipes.length % cardsMax === 0;
        console.log(renderCards);
        let cardsQty = data.recipes.length > cardsMax ? cardsMax : data.recipes.length;
        // console.log(cardsQty);
        let cardNodeElement = cardNodeElementAnchor(data);
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
              // root.dataset.recipes = newCardsQty;
              renderCards = false;
              const appendCards = (init, data) => {
                console.log(data.recipes)
                return renderRecipes(init, data, () => {
                  cardsQty = newCardsQty;
                  cardNodeElement = cardNodeElementAnchor(data);
                  if (cardNodeElement) cardNodeElementTop = window.scrollY + cardNodeElement.getBoundingClientRect().top;
                  renderCards = data.recipes.length % cardsMax === 0;
                  const result = {
                    cardNodeElementTop: cardNodeElementTop,
                    renderCards: renderCards,
                  }
                  console.log(result)
                  return result
                });
              }
              let appendCardsResult = {}
              console.log(data.state.recipes.length >= newCardsQty)
              if (data.state.recipes.length >= newCardsQty) {
                data.recipes = data.state.recipes.slice(0, newCardsQty);
                console.log(data.recipes)
                new Promise( resolve => appendCards(init, data), error => console.log(error))
                  .then((result) => {
                    console.log(result)
                    cardNodeElementTop = result.cardNodeElementTop;
                    renderCards = result.renderCards;
                  })
              }
              else {
                appendCardsResult = fetchRecipes(init).then(response => {
                  console.log(response);
                  if (response.recipes) {
                    return appendCards(init, response);
                    cardNodeElementTop = appendCardsResult.cardNodeElementTop;
                    renderCards = appendCardsResult.renderCards;
                  }
                });
              }
            }
          }
        });
      });
    }
    else {
      document.querySelector('#spinner').remove();
    }
  }
}
