export const card = (data) => {
  const root = document.querySelector('#root');
  let bookmarkPatchAttributes, likePatchAttributes;
  let faHeart = '<i class="far fa-heart"></i>';
  let faBookmark = '<i class="far fa-bookmark"></i>';
  let bookmarks = [];
  let likes = [];
  let bookmarkUrl = '/users/sign_in';
  let likeUrl = '/users/sign_in';
  if(data.user) {
    if(data.user.bookmarks) data.user.bookmarks.forEach(bookmark => bookmarks.push(bookmark.recipe_id));
    if(data.user.likes) data.user.likes.forEach(like => likes.push(like.recipe_id));
  }
  data.recipes.forEach(recipe => {
    if(data.user) {
      bookmarkUrl = `/recipes/${recipe.slug}/bookmarks`;
      bookmarkPatchAttributes = `data-bookmark-recipe="${recipe.id}" data-remote="true" rel="nofollow" data-method="patch" `;
      likeUrl = `/recipes/${recipe.slug}/likes`;
      likePatchAttributes = `data-like-recipe="${recipe.id}" data-remote="true" rel="nofollow" data-method="patch" `;
      if(likes.includes(recipe.id)) faHeart = '<i class="fas fa-heart"></i>';
      if(bookmarks.includes(recipe.id)) faBookmark = '<i class="fas fa-bookmark"></i>';
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
                  <a class="p-0 ml-3 text-body text-decoration-none" href="/recipes/${recipe.slug}#comments"><i class="far fa-comment-alt"></i></a>
                  <a class="p-0 ml-3 text-body text-decoration-none" ${bookmarkPatchAttributes}href="${bookmarkUrl}">${faBookmark}</a>
                </div>
            </div>
            <a href="/recipes/${recipe.slug}" class="card-link text-body text-uppercase">${recipe.title}</a>
            <div class="card-text font-weight-lighter">${recipe.description}</div>
          </div>
        </div>
      </div>
    `;
    root.insertAdjacentHTML('beforeEnd', card);
  });
}
