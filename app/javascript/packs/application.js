//
// This is optional (in case you have `I18n is not defined` error)
// If you want to put this line, you must put it BEFORE `i18n/translations`
//= require i18n
// Some people even need to add the extension to make it work, see https://github.com/fnando/i18n-js/issues/283
//= require i18n.js
//
// This is a must
//= require i18n/translations

import "bootstrap";
import { cookiesToObject } from "../components/cookies";
import { scrollToAnchor } from "../components/scroll-to-anchor";
import { smoothToAnchor } from "../components/smooth-to-anchor";
import { currentLocation } from "../components/location";
import { previewImageOnFileSelect } from "../components/photo-preview";
import { cardHeart } from "../components/card-heart";
import { flashes } from "../components/flashes";
import { lazyLoad } from "../components/lazy-load";
import { btnClick } from "../components/button";
import { replyForms } from "../components/reply";
import { viewReplies } from "../components/reply";
import { repliesReply } from "../components/reply";
import { alerts } from "../components/alerts";
import { userBanner } from "../components/user-banner";
import { adminNavItem } from "../components/admin-nav-item";
import { adminNav } from "../components/admin-nav";

import { mailchimp } from "../services/mailchimp";
import { notification } from "../services/notification";

if(document.querySelector('#print')) document.querySelector('#print').addEventListener('click', () => window.print());
if(document.querySelector('.notice') != null) flashes();
$('[data-toggle="tooltip"]').tooltip();

previewImageOnFileSelect();

const userSignedIn = document.querySelector('body').dataset.user === 'true';

const location = currentLocation();
let currentLang = location.currentLang;
let currentController = location.currentController;
let currentPage = location.currentPage;
const device = document.querySelector('body').dataset.device;
const cookies = cookiesToObject(document.cookie);

const navbarBrand = document.querySelector(".navbar-brand");
if(window.innerWidth <= 768) {
  navbarBrand.style.padding = "5px 0";
}

if (currentController === 'tools') {
  alerts();
}

if (currentController === 'admin' && userSignedIn) {
  adminNavItem(currentPage);
  adminNav();
}

if (!currentController && !currentPage && !userSignedIn) {
  scrollToAnchor("#recipes-cards");
  const bannerCtaBoxTitle = document.querySelector('#banner-cta-box-title');
  if (window.innerWidth > 375) {
    bannerCtaBoxTitle.classList.remove('h2');
    bannerCtaBoxTitle.classList.add('h1');
  }
}

if(currentPage && currentPage.match(/\/settings/) && userSignedIn) {
  const userId = parseInt(document.querySelector('body').dataset.userId);
  const initMailchimp = {
    user_id: userId,
    user_email: cookies.user_email,
    user_token: cookies.user_token,
    url: '/api/v1/mailchimp'
  };
  mailchimp(initMailchimp);
  const initNotification = {
    user_id: userId,
    user_email: cookies.user_email,
    user_token: cookies.user_token,
    url: '/api/v1/notification'
  };
  notification(initNotification);
}

const root = document.querySelector('#root');
if (root) {
// if (currentController === null || currentController === 'users' || currentController === 'bookmarks' || (currentController === 'recipes' && currentPage === null)) {
  const init = {
    url: '/api/v1/recipes',
    userSignedIn: userSignedIn,
    currentController: currentController,
    currentPage: currentPage,
    user_email: cookies.user_email,
    user_token: cookies.user_token,
    locale: currentLang,
    device: device
  };
  if (location.query) {
    // console.log(location.query);
    init.url = `/api/v1/recipes?query=${location.query}`;
  }
  lazyLoad(init);
}

if (currentPage && currentPage.match(/edit\..*/)) btnClick();
if (currentController && currentController.match(/r/)) {

  window.onhashchange = () => smoothToAnchor();
  window.onload = () => smoothToAnchor();

  viewReplies();

  if(userSignedIn) {
    btnClick();
    replyForms();
    repliesReply();
  }
}

if(currentController === 'u' && currentPage != null) {
  userBanner();
}

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
      } catch(e) {
        console.log('Error: ' + e);
      }
      console.log('MDN shared successfully');
    });
  }
}
