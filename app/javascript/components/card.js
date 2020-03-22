import { cardHeart } from "./card-heart";

const capitalize_Words = (str) => {
 return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

const setUserRecipes = (el, recipes) => {
  return recipes.filter(recipe => {
    if(recipe.user.slug === el) return recipe;
  });
}

export const card = (init, data) => {
  const root = document.querySelector('#root');
  let userBookmarks = [];
  let userLikes = [];
  let userRecipes = [];
  let locale = init.locale != 'en' ? `/${init.locale}` : '';
  let render = false;
  let count = 0;
  let array = data.recipes;
  if(init.userSignedIn && data.user) {
    if(data.user.bookmarks) userBookmarks = data.user.bookmarks.map(bookmark => bookmark.recipe_id);
    if(data.user.likes) userLikes = data.user.likes.map(like => like.recipe_id);
    if(data.user.recipes && init.currentController === 'recipes') {
      userRecipes = setUserRecipes(data.user.auth.slug, data.recipes);
    }
  }
  if(init.currentController === 'users' && init.currentPage != null) {
    userRecipes = setUserRecipes(init.currentPage, data.recipes);
  }
  if(init.currentController === 'bookmarks') {
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
  if(array) {
    array.forEach((recipe, index) => {
      switch(init.currentController) {
        case null:
          render = true;
          break;
        case 'users':
          render = userRecipes.includes(recipe);
          break;
        case 'recipes':
          render = userRecipes.includes(recipe);
          break;
        case 'bookmarks':
          render = userBookmarks.includes(recipe.id);
          break;
        default:
          render = false;
      }
      if(render) {
        count += 1;
        if(count > 0) {
          let bookmarkPatchAttributes = '';
          let likePatchAttributes = '';
          const heart = `<svg class="bi bi-heart mb-1" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 01.176-.17C12.72-3.042 23.333 4.867 8 15z" clip-rule="evenodd"/>
          </svg>`;
          const heartFill = `<svg class="bi bi-heart-fill mb-1" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" clip-rule="evenodd"/>
            </svg>`;
          let faHeart = heart;
          const bookmark = `<svg class="bi bi-bookmark mb-1" width="1.1em" height="1.1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M8 12l5 3V3a2 2 0 00-2-2H5a2 2 0 00-2 2v12l5-3zm-4 1.234l4-2.4 4 2.4V3a1 1 0 00-1-1H5a1 1 0 00-1 1v10.234z" clip-rule="evenodd"/>
          </svg>`;
          const bookmarkFill = `<svg class="bi bi-bookmark-fill mb-1" width="1.1em" height="1.1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M3 3a2 2 0 012-2h6a2 2 0 012 2v12l-5-3-5 3V3z" clip-rule="evenodd"/>
          </svg>`;
          let faBookmark = bookmark;
          const comment = `<svg class="bi bi-chat-square mb-1" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M14 1H2a1 1 0 00-1 1v8a1 1 0 001 1h2.5a2 2 0 011.6.8L8 14.333 9.9 11.8a2 2 0 011.6-.8H14a1 1 0 001-1V2a1 1 0 00-1-1zM2 0a2 2 0 00-2 2v8a2 2 0 002 2h2.5a1 1 0 01.8.4l1.9 2.533a1 1 0 001.6 0l1.9-2.533a1 1 0 01.8-.4H14a2 2 0 002-2V2a2 2 0 00-2-2H2z" clip-rule="evenodd"/>
          </svg>`;
          let bookmarkUrl = '/users/sign_in';
          let likeUrl = '/users/sign_in';
          if(data.user) {
            bookmarkUrl = `/recipes/${recipe.slug}/bookmarks`;
            bookmarkPatchAttributes = `data-bookmark-recipe="${recipe.id}" data-remote="true" rel="nofollow" data-method="patch" `;
            likeUrl = `/recipes/${recipe.slug}/likes`;
            likePatchAttributes = `data-like-recipe="${recipe.id}" data-remote="true" rel="nofollow" data-method="patch" `;
            if(userLikes.includes(recipe.id)) faHeart = heartFill;
            if(userBookmarks.includes(recipe.id)) faBookmark = bookmarkFill;
          }
          const card = `
            <div class="col-md-4 col-lg-3 col-xl-2">
              <div class="card border-0" data-recipe="${recipe.id}">
                <div class="card-img-top card-img-top-${recipe.id} d-flex justify-content-center align-items-center" style="background-image: url('${recipe.photo.card.url}');">
                  <div class="fa-heart-${recipe.id} d-none text-danger display-3">
                    ${heartFill}
                  </div>
                  <div class="fa-bookmark-${recipe.id} d-none text-body display-3">
                    ${bookmarkFill}
                  </div>
                </div>
                <div class="card-body py-2 px-0">
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="d-flex align-items-center text-danger">
                      <a class="p-0 text-danger text-decoration-none" ${likePatchAttributes}href="${likeUrl}">
                        ${faHeart}&nbsp;<span class="text-muted font-weight-lighter">${recipe.likes_count}</span>
                      </a>
                    </div>
                    <div class="d-flex align-items-center">
                      <a class="p-0 ml-3 text-body text-decoration-none" href="${locale}/recipes/${recipe.slug}#comments">${comment}</a>
                      <a class="p-0 ml-3 text-body text-decoration-none" ${bookmarkPatchAttributes}href="${bookmarkUrl}">${faBookmark}</a>
                    </div>
                  </div>
                  <a href="${locale}/users/${recipe.user.slug}" class="card-link text-body text-decoration-none" style="font-size: 90%">${capitalize_Words((recipe.user.slug).replace('-',' '))}</a><br>
                  <a href="${locale}/recipes/${recipe.slug}" class="card-link text-body text-uppercase">${recipe.title}</a>
                  <div class="card-text font-weight-lighter" style="font-size: 90%">${recipe.description}</div>
                </div>
              </div>
            </div>
          `;
          root.insertAdjacentHTML('beforeEnd', card);
          const cardNodeElement = document.querySelector(`[data-recipe*="${recipe.id}"]`);
          const svgElements = cardNodeElement.querySelectorAll('svg');
          svgElements.forEach(svgElement => {
            svgElement.style.fontSize = '115%';
          });
        }
      }
    });
    if(init.userSignedIn) cardHeart();
  }
}
