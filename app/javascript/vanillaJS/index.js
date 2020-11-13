// Rails.start()

// require("@fortawesome/fontawesome-free/js/all")
// require("@fortawesome/fontawesome-free/svgs/faUtensils")
// import { faUtensils } from "@fortawesome/free-solid-svg-icons";

// import { cardHeart } from "../components/card-heart";

// import { fetchRecipes } from "../util";
// import { setInit } from "../util";

// import { flashes } from "../components/flashes";

const initLoader = async () => {

  // document.addEventListener('change', async () => {
    const notice = document.querySelector('.notice');
    if(notice != null) {
      const { flashes } = await import("../vanillaJS/components/flashes");
      flashes();
      $('[data-toggle="tooltip"]').tooltip();
    }
  // });

//   const WebFont = require('webfontloader');

//   WebFont.load({
//     google: {
//       families: ['Roboto', 'Material Icons']
//     },
//     timeout: 2000 // Set the timeout to two seconds
//   });
}

const initApp = async () => {
  const navbarBrandButton = document.querySelector('.navbar-brand');
  if (navbarBrandButton) {
    const { scrollToTop } = await import("../vanillaJS/util");
    scrollToTop(navbarBrandButton);
  }
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

  const { currentLocation } = await import("../vanillaJS/components/location");
  const result = await currentLocation();
  // new Promise( resolve => currentLocation(), error => console.log(error))
  if (result) {
    console.log(result);
    let currentLang = result.currentLang;
    let currentController = result.currentController;
    let currentPage = result.currentPage;
    const device = document.querySelector('body').dataset.device;
    const userSignedIn = document.querySelector('body').dataset.user === 'true';

    if (!currentController && !currentPage && !userSignedIn) {
      const { scrollToAnchor } = await import("../vanillaJS/components/scroll-to-anchor");
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
      const { shareButton } = await import("../vanillaJS/components/share-button");
      shareButton();
      console.log(userSignedIn)
      if (userSignedIn) {
        const { navbarBottom } = await import("../vanillaJS/components/navbar-bottom");
        navbarBottom(result);
      }
    }

    const { googleAdsNoNavbar } = await import("../vanillaJS/components/google-ads");
    googleAdsNoNavbar();

    const root = document.querySelector('#root');
    // (async () => {
      if (!currentController && !currentPage) {
        const { home } = await import("../vanillaJS/pages/home");
        home();
      }
      if (currentPage && currentPage.match(/edit\..*/)) {
        const { btnClick } = await import("../vanillaJS/components/button");
        btnClick();
      }
      if (currentController && currentController === 'r') {
        const { recipe } = await import("../vanillaJS/pages/recipe");
        recipe(result);
      }
      if (currentController === 'u' && currentPage != null) {
        const { userBanner } = await import("../vanillaJS/components/user-banner");
        userBanner();
      }
      if (currentPage && currentPage.match(/\/settings/) && userSignedIn) {
        const { settings } = await import("../vanillaJS/pages/settings");
        settings();
      }
      if (currentController === 'tools') {
        const { alerts } = await import("../vanillaJS/components/alerts");
        alerts();
      }
      if (currentController === 'top100') {
        const { top100 } = await import("../vanillaJS/pages/top100");
        top100();
      }
      if (currentController === 'conversion') {
        const { conversion } = await import("../vanillaJS/pages/conversion");
        conversion();
      }
      if (currentController === 'admin' && userSignedIn) {
        const { admin } = await import("../vanillaJS/pages/admin");
        admin(result);
      }
      if (root) {
        const { recipes } = await import("../vanillaJS/pages/recipes");
        recipes(result);
      }
    // })();

    const { searchInput } = await import("../vanillaJS/components/search-input");
    searchInput({
      location: result,
      device: device
    });
  }
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
