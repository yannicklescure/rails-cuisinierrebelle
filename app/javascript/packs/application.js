import "bootstrap";
import { scrollToAnchor } from "../components/scroll-to-anchor";

// console.log(window.innerWidth);
const navbarBrand = document.querySelector(".navbar-brand");
console.log(`navbarBrand ${navbarBrand.href}`);

if(window.innerWidth <= 768) {
  navbarBrand.style.padding = "5px 0";
}

const userSignedIn = document.querySelector('body').dataset.user;
console.log(`userSignedIn? ${userSignedIn}`);

let currentPage = window.location.pathname.split("/")[1] || null;
console.log('currentPage ', currentPage);
let currentAction = window.location.pathname.split("/")[2] || null;
console.log('currentAction ', currentAction);

if(currentPage != null && currentPage.match(/fr|es/)) navbarBrand.href += currentPage;

if(currentPage === "users") document.querySelector('.btn').classList.add('btn-secondary');

if(userSignedIn === "false" && (currentPage === null || currentPage.match(/en|fr|es/))) {
  scrollToAnchor("#recipes-cards");
  const bannerCtaBox = document.querySelector('#banner-cta-box');
  const bannerCtaBoxBtn = document.querySelector('#banner-cta-box-btn');
  bannerCtaBoxBtn.style.width = `${bannerCtaBox.offsetWidth}px`;
}
