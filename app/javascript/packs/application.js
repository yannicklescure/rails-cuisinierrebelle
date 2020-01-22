import "bootstrap";
import { scrollToAnchor } from "../components/scroll-to-anchor";
import { smoothToAnchor } from "../components/smooth-to-anchor";
import { returnPosition } from "../components/return-position";
import { previewImageOnFileSelect } from "../components/photo-preview";
import { cardHeart } from "../components/card-heart";
import { cors } from "../../../src/plugins/init_cors";

cors();

$('[data-toggle="tooltip"]').tooltip();

previewImageOnFileSelect();

const userSignedIn = document.querySelector('body').dataset.user;
console.log(`userSignedIn? ${userSignedIn}`);

const returnPositionData = returnPosition();
let currentLang = returnPositionData[0];
let currentController = returnPositionData[1];
let currentPage = returnPositionData[2];

console.log('currentLang ', currentLang);
console.log('currentController ', currentController);
console.log('currentPage ', currentPage);

const navbarBrand = document.querySelector(".navbar-brand");
console.log(`navbarBrand ${navbarBrand.href}`);

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
      console.log(`viewReplies JS: ${viewReplies}`);
    });
  });

  const repliesReply = document.querySelectorAll('.reply-reply');
  console.log(repliesReply);
  repliesReply.forEach((reply) => {
    reply.addEventListener('click', event => {
      const replyForm = document.querySelector(`#reply-reply-form-${event.currentTarget.dataset.comment}`);
      replyForm.classList.toggle('d-none');
    });
  });
}

const body = document.querySelector('body');
const device = body.dataset.device;
console.log(device);
// document.querySelector('#device').innerHTML = device;

if(device.match(/smartphone|phablet/)) {
  const btnSearch = document.querySelector('#search-btn');
  btnSearch.addEventListener('click', event => {
    console.log(event.currentTarget);
    document.querySelector('#navbar-main').classList.add('d-none');
    document.querySelector('#navbar-search').classList.remove('d-none');
    const formInput = document.querySelector('#query');
    formInput.value = '';
  });
  const btnSearchBack = document.querySelector('#search-btn-back');
  btnSearchBack.addEventListener('click', event => {
    console.log(event.currentTarget);
    document.querySelector('#navbar-main').classList.remove('d-none');
    document.querySelector('#navbar-search').classList.add('d-none');
  });
}

const url = "https://www.cuisinierrebelle.com/api/v1/recipes";

console.log(url);
fetch(url)
.then(response => response.json())
.then(data => {
  data.forEach((recipe, index) => {
    console.log('recipe', recipe);
  });
})
.catch(ex => {
  console.log('parsing failed', ex);
});
