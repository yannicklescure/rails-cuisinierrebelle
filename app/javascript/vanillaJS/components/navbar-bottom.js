import { cookiesToObject } from "../components/cookies";
import { scrollToTop } from "../util";

export const navbarBottom = (location) => {

  let lastScrollTop = 0;
  let isScrolling;

  // element should be replaced with the actual target element on which you have applied scroll, use window in case of no target element.
  // window.addEventListener("scroll", () => { // or window.addEventListener("scroll"....
  //   let st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
  //   if (st > lastScrollTop){
  //     document.querySelector('#navbar-bottom').style.visibility = 'collapse';
  //   } else {
  //   }
  //   lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling

  //   // Clear our timeout throughout the scroll
  //   window.clearTimeout( isScrolling );

  //   // Set a timeout to run after scrolling ends
  //   isScrolling = setTimeout(() => {

  //     // Run the callback
  //     console.log( 'Scrolling has stopped.' );
  //     document.querySelector('#navbar-bottom').style.visibility = 'visible';

  //   }, 250);
  // }, false);

  let id = '';
  // const elementId = getElementId();
  let el = '';
  // console.log(location.currentController);
  switch (location.currentController) {
    case null:
      id = 'home';
      el = document.querySelector('#home');
      // el.classList.add('text-dark');
      break;
    case 'top100':
      id = 'whatshot';
      el = document.querySelector('#whatshot');
      // el.classList.add('text-dark');
      break;
    case 'r':
      if (location.currentPage === 'new') {
        id = 'new-recipe';
        el = document.querySelector('#new-recipe');
        // el.classList.add('text-dark');
      }
      break;
    case 'u':
      if (location.currentPage.match(/.*\/bookmarks/)) {
        id = 'bookmarks';
        el = document.querySelector('#bookmarks');
        // el.classList.add('text-dark');
      } else {
        id = 'user';
        el = document.querySelector('#user');
        // el.classList.add('border-dark');
      }
      break;
    default:
      // console.log(`Sorry, we couldn't find ${location.currentController}.`);
      // el = getElementId();
      if (document.cookie.split(';').some((item) => item.trim().startsWith('navbarBottomBtn='))) {
        // console.log('The cookie "navbarBottomBtn" exists (ES6)')
        const cookieValue = document.cookie
          .split('; ')
          .find(row => row.startsWith('navbarBottomBtn'))
          .split('=')[1];
        // console.log(cookieValue);
        id = cookieValue;
        el = document.querySelector(`#${cookieValue}`);
      }
  }
  if (el) {
    scrollToTop(el);
  }
  // document.querySelectorAll('.navbar-bottom-btn').forEach( button => {
  //   button.classList.add('text-muted');
  // });
}
