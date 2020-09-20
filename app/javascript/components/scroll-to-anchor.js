import { currentLocation } from "../components/location";
// import { viewReplies } from "../components/reply";

const scrollToAnchor = (anchor) => {
  if (anchor) {
    // @ https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo
    const btnTarget = document.querySelector(`a[href="${anchor}"]`);
    // console.log(btnTarget);
    btnTarget.addEventListener('click', (event) => {
      event.preventDefault();
      let target = event.currentTarget.getAttribute("href");
      // console.log(`target: ${target}`);
      // @ https://stackoverflow.com/questions/442404/retrieve-the-position-x-y-of-an-html-element
      let element = document.querySelector(target);
      // let rect = element.getBoundingClientRect();
      // console.log(rect.top, rect.right, rect.bottom, rect.left);
      let navbarHeight = document.querySelector('#navbar-main').offsetHeight;
      // console.log(`navbarHeight ${navbarHeight}`);
      // navbarHeight = 56;
      const scrollOptions = {
        top: element.offsetTop - parseInt(navbarHeight),
        left: 0,
        behavior: 'smooth'
      };
      window.scrollTo(scrollOptions);
    });
  }
  else {
    const returnPositionData = currentLocation();
    const currentLang = returnPositionData.currentLang;
    const currentController = returnPositionData.currentController;
    const currentPage = returnPositionData.currentPage;

    if(/(.+)(#.+)/.test(currentPage)) {
      const anchorTarget = currentPage.match(/(.+)(#.+)/);
      const target = anchorTarget[2];
      let element = document.querySelector(target);
      if(/reply/.test(target)) {
        // console.log(element.dataset.comment);
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
}

export { scrollToAnchor };
