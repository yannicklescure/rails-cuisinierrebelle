import { cardHeart } from "./card-heart";

const capitalize_Words = (str) => {
 return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

export const card = (params, callback = () => {}) => {
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

      const card = `
          <div class="card my-2" style="margin: 0 1px" data-recipe="${recipe.id}">
            <div class="card-header px-2 pt-2 pb-0 border-0 bg-white rounded">
              <div class="d-flex justify-content-start align-items-center">
                <a href="${locale}/u/${recipe.user.slug}/about" class="card-link text-body d-flex align-items-center" style="font-size: 90%"><img src="${recipe.user.image.thumb.url}" width="24px" height="24px" class="rounded-circle mr-2" style="object-fit: cover;">${capitalize_Words(recipe.user.name)}</a>
                ${userChecked}
              </div>
            </div>
            <div class="card-body p-2">
              <a href="${locale}/r/${recipe.slug}">
                <div class="card-img-top card-img-top-${recipe.id} d-flex justify-content-center align-items-center" style="background-image: url('${recipe.photo.card.url}');">
                  <div class="fa-heart-${recipe.id} d-none text-danger display-3">
                    ${heartFillBig}
                  </div>
                  <div class="fa-bookmark-${recipe.id} d-none text-body display-3">
                    ${bookmarkFillBig}
                  </div>
                </div>
              </a>
              <div class="d-flex flex-column">
                <a href="${locale}/r/${recipe.slug}" class="card-link mt-2 text-body text-uppercase">${recipe.title}</a>
                <div class="card-text font-weight-lighter" style="font-size: 90%">${recipe.description}</div>
              </div>
            </div>
            <div class="card-footer p-2">
              <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex align-items-center text-danger">
                  <a class="p-0 text-danger text-decoration-none d-flex align-items-center" ${likePatchAttributes} href="${likeUrl}">
                    ${faHeart}<span class="text-muted font-weight-lighter ml-1">${recipe.likes_count}</span>
                  </a>
                </div>
                <div class="d-flex align-items-center">
                  <a class="p-0 ml-3 text-body text-decoration-none d-flex align-items-center" href="${locale}/r/${recipe.slug}#comments">
                    ${comment}<span class="text-muted font-weight-lighter ml-1">${commentsCount}</span>
                  </a>
                  <a class="p-0 ml-3 text-body text-decoration-none d-flex align-items-center" ${bookmarkPatchAttributes}href="${bookmarkUrl}">${faBookmark}</a>
                </div>
              </div>
            </div>
          </div>
      `;
      const root = document.querySelector('#root');
      root.insertAdjacentHTML('beforeEnd', card);
      // const cardImgTop = document.querySelector(`.card-img-top-${recipe.id}`);
      // cardImgTop.style.minHeight = `${cardImgTop.clientWidth}px`;
    }
  });
  if(init.userSignedIn) cardHeart();
  callback();
}
