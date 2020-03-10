import "bootstrap";
import { cookiesToObject } from "../components/cookies";
import { scrollToAnchor } from "../components/scroll-to-anchor";
import { smoothToAnchor } from "../components/smooth-to-anchor";
import { returnPosition } from "../components/return-position";
import { previewImageOnFileSelect } from "../components/photo-preview";
import { cardHeart } from "../components/card-heart";
import { flashes } from "../components/flashes";
import { lazyLoad } from "../components/lazy-load";
import { btnClick } from "../components/button";
import { replyForms } from "../components/reply";
import { viewReplies } from "../components/reply";
import { repliesReply } from "../components/reply";
import { alerts } from "../components/alerts";
import { mailchimp } from "../services/mailchimp";
import { notification } from "../services/notification";

if(document.querySelector('#print')) document.querySelector('#print').addEventListener('click', () => window.print());
if(document.querySelector('.notice') != null) flashes();
$('[data-toggle="tooltip"]').tooltip();

previewImageOnFileSelect();

const userSignedIn = document.querySelector('body').dataset.user === 'true';

const returnPositionData = returnPosition();
let currentLang = returnPositionData.currentLang;
let currentController = returnPositionData.currentController;
let currentPage = returnPositionData.currentPage;

const cookies = cookiesToObject(document.cookie);

const navbarBrand = document.querySelector(".navbar-brand");
if(window.innerWidth <= 768) {
  navbarBrand.style.padding = "5px 0";
}

if (currentController === 'tools') {
  alerts();
}

if (currentController === 'admin' && userSignedIn) {
  const navItemActive = (id) => {
    const item = document.querySelector(`#${id}`);
    item.classList.add('active');
  }
  switch(currentPage) {
    case 'users':
      navItemActive('users');
      break;
    case 'recipes':
      navItemActive('recipes');
      break;
    case 'comments':
      navItemActive('comments');
      break;
    case 'spam':
      navItemActive('spam');
      break;
    default:
      navItemActive('dashboard');
  }
}

if (currentController === null && !userSignedIn) {
  scrollToAnchor("#recipes-cards");
}

if(currentController != null && currentController === 'settings' && userSignedIn) {
  const userId = parseInt(document.querySelector('body').dataset.userId);
  let init = {
    user_id: userId,
    user_email: cookies.user_email,
    user_token: cookies.user_token
  }
  init.url = '/api/v1/mailchimp';
  mailchimp(init);
  init.url = '/api/v1/notification';
  notification(init);
}

if (currentController === null || currentController.match(/recipes|bookmarks|users/) && document.querySelector('.card')) {
  const init = {
    url: '/api/v1/recipes',
    userSignedIn: userSignedIn,
    currentController: currentController,
    currentPage: currentPage,
    user_email: cookies.user_email,
    user_token: cookies.user_token,
    locale: cookies.locale,
  };
  lazyLoad(init);
}

if(currentController === 'recipes' && currentPage != null) {

  window.onhashchange = () => smoothToAnchor();
  window.onload = () => smoothToAnchor();

  viewReplies();

  if(userSignedIn) {
    btnClick();
    replyForms();
    repliesReply();
  }
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

  const shareBtn = document.querySelector('#share-btn');
  if(shareBtn) {
    let url = document.location.href;
    const canonicalElement = document.querySelector('link[rel=canonical]');
    if (canonicalElement !== null) {
        url = canonicalElement.href;
    }
    const shareData = {
      // title: 'MDN',
      // text: 'Learn web development on MDN!',
      url: url,
    }

    // Must be triggered some kind of "user activation"
    shareBtn.addEventListener('click', async () => {
      try {
        await navigator.share(shareData)
      } catch(err) {
        console.log('Error: ' + e);
      }
      console.log('MDN shared successfully');
    });
  }
}
