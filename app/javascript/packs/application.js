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
import { scrollToAnchor } from "../components/scroll-to-anchor";
import { currentLocation } from "../components/location";
import { previewImageOnFileSelect } from "../components/photo-preview";
import { cardHeart } from "../components/card-heart";
import { flashes } from "../components/flashes";
import { btnClick } from "../components/button";
import { alerts } from "../components/alerts";
import { userBanner } from "../components/user-banner"
import { googleAdsNoNavbar } from "../components/google-ads";
import { searchInput } from "../components/search-input";

import { settings } from "../pages/settings";
import { recipe } from "../pages/recipe";
import { recipes } from "../pages/recipes";
import { top100 } from "../pages/top100";
import { admin } from "../pages/admin";

if(document.querySelector('.notice') != null) flashes();
$('[data-toggle="tooltip"]').tooltip();

window.addEventListener('DOMContentLoaded', (event) => {
  previewImageOnFileSelect();
  googleAdsNoNavbar();
});

const userSignedIn = document.querySelector('body').dataset.user === 'true';

const location = currentLocation();
// console.log(location);
let currentLang = location.currentLang;
let currentController = location.currentController;
let currentPage = location.currentPage;
const device = document.querySelector('body').dataset.device;

if (currentPage && currentPage.match(/edit\..*/)) btnClick();
if (currentController && currentController === 'r') recipe();
if (currentController === 'u' && currentPage != null) userBanner();
if (currentPage && currentPage.match(/\/settings/) && userSignedIn) settings();
if (currentController === 'top100') top100();
if (currentController === 'tools') alerts();
if (currentController === 'admin' && userSignedIn) admin(location);

const root = document.querySelector('#root');
if (root) recipes(root, location);

searchInput({
  location: location,
  device: device
});

const navbarBrand = document.querySelector(".navbar-brand");
if(window.innerWidth <= 768) {
  navbarBrand.style.padding = "5px 0";
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
