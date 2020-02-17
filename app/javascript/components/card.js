import { cardHeart } from "./card-heart";

export const card = (init, data) => {
  const root = document.querySelector('#root');
  let userBookmarks = [];
  let userLikes = [];
  let userRecipes = [];
  let locale = init.locale;
  locale != 'en' ? locale = `/${locale}` : locale = '';
  if(data.user) {
    // if(data.user.bookmarks) userBookmarks = data.user.bookmarks.map(bookmark => ({'id': bookmark.recipe_id, 'created_at': bookmark.created_at}));
    if(data.user.bookmarks) userBookmarks = data.user.bookmarks.map(bookmark => bookmark.recipe_id);
    if(data.user.likes) userLikes = data.user.likes.map(like => like.recipe_id);
    if(data.user.recipes && data.user.auth.slug === init.currentPage) userRecipes = data.user.recipes.map(recipe => recipe.id);
    // console.log(`current_user ${data.user.auth.slug}`);
    // console.log(`user_recipes ${init.currentPage}`);
  }
  let render = false;
  let count = 0;
  let array = data.recipes;
  if(init.currentController === 'bookmarks') {
    array = data.recipes.filter(recipe => userBookmarks.includes(recipe.id));
    const ordered = [];
    userBookmarks.forEach(userBookmark => {
      array.forEach(recipe => {
        if(userBookmark === recipe.id) {
          ordered.push(recipe);
        }
      })
    });
    array = ordered;
  }
  if(!data.user || data.user.auth.slug != init.currentPage) {
    array.forEach((recipe, index) => {
      switch(init.currentController) {
        case null:
          render = true;
          break;
        case 'users':
          render = userRecipes.includes(recipe.id);
          break;
        case 'bookmarks':
          // render = userBookmarks.filter(data => (data.id === recipe.id)).length === 1;
          render = userBookmarks.includes(recipe.id);
          break;
        default:
          render = false;
      }
      if(render) {
        count += 1;
        if(count > 10) {
          let bookmarkPatchAttributes = '';
          let likePatchAttributes = '';
          let faHeart = '<i class="far fa-heart"></i>';
          let faBookmark = '<i class="far fa-bookmark"></i>';
          let bookmarkUrl = '/users/sign_in';
          let likeUrl = '/users/sign_in';
          if(data.user) {
            bookmarkUrl = `/recipes/${recipe.slug}/bookmarks`;
            bookmarkPatchAttributes = `data-bookmark-recipe="${recipe.id}" data-remote="true" rel="nofollow" data-method="patch" `;
            likeUrl = `/recipes/${recipe.slug}/likes`;
            likePatchAttributes = `data-like-recipe="${recipe.id}" data-remote="true" rel="nofollow" data-method="patch" `;
            if(userLikes.includes(recipe.id)) faHeart = '<i class="fas fa-heart"></i>';
            if(userBookmarks.includes(recipe.id)) faBookmark = '<i class="fas fa-bookmark"></i>';
          }
          const card = `
            <div class="col-md-4 col-lg-3 col-xl-2">
              <div class="card border-0" data-recipe="${recipe.id}">
                <div class="card-img-top card-img-top-${recipe.id} d-flex justify-content-center align-items-center" style="background-image: url('${recipe.photo.card.url}');">
                  <div class="fa-heart-${recipe.id} d-none text-danger display-3">
                    <i class="fas fa-heart"></i>
                  </div>
                  <div class="fa-bookmark-${recipe.id} d-none text-body display-3">
                    <i class="fas fa-bookmark"></i>
                  </div>
                </div>
                <div class="card-body py-2 px-0">
                  <div class="d-flex justify-content-between align-items-center">
                      <div class="text-danger">
                        <a class="p-0 text-danger text-decoration-none" ${likePatchAttributes}href="${likeUrl}">
                          ${faHeart}&nbsp;<span class="text-muted font-weight-lighter">${recipe.likes_count}</span>
                        </a>
                      </div>
                      <div class="d-flex align-items-center">
                        <a class="p-0 ml-3 text-body text-decoration-none" href="${locale}/recipes/${recipe.slug}#comments"><i class="far fa-comment-alt"></i></a>
                        <a class="p-0 ml-3 text-body text-decoration-none" ${bookmarkPatchAttributes}href="${bookmarkUrl}">${faBookmark}</a>
                      </div>
                  </div>
                  <a href="${locale}/users/${recipe.user.slug}" class="card-link text-body text-decoration-none" style="font-size: 90%">${recipe.user.slug}</a><br>
                  <a href="${locale}/recipes/${recipe.slug}" class="card-link text-body text-uppercase">${recipe.title}</a>
                  <div class="card-text font-weight-lighter" style="font-size: 90%">${recipe.description}</div>
                </div>
              </div>
            </div>
          `;
          root.insertAdjacentHTML('beforeEnd', card);
        }
      }
    });
    if(init.userSignedIn) cardHeart();
  }
}
