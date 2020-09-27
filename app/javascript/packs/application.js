//
// This is optional (in case you have `I18n is not defined` error)
// If you want to put this line, you must put it BEFORE `i18n/translations`
//= require i18n
// Some people even need to add the extension to make it work, see https://github.com/fnando/i18n-js/issues/283
//= require i18n.js
//
// This is a must
//= require i18n/translations

require("@rails/ujs").start()
// require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")

require('data-confirm-modal')

jQuery.htmlPrefilter = function( html ) {
  return html;
};

import "bootstrap";
// import "../stylesheets/application"

// require("@fortawesome/fontawesome-free/js/all")
// require("@fortawesome/fontawesome-free/svgs/faUtensils")
// import { faUtensils } from "@fortawesome/free-solid-svg-icons";

import { alerts } from "../components/alerts";
import { btnClick } from "../components/button";
import { cardHeart } from "../components/card-heart";
import { currentLocation } from "../components/location";
import { flashes } from "../components/flashes";
import { googleAdsNoNavbar } from "../components/google-ads";
import { navbarBottom } from "../components/navbar-bottom";
import { scrollToAnchor } from "../components/scroll-to-anchor";
import { searchInput } from "../components/search-input";
import { shareButton } from "../components/share-button";
import { userBanner } from "../components/user-banner"

import { admin } from "../pages/admin";
import { conversion } from "../pages/conversion";
import { home } from "../pages/home";
import { recipe } from "../pages/recipe";
import { recipes } from "../pages/recipes";
import { settings } from "../pages/settings";
import { top100 } from "../pages/top100";

import { fetchRecipes } from "../util";
import { scrollToTop } from "../util";
import { setInit } from "../util";


const initLoader = () => {
  if ((/localhost/).test(document.domain)) document.domain = "localhost";
  else console.log = function() {}

  if ((/.*cuisinierrebelle\.com/).test(document.domain)) {
    document.domain = "cuisinierrebelle.com";
  }
  console.log(document.domain)

  if(document.querySelector('.notice') != null) flashes();
  $('[data-toggle="tooltip"]').tooltip();
//   const WebFont = require('webfontloader');

//   WebFont.load({
//     google: {
//       families: ['Roboto', 'Material Icons']
//     },
//     timeout: 2000 // Set the timeout to two seconds
//   });
}

const initApp = () => {
  const navbarBrandButton = document.querySelector('.navbar-brand');
  if (navbarBrandButton) scrollToTop(navbarBrandButton);
  // document.querySelector('#navbar-main').classList.remove('d-none');
  const credit = document.querySelector('#credit')
  if (credit) credit.classList.remove('d-none');
  // const navbarHeight = parseInt(document.querySelector('#navbar-main').clientHeight);
  // document.querySelector('body').style.paddingTop = `${navbarHeight}px`;
  // const banner = document.querySelector('.banner');
  // if (banner) banner.style.minHeight = `calc(100vh - ${navbarHeight}px)`;

  // const navbarBrand = document.querySelector(".navbar-brand");
  // if(window.innerWidth <= 768) {
  //   navbarBrand.style.padding = "5px 0";
  // }

  Promise.resolve(currentLocation())
  // new Promise( resolve => currentLocation(), error => console.log(error))
  .then(location => {
    console.log(location);
    let currentLang = location.currentLang;
    let currentController = location.currentController;
    let currentPage = location.currentPage;
    const device = document.querySelector('body').dataset.device;
    const userSignedIn = document.querySelector('body').dataset.user === 'true';

    if (!currentController && !currentPage && !userSignedIn) {
      scrollToAnchor("#recipes-cards");
      const bannerCtaBoxTitle = document.querySelector('#banner-cta-box-title');
      if (bannerCtaBoxTitle && window.innerWidth > 375) {
        bannerCtaBoxTitle.classList.remove('h2');
        bannerCtaBoxTitle.classList.add('h1');
      }
    }

    // console.log(device);
    if (device != 'desktop') {
      // document.querySelector('body').style.paddingTop = '105px';
      shareButton();
      console.log(userSignedIn)
      if (userSignedIn) navbarBottom(location);
    }
    googleAdsNoNavbar();
    if (currentPage && currentPage.match(/edit\..*/)) btnClick();
    if (!currentController && !currentPage) home();
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
  });
}

window.addEventListener('scroll', () => {
  const position = window.scrollY;
  // console.log(position);
  const navbar = document.querySelector('.navbar');
  if (position > 0) {
    navbar.classList.add('border-bottom');
  }
  else {
    navbar.classList.remove('border-bottom');
  }
})

document.addEventListener('readystatechange', event => {
  if (event.target.readyState === 'interactive') {
    initLoader();
  }
  else if (event.target.readyState === 'complete') {
    initApp();
    const signIn = document.querySelector('#sign-in');
    if (signIn) {
      console.log(signIn);
      signIn.addEventListener('click', ()=> {
        localStorage.removeItem('cuisinier_rebelle');
        // const setUser = (init, result) => {
        //   console.log(result.user);
        //   const data = JSON.parse(localStorage.getItem('cuisinier_rebelle'))
        //   data.user = result.user;
        //   localStorage.setItem('cuisinier_rebelle', JSON.stringify(data));
        // }

        // const init = setInit(location);
        // fetchRecipes(init).then(result => setUser(init, result));
      });
    }
  }
});

// initLoader();
// initApp();



// const logOut = document.querySelector('.log-out');
// if (logOut) {
//   // $('#log-out').confirmModal();
//   logOut.addEventListener('click', (event) => {
//     const el = document.querySelector('.cancel')
//     console.log(el)
//     el.addEventListener('click', (event) => {
//       console.log(event)
//     })
//   });
// }
