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
require("@fortawesome/fontawesome-free/js/all")

const WebFont = require('webfontloader');

WebFont.load({
  google: {
    families: ['Roboto', 'Material Icons']
  },
  timeout: 2000 // Set the timeout to two seconds
});

import { scrollToAnchor } from "../components/scroll-to-anchor";
import { currentLocation } from "../components/location";
import { cardHeart } from "../components/card-heart";
import { flashes } from "../components/flashes";
import { btnClick } from "../components/button";
import { alerts } from "../components/alerts";
import { userBanner } from "../components/user-banner"
import { googleAdsNoNavbar } from "../components/google-ads";
import { searchInput } from "../components/search-input";
import { shareButton } from "../components/share-button";
import { navbarBottom } from "../components/navbar-bottom";

import { home } from "../pages/home";
import { settings } from "../pages/settings";
import { recipe } from "../pages/recipe";
import { recipes } from "../pages/recipes";
import { top100 } from "../pages/top100";
import { conversion } from "../pages/conversion";
import { admin } from "../pages/admin";

if ((/localhost/).test(document.domain)) document.domain = "localhost";
else console.log = function() {}

if ((/.*laresistancefrancaise\.com/).test(document.domain)) {
  document.domain = "laresistancefrancaise.com";
}
console.log(document.domain)

if(document.querySelector('.notice') != null) flashes();
$('[data-toggle="tooltip"]').tooltip();

document.addEventListener('DOMContentLoaded', (event) => {
  const navbarHeight = parseInt(document.querySelector('#navbar-main').clientHeight);
  // console.log(navbarHeight);
  document.querySelector('body').style.paddingTop = `${navbarHeight}px`;
  const banner = document.querySelector('.banner');
  if (banner) banner.style.minHeight = `calc(100vh - ${navbarHeight}px)`;
}, false);

const userSignedIn = document.querySelector('body').dataset.user === 'true';

Promise.resolve(currentLocation()).then(location => {
  // console.log(location);
  let currentLang = location.currentLang;
  let currentController = location.currentController;
  let currentPage = location.currentPage;
  const device = document.querySelector('body').dataset.device;

    // console.log(device);
    if (device != 'desktop') {
      shareButton();
      navbarBottom(location);
    }
    googleAdsNoNavbar();
    if (!currentController && !currentPage) home();
    if (currentPage && currentPage.match(/edit\..*/)) btnClick();
    if (currentController && currentController === 'r') recipe(location);
    if (currentController === 'u' && currentPage != null) userBanner();
    if (currentPage && currentPage.match(/\/settings/) && userSignedIn) settings();
    if (currentController === 'tools') alerts();
    if (currentController === 'top100') top100();
    if (currentController === 'conversion') conversion();
    if (currentController === 'admin' && userSignedIn) admin(location);

  const root = document.querySelector('#root');
  if (root) recipes(location);

  searchInput({
    location: location,
    device: device
  });

  const navbarBrand = document.querySelector(".navbar-brand");
  if(window.innerWidth <= 768) {
    navbarBrand.style.padding = "5px 0";
  }


  if (!currentController && !currentPage && !userSignedIn) {
    scrollToAnchor("#recipes-cards");
    const bannerCtaBoxTitle = document.querySelector('#banner-cta-box-title');
    if (bannerCtaBoxTitle && window.innerWidth > 375) {
      bannerCtaBoxTitle.classList.remove('h2');
      bannerCtaBoxTitle.classList.add('h1');
    }
  }
});
