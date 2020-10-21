export const mainbarFixedTop = (init) => {
  const title = document.querySelector(init.title);
  const mainbar = document.querySelector(init.mainbar);
  const content = document.querySelector(init.content);
  let lastScrollTop = 0;
  document.addEventListener('scroll', (event) => {
    const navbarHeight = parseInt(document.querySelector('#navbar-main').offsetHeight);
    // console.log(navbarHeight);
    // console.log(window.scrollY);
    let st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
    if (st > lastScrollTop) {
      // downscroll code
      if (window.scrollY > mainbar.offsetTop - navbarHeight) {
        mainbar.classList.add('fixed-top');
        mainbar.style.top = `${navbarHeight}px`;
        title.style.paddingBottom = `${mainbar.clientHeight}px`;
      }
    } else {
      // upscroll code
      if ( window.scrollY < content.offsetTop - mainbar.clientHeight - navbarHeight) {
        title.style.paddingBottom = null;
        mainbar.style.top = null;
        mainbar.classList.remove('fixed-top');
      }
    }
    lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
  }, false);
}
