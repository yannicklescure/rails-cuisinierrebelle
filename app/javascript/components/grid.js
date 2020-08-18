import { cardHeart } from "./card-heart";
// import { capitalize_Words } from "../util";
import { userParams } from "../util";
// import { setCardsParams } from "../util";

export const grid = (params, callback = () => {}) => {
  console.log('grid');
  // const init = params.init;
  // const array = params.array;
  let locale = params.init.locale != 'fr' ? `/${params.init.locale}` : '';

  document.querySelector('#root').style.padding = '16px';
  console.log(params.array)

  params.array.forEach((recipe, index) => {
    // if(index + 1 > params.start && index + 1 <= params.end) {
    // if(recipe.id >= params.start && recipe.id <= params.end) {
    console.log(`recipe ${recipe.id} index ${index}`);
    // console.log(params.array[params.array.length -1].id);
    // console.log(parseInt(params.init.cards));
    // console.log(parseInt(params.array[params.array.length -1].id + params.init.cards));
    // if (parseInt(recipe.id) <= parseInt(params.array[params.array.length -1].id + params.cards)) {
    if(recipe) {
      // console.log(recipe.id);
    // if(index + 1 <= params.end) {
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
      if(params.init.userSignedIn) {
        bookmarkUrl = `/r/${recipe.slug}/bookmarks`;
        bookmarkPatchAttributes = `data-bookmark-recipe="${recipe.id}" data-remote="true" rel="nofollow" data-method="patch" `;
        likeUrl = `/r/${recipe.slug}/likes`;
        likePatchAttributes = `data-like-recipe="${recipe.id}" data-remote="true" rel="nofollow" data-method="patch" `;
        if(params.likes.includes(recipe.id)) faHeart = heartFill;
        if(params.bookmarks.includes(recipe.id)) faBookmark = bookmarkFill;
      }

      const userCheckedStatus = userParams(recipe.user.checked, params.init.locale);
      let userChecked = userCheckedStatus.checked;
      let verifiedText = userCheckedStatus.verified;

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
        <div class="col-4 col-md-4 col-lg-3 col-xl-2" style="padding: 2px;">
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
  // if(params.init.userSignedIn) cardHeart();
  callback();
}
