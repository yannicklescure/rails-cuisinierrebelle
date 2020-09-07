import { cardHeart } from "./card-heart";
import { cookiesToObject } from "../components/cookies";
import { setCardsParams } from "../util";
import { capitalize_Words } from "../util";
import { userParams } from "../util";

const setCards = (params) => {

  let locale = params.init.locale != 'fr' ? `/${params.init.locale}` : '';

  let trigger = 0;
  let cardDeck = `<div class="card-deck">`;

  // console.log(Math.ceil(params.array.length / params.count));
  // console.log(Math.ceil(document.querySelector('#root').dataset.recipes / params.count));
  console.log(params.array)
  // console.log(params.start)
  // console.log(params.end)

  params.array.forEach((item, index) => {
    // console.log(index)
    // if(recipe.id >= params.start && recipe.id <= params.end) {
    // if(index + 1 > params.start && index + 1 <= params.end) {
    // if(index + 1 <= params.end) {
    console.log(item)
    if (item) {
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
        bookmarkUrl = `/r/${item.recipe.slug}/bookmarks`;
        bookmarkPatchAttributes = `data-bookmark-recipe="${item.recipe.id}" data-remote="true" rel="nofollow" data-method="patch" `;
        likeUrl = `/r/${item.recipe.slug}/likes`;
        likePatchAttributes = `data-like-recipe="${item.recipe.id}" data-remote="true" rel="nofollow" data-method="patch" `;
        if(params.likes.includes(item.recipe.id)) faHeart = heartFill;
        if(params.bookmarks.includes(item.recipe.id)) faBookmark = bookmarkFill;
      }

      const userCheckedStatus = userParams(item.user.checked, params.init.locale);
      let userChecked = userCheckedStatus.checked;
      let verifiedText = userCheckedStatus.verified;

      let commentsCount = 0;
      if (item.comments) {
        // console.log(`recipe ${recipe.id} comments ${recipe.comments.length}`);
        item.comments.forEach(comment => {
          commentsCount += 1;
          if (comment.replies) {
            commentsCount += comment.replies.length;
            // console.log(`replies ${comment.replies.length}`)
          }
        })
      }
      // console.log(`count ${commentsCount}`);
      console.log(`recipe ${item.recipe.id} index ${index}`);
      console.log(item);
      console.log(item.user.image.thumb.url);
      console.log(item.recipe.photo.card.url);

      const card = `
          <div class="card rounded border-0 my-3 m-md-2" data-recipe="${item.recipe.id}">
            <div class="card-header bg-white px-2 pt-2 pb-0 border-0">
              <div class="d-flex justify-content-start align-items-center">
                <a href="${locale}/u/${item.user.slug}" class="card-link text-body d-flex align-items-center" style="font-size: 90%"><img src="${item.user.image.thumb.url}" width="24px" height="24px" class="rounded-circle mr-2" style="object-fit: cover;">${capitalize_Words(item.user.name)}</a>
                ${userChecked}
              </div>
            </div>
            <div class="card-body bg-white p-2">
              <a href="${locale}/r/${item.recipe.slug}">
                <div class="card-img-top card-img-top-${item.recipe.id} d-flex justify-content-center align-items-center" style="background-image: url('${item.recipe.photo.card.url}');">
                  <div class="fa-heart-${item.recipe.id} d-none text-danger display-3">
                    ${heartFillBig}
                  </div>
                  <div class="fa-bookmark-${item.recipe.id} d-none text-body display-3">
                    ${bookmarkFillBig}
                  </div>
                </div>
              </a>
              <div class="d-flex justify-content-between align-items-center my-2">
                <div class="d-flex align-items-center text-danger">
                  <a class="p-0 text-danger text-decoration-none d-flex align-items-center" ${likePatchAttributes} href="${likeUrl}">
                    ${faHeart}<span class="text-muted font-weight-lighter ml-1">${item.recipe.likes_count}</span>
                  </a>
                </div>
                <div class="d-flex align-items-center">
                  <a class="p-0 ml-3 text-body text-decoration-none d-flex align-items-center" href="${locale}/r/${item.recipe.slug}#comments">
                    ${comment}<span class="text-muted font-weight-lighter ml-1">${commentsCount}</span>
                  </a>
                  <a class="p-0 ml-3 text-body text-decoration-none d-flex align-items-center" ${bookmarkPatchAttributes}href="${bookmarkUrl}">${faBookmark}</a>
                </div>
              </div>
              <div class="d-flex flex-column">
                <a href="${locale}/r/${item.recipe.slug}" class="card-link text-body text-uppercase">${item.recipe.title}</a>
                <div class="card-text font-weight-lighter" style="font-size: 90%">${item.recipe.description}</div>
              </div>
            </div>
          </div>
      `;

      cardDeck += card;
      trigger += 1;

      // const cardsCount = setCardsParams(window.innerWidth);

      // console.log(trigger);
      // console.log(params.count);
      if (trigger === params.count || item.recipe.id === params.array[params.array.length-1].recipe.id) {
        cardDeck += `</div>`;
        const root = document.querySelector('#root');
        root.insertAdjacentHTML('beforeEnd', cardDeck);
        trigger = 0;
        cardDeck = `<div class="card-deck">`
      }

      // const cardImgTop = document.querySelector(`.card-img-top-${recipe.id}`);
      // cardImgTop.style.minHeight = `${cardImgTop.clientWidth}px`;
    }
    const cards = document.querySelectorAll('.card');
    let cardWidth = 0;

    cards.forEach((card, index) => {
      card.style.maxWidth = `${params.width}px`;
    });
  });
}

export const card = (params, callback = () => {}) => {

  params.count = setCardsParams().count;
  params.width = setCardsParams().width;
  console.log(params.array.length);
  setCards(params);

  // window.addEventListener('resize', () => {
  //   console.log(params.array.length);
  //   // document.getElementById('root').innerHTML = "";
  //   // params.count = setCardsParams(window.innerWidth);
  //   // setCards(params);
  // });

  if(params.init.userSignedIn) cardHeart();
  callback();
}
