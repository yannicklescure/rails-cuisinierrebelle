import { cardHeart } from "./card-heart";

const capitalize_Words = (str) => {
 return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

export const grid = (params, callback = () => {}) => {
  const init = params.init;
  const array = params.array;
  let locale = init.locale != 'en' ? `/${init.locale}` : '';

  array.forEach((recipe, index) => {
    if(index + 1 > params.start && index + 1 <= params.end) {
      let bookmarkPatchAttributes = '';
      let likePatchAttributes = '';
      const heart = `<i class="material-icons md-18 align-icons">favorite_border</i>`;
      const heartFill = `<i class="material-icons md-18 align-icons">favorite</i>`;
      const heartFillBig = `<i class="material-icons md-132">favorite</i>`;
      const bookmark = `<i class="material-icons md-18 align-icons">bookmark_border</i>`;
      const bookmarkFill = `<i class="material-icons md-18 align-icons">bookmark</i>`;
      const bookmarkFillBig = `<i class="material-icons md-132">bookmark</i>`;
      const comment = `<i class="material-icons md-18">comment</i>`;
      let likeUrl = '/users/sign_in';
      let bookmarkUrl = '/users/sign_in';
      let faHeart = heart;
      let faBookmark = bookmark;
      if(init.userSignedIn) {
        bookmarkUrl = `/r/${recipe.slug}/bookmarks`;
        bookmarkPatchAttributes = `data-bookmark-recipe="${recipe.id}" data-remote="true" rel="nofollow" data-method="patch" `;
        likeUrl = `/r/${recipe.slug}/likes`;
        likePatchAttributes = `data-like-recipe="${recipe.id}" data-remote="true" rel="nofollow" data-method="patch" `;
        if(params.likes.includes(recipe.id)) faHeart = heartFill;
        if(params.bookmarks.includes(recipe.id)) faBookmark = bookmarkFill;
      }

      const userCheckedStatus = recipe.user.checked;
      let userChecked = '';
      let verifiedText = '';
      if (userCheckedStatus) {
        switch(init.locale) {
          case 'fr':
            verifiedText = `Vérifié`;
            break;
          case 'es':
            verifiedText = `Auditado`;
            break;
          default:
            verifiedText = `Verified`;
        }
        userChecked = `<span data-toggle="tooltip" data-placement="top" title="${verifiedText}" class="ml-1">
          <i class="material-icons md-16 d-flex" style="font-size: 90%">check_circle</i>
        </span>`;
      }

      let commentsCount = 0;
      if (recipe.comments) {
        // console.log(`recipe ${recipe.id} comments ${recipe.comments.length}`);
        recipe.comments.forEach(comment => {
          commentsCount += 1;
          if (comment.replies) {
            commentsCount += comment.replies.length;
            // console.log(`replies ${comment.replies.length}`)
          }
        })
      }
      // console.log(`count ${commentsCount}`);

      const grid = `
        <div class="col-4 col-md-4 col-lg-3 col-xl-2 p-2">
          <div class="grid border-0" data-recipe="${recipe.id}">
            <a href="${locale}/r/${recipe.slug}">
              <div class="grid-img-top grid-img-top-${recipe.id} d-flex justify-content-center align-items-center" style="background-image: url('${recipe.photo.card.url}');"></div>
            </a>
          </div>
        </div>
      `;
      const root = document.querySelector('#root');
      root.insertAdjacentHTML('beforeEnd', grid);
      const gridImgTop = document.querySelector(`.grid-img-top-${recipe.id}`);
      gridImgTop.style.minHeight = `${gridImgTop.clientWidth}px`;
    }
  });
  // if(init.userSignedIn) cardHeart();
  callback();
}
