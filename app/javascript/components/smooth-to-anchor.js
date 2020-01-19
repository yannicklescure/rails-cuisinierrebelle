import { returnPosition } from "../components/return-position";

const smoothToAnchor = () => {
  const returnPositionData = returnPosition();
  let currentLang = returnPositionData[0];
  let currentController = returnPositionData[1];
  let currentPage = returnPositionData[2];

  console.log('currentLang ', currentLang);
  console.log('currentController ', currentController);
  console.log('currentPage ', currentPage);
  console.log(/(.+)(#.+)/.test(currentPage));
  if(/(.+)(#.+)/.test(currentPage)) {
    const anchorTarget = currentPage.match(/(.+)(#.+)/);
    console.log(anchorTarget[2]);
    const target = anchorTarget[2];
    let element = document.querySelector(target);
    console.log(element.offsetTop);
    let navbarHeight = document.querySelector('.navbar').offsetHeight;
    console.log(`navbarHeight ${navbarHeight}`);
    navbarHeight = 59;
    const scrollOptions = {
      top: element.offsetTop - navbarHeight,
      left: 0,
      behavior: 'smooth'
    };
    window.scrollTo(scrollOptions);
    window.history.pushState("object or string", "Title", `/${currentController}/${anchorTarget[1]}`);
  }
}

export { smoothToAnchor };
