import { returnPosition } from "../components/return-position";
// import { viewReplies } from "../components/reply";

const smoothToAnchor = () => {
  const returnPositionData = returnPosition();
  const currentLang = returnPositionData.currentLang;
  const currentController = returnPositionData.currentController;
  const currentPage = returnPositionData.currentPage;

  if(/(.+)(#.+)/.test(currentPage)) {
    const anchorTarget = currentPage.match(/(.+)(#.+)/);
    const target = anchorTarget[2];
    let element = document.querySelector(target);
    if(/reply/.test(target)) {
      console.log(element.dataset.comment);
      const replyBtn = document.querySelector(`#comment-${element.dataset.comment}-replies-list-btn`);
      replyBtn.click();
    }
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
