import { cards } from "./cards";

export const lazyLoad = (init) => {

  // console.log(init);
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

  fetch(init.url, options)
  .then(response => response.json())
  .then(result => {
    const data = result.data;
    let array = data.recipes;
    let userBookmarks = [];
    if(init.currentController === 'bookmarks') {
      if(data.user.bookmarks) userBookmarks = data.user.bookmarks.map(bookmark => bookmark.recipe_id);
      array = data.recipes.filter(recipe => userBookmarks.includes(recipe.id));
      const temp = [];
      userBookmarks.forEach(userBookmark => {
        array.forEach(recipe => {
          if(userBookmark === recipe.id) {
            temp.push(recipe);
          }
        })
      });
      array = temp;
    }
    const cardsMax = 24;
    let cardsQty = array.length > cardsMax ? cardsMax : array.length;
    let renderCards = true;
    cards({
      init: init,
      data: data,
      array: array,
      userBookmarks: userBookmarks,
      cardsQty: cardsQty,
      start: 0,
      end: cardsQty
    });
    let cardNodeElement = document.querySelector(`[data-recipe="${array[cardsQty-1].id}"]`);
    let cardNodeElementTop = cardNodeElement.getBoundingClientRect().top;
    const banner = document.querySelector('.banner');
    window.addEventListener('scroll', (event) => {
      if (cardNodeElement) {
        let trigger = Math.round(window.scrollY + window.innerHeight);
        if (trigger >= cardNodeElementTop && renderCards) {
          let newCardsQty = cardsQty + cardsMax <= array.length ? cardsQty + cardsMax : array.length;
          cards({
            init: init,
            data: data,
            array: array,
            userBookmarks: userBookmarks,
            cardsQty: cardsQty,
            start: cardsQty,
            end: newCardsQty
          });
          cardsQty = newCardsQty;
          cardNodeElement = document.querySelector(`[data-recipe="${array[cardsQty-1].id}"]`);
          cardNodeElementTop = window.scrollY + cardNodeElement.getBoundingClientRect().top;
        }
        if (cardsQty == array.length) {
          renderCards = false;
        }
      }
    });
  })
  .catch(ex => {
    console.log('parsing failed', ex);
  });
}
