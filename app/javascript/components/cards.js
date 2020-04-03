import { cardHeart } from "./card-heart";

const capitalize_Words = (str) => {
 return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

export const cards = (params) => {

  const init = params.init;
  const array = params.array;
  let locale = init.locale != 'en' ? `/${init.locale}` : '';

  if(array) {
    array.forEach((recipe, index) => {
      if(index + 1 > params.start && index + 1 <= params.end) {
        let bookmarkPatchAttributes = '';
        let likePatchAttributes = '';
        const heart = `<svg class="bi bi-heart mb-1" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 01.176-.17C12.72-3.042 23.333 4.867 8 15z" clip-rule="evenodd"/>
        </svg>`;
        const heartFill = `<svg class="bi bi-heart-fill mb-1" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" clip-rule="evenodd"/>
          </svg>`;
        const bookmark = `<svg class="bi bi-bookmark mb-1" width="1.1em" height="1.1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M8 12l5 3V3a2 2 0 00-2-2H5a2 2 0 00-2 2v12l5-3zm-4 1.234l4-2.4 4 2.4V3a1 1 0 00-1-1H5a1 1 0 00-1 1v10.234z" clip-rule="evenodd"/>
        </svg>`;
        const bookmarkFill = `<svg class="bi bi-bookmark-fill mb-1" width="1.1em" height="1.1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M3 3a2 2 0 012-2h6a2 2 0 012 2v12l-5-3-5 3V3z" clip-rule="evenodd"/>
        </svg>`;
        const comment = `<svg class="bi bi-chat-square mb-1" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M14 1H2a1 1 0 00-1 1v8a1 1 0 001 1h2.5a2 2 0 011.6.8L8 14.333 9.9 11.8a2 2 0 011.6-.8H14a1 1 0 001-1V2a1 1 0 00-1-1zM2 0a2 2 0 00-2 2v8a2 2 0 002 2h2.5a1 1 0 01.8.4l1.9 2.533a1 1 0 001.6 0l1.9-2.533a1 1 0 01.8-.4H14a2 2 0 002-2V2a2 2 0 00-2-2H2z" clip-rule="evenodd"/>
        </svg>`;
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
          userChecked = `<span data-toggle="tooltip" data-placement="top" title="${verifiedText}" style="font-size: 90%;margin-left: 2px"><svg class="bi bi-check" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" d="M13.854 3.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L6.5 10.293l6.646-6.647a.5.5 0 01.708 0z" clip-rule="evenodd"/></svg></span>`;
        }
        const card = `
          <div class="col-md-4 col-lg-3 col-xl-2">
            <div class="card border-0" data-recipe="${recipe.id}">
              <div class="card-header py-1 px-0 border-0 bg-white rounded">
                <div class="d-flex justify-content-start align-items-center">
                  <a href="${locale}/u/${recipe.user.slug}" class="card-link text-body text-decoration-none" style="font-size: 90%"><img src="${recipe.user.image.thumb.url}" width="24px" height="24px" class="rounded-circle mr-2" style="object-fit: cover;">${capitalize_Words(recipe.user.name)}</a>
                  ${userChecked}
                </div>
              </div>
              <a href="${locale}/r/${recipe.slug}">
                <div class="card-img-top card-img-top-${recipe.id} d-flex justify-content-center align-items-center" style="background-image: url('${recipe.photo.card.url}');">
                  <div class="fa-heart-${recipe.id} d-none text-danger display-3">
                    ${heartFill}
                  </div>
                  <div class="fa-bookmark-${recipe.id} d-none text-body display-3">
                    ${bookmarkFill}
                  </div>
                </div>
              </a>
              <div class="card-body py-2 px-0">
                <div class="d-flex justify-content-between align-items-center">
                  <div class="d-flex align-items-center text-danger">
                    <a class="p-0 text-danger text-decoration-none" ${likePatchAttributes}href="${likeUrl}">
                      ${faHeart}&nbsp;<span class="text-muted font-weight-lighter">${recipe.likes_count}</span>
                    </a>
                  </div>
                  <div class="d-flex align-items-center">
                    <a class="p-0 ml-3 text-body text-decoration-none" href="${locale}/r/${recipe.slug}#comments">${comment}</a>
                    <a class="p-0 ml-3 text-body text-decoration-none" ${bookmarkPatchAttributes}href="${bookmarkUrl}">${faBookmark}</a>
                  </div>
                </div>
                <a href="${locale}/r/${recipe.slug}" class="card-link text-body text-uppercase">${recipe.title}</a>
                <div class="card-text font-weight-lighter" style="font-size: 90%">${recipe.description}</div>
              </div>
            </div>
          </div>
        `;
        const root = document.querySelector('#root');
        root.insertAdjacentHTML('beforeEnd', card);
        // const cardNodeElement = document.querySelector(`[data-recipe*="${recipe.id}"]`);
        // const svgElements = cardNodeElement.querySelectorAll('svg');
        // svgElements.forEach(svgElement => {
        //   svgElement.style.fontSize = '100%';
        // });
      }
    });
    if(init.userSignedIn) cardHeart();
    return true;
  }
}
