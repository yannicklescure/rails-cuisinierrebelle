//
// This is optional (in case you have `I18n is not defined` error)
// If you want to put this line, you must put it BEFORE `i18n/translations`
//= require i18n
// Some people even need to add the extension to make it work, see https://github.com/fnando/i18n-js/issues/283
//= require i18n.js
//
// This is a must
//= require i18n/translations

jQuery.htmlPrefilter = function( html ) {
  return html;
};

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
import { editComment } from "../components/edit-comment";
import { editReply } from "../components/edit-reply";
import { repliesReply } from "../components/reply";
import { alerts } from "../components/alerts";
import { userBanner } from "../components/user-banner";
import { adminNavItem } from "../components/admin-nav-item";
import { adminNav } from "../components/admin-nav";
import { googleAdsNoPrint } from "../components/google-ads";
import { googleAdsNoNavbar } from "../components/google-ads";
import { searchInput } from "../components/search-input";

import { mailchimp } from "../services/mailchimp";
import { notification } from "../services/notification";

if(document.querySelector('#print')) {
  document.querySelector('#print').addEventListener('click', (event) => {
    event.preventDefault();
    googleAdsNoPrint();
    window.print();
  });
}
if(document.querySelector('.notice') != null) flashes();
$('[data-toggle="tooltip"]').tooltip();

document.addEventListener('DOMContentLoaded', (event) => {
  previewImageOnFileSelect();
  googleAdsNoNavbar();
}, false);

const userSignedIn = document.querySelector('body').dataset.user === 'true';

const location = currentLocation();
let currentLang = location.currentLang;
let currentController = location.currentController;
let currentPage = location.currentPage;
const device = document.querySelector('body').dataset.device;
const cookies = cookiesToObject(document.cookie);

searchInput({
  location: location,
  device: device
});

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

if (!currentController && !currentPage) {
  const navbarBrand = document.querySelector('.navbar-brand');
  navbarBrand.addEventListener('click', (event) => {
    if (window.scrollY > 0) {
      event.preventDefault();
      const scrollOptions = {
        top: 0,
        left: 0,
        behavior: 'smooth'
      };
      window.scrollTo(scrollOptions);
    }
  });
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
  // console.log(root.dataset.recipes);
  const init = {
    url: `/api/v1/recipes?cards=${root.dataset.recipes}`,
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
if (currentController && currentController === 'r') {

  window.onhashchange = () => smoothToAnchor();
  window.onload = () => smoothToAnchor();

  viewReplies();

  if(userSignedIn) {
    btnClick();
    replyForms();
    repliesReply();
    editComment();
    editReply();
  }

}

if(currentController === 'u' && currentPage != null) {
  userBanner();
}

const top100Title = document.querySelector('#top-100-title');
const top100TitleBar = document.querySelector('#top-100-title-bar');
if (top100TitleBar) {
  const top100TitleBarOffsetTop = top100TitleBar.offsetTop;
  const navbarHeight = parseInt(document.querySelector('#navbar-main').offsetHeight);
  const top100TitleMarginBottom = parseInt(window.getComputedStyle(top100Title).getPropertyValue('margin-bottom').replace('px',''));
  window.addEventListener('scroll', () => {
    if (window.scrollY > top100TitleBarOffsetTop - navbarHeight) {
      top100TitleBar.style.top = `${navbarHeight}px`;
      top100TitleBar.classList.add('fixed-top');
      top100Title.style.paddingBottom = `${top100TitleBar.offsetHeight}px`;
    } else if (window.scrollY < top100TitleBarOffsetTop + navbarHeight) {
      top100TitleBar.style.top = null;
      top100TitleBar.classList.remove('fixed-top');
      top100Title.style.paddingBottom = null;
    }
  });
}
