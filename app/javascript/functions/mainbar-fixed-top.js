export const mainbarFixedTop = (init) => {
  const title = document.querySelector(init.title);
  const mainbar = document.querySelector(init.mainbar);
  if (mainbar) {
    const mainbarOffsetTop = mainbar.offsetTop;
    const navbarHeight = parseInt(document.querySelector('#navbar-main').offsetHeight);
    console.log(mainbarOffsetTop);
    document.addEventListener('scroll', (event) => {
      // const titleMarginBottom = parseInt(window.getComputedStyle(title).getPropertyValue('margin-bottom').replace('px',''));
      // window.addEventListener('scroll', () => {
        if (window.scrollY > mainbarOffsetTop - navbarHeight) {
          console.log(window.scrollY);
          mainbar.style.top = `${navbarHeight}px`;
          mainbar.classList.add('fixed-top');
          title.style.paddingBottom = `${mainbar.clientHeight}px`;
        } else if (window.scrollY < mainbarOffsetTop) {
          mainbar.style.top = null;
          mainbar.classList.remove('fixed-top');
          title.style.paddingBottom = null;
        }
      // });
    });
  }
}
