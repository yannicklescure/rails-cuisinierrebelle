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
    let cardsQty = array.length > 24 ? 24 : array.length;
    let renderCards = true;
    // console.log(array);
    cards({
      init: init,
      data: data,
      array: array,
      userBookmarks: userBookmarks,
      cardsQty: cardsQty,
      start: 0,
      end: cardsQty
    });
    window.addEventListener('scroll', (event) => {
      const cardNodeElement = document.querySelector(`[data-recipe="${array[cardsQty-1].id}"]`);
      if (cardNodeElement) {
      // console.log(cardNodeElement);
      let rect = cardNodeElement.getBoundingClientRect();
        // cardNodeElement.classList.add('bg-danger');
        if (event.target.defaultView.scrollY >= rect.top - 500) {
          let newCardsQty = cardsQty + 24 <= array.length ? cardsQty + 24 : array.length;
          if (renderCards) {
            // console.log(`scrollTop: ${event.target.defaultView.scrollY}`);
            // console.log(`rectTop: ${rect.top}`);
            // // console.log(rect.top, rect.right, rect.bottom, rect.left);
            // console.log(`cardsQty: ${cardsQty}`);
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
            // console.log(`newCardsQty: ${newCardsQty}`);
            if (newCardsQty == array.length) {
              // console.log('finished');
              renderCards = false;
            }
          }
        }
      }
    });
  })
  .catch(ex => {
    console.log('parsing failed', ex);
  });
}
