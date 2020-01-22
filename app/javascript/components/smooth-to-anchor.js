import { returnPosition } from "../components/return-position";

const smoothToAnchor = () => {
  const returnPositionData = returnPosition();
  const currentLang = returnPositionData.currentLang;
  const currentController = returnPositionData.currentController;
  const currentPage = returnPositionData.currentPage;

  if(/(.+)(#.+)/.test(currentPage)) {
    const anchorTarget = currentPage.match(/(.+)(#.+)/);
    const target = anchorTarget[2];
    let element = document.querySelector(target);
    let navbarHeight = document.querySelector('#navbar-main').offsetHeight;
    // navbarHeight = 59;
    const scrollOptions = {
      top: element.offsetTop - parseInt(navbarHeight),
      left: 0,
      behavior: 'smooth'
    };
    window.scrollTo(scrollOptions);
    window.history.pushState("object or string", "Title", `/${currentController}/${anchorTarget[1]}`);
  }
}

export { smoothToAnchor };
