import "bootstrap";
import { scrollToAnchor } from "../components/scroll-to-anchor";
import { smoothToAnchor } from "../components/smooth-to-anchor";
import { returnPosition } from "../components/return-position";
import { previewImageOnFileSelect } from "../components/photo-preview";
import { cardHeart } from "../components/card-heart";
import { flashes } from "../components/flashes";

if(document.querySelector('.notice') != null) flashes();

$('[data-toggle="tooltip"]').tooltip();

previewImageOnFileSelect();

const userSignedIn = document.querySelector('body').dataset.user;
console.log(`userSignedIn? ${userSignedIn}`);

const returnPositionData = returnPosition();
console.log('current ', returnPositionData);
let currentLang = returnPositionData.currentLang;
let currentController = returnPositionData.currentController;
let currentPage = returnPositionData.currentPage;

const navbarBrand = document.querySelector(".navbar-brand");

if(window.innerWidth <= 768) {
  navbarBrand.style.padding = "5px 0";
}

if (currentController === null || currentController.match(/users|bookmarks|index/)) {
  cardHeart();
}

if (currentController === null && userSignedIn === "false") {
  scrollToAnchor("#recipes-cards");
  const bannerCtaBox = document.querySelector('#banner-cta-box');
  const bannerCtaBoxBtn = document.querySelector('#banner-cta-box-btn');
  bannerCtaBoxBtn.style.width = `${bannerCtaBox.offsetWidth}px`;
}

if(currentController === 'recipes' && currentPage != null) {

  window.onhashchange = () => {
    smoothToAnchor();
  }
  window.onload = () => {
    smoothToAnchor();
  }

  const replyForms = document.querySelectorAll('.no-reply');
  replyForms.forEach((replyForm) => {
    replyForm.addEventListener('click', event => {
      const currentForm = document.querySelector(`#reply-form-${event.currentTarget.dataset.comment}`);
      currentForm.classList.toggle('d-none');
    });
  });

  let viewReplies = false;
  const replies = document.querySelectorAll('.reply');
  replies.forEach((reply) => {
    reply.addEventListener('click', event => {
      const repliesList = document.querySelector(`#replies-list-${event.currentTarget.dataset.comment}`);
      repliesList.classList.toggle('d-none');
      viewReplies === false ? viewReplies = true : viewReplies = false;
      const arrowState = document.querySelector(`#replies-list-arrow-${event.currentTarget.dataset.comment}`);
      if(viewReplies) arrowState.innerHTML = `<i class="fas fa-sort-up"></i>`;
      else arrowState.innerHTML = `<i class="fas fa-sort-down"></i>`;
    });
  });

  const repliesReply = document.querySelectorAll('.reply-reply');
  repliesReply.forEach((reply) => {
    reply.addEventListener('click', event => {
      const replyForm = document.querySelector(`#reply-reply-form-${event.currentTarget.dataset.comment}`);
      replyForm.classList.toggle('d-none');
    });
  });
}

const body = document.querySelector('body');
const device = body.dataset.device;

if(device.match(/smartphone|phablet/)) {
  const navbarMain = document.querySelector('#navbar-main');
  const navbarSearch = document.querySelector('#navbar-search');

  const btnSearch = document.querySelector('#search-btn');
  btnSearch.addEventListener('click', event => {
    navbarSearch.style.height = `${navbarMain.offsetHeight}px`;
    navbarMain.classList.toggle('d-none');
    navbarSearch.classList.toggle('d-none');
    const query = document.querySelector('#query');
    query.focus();
    query.value = '';
  });
  const btnSearchBack = document.querySelector('#search-btn-back');
  btnSearchBack.addEventListener('click', event => {
    navbarMain.classList.toggle('d-none');
    navbarSearch.classList.toggle('d-none');
  });
}

// const url = "https://www.cuisinierrebelle.com/api/v1/recipes";
// fetch(url)
// .then(response => response.json())
// .then(data => {
//   data.forEach((recipe, index) => {
//     console.log(`recipe ${recipe.id}`, recipe);
//   });
// })
// .catch(ex => {
//   console.log('parsing failed', ex);
// });
