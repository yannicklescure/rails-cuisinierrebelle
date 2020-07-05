export const mainbarFixedTop = (init) => {
  const title = document.querySelector(init.title);
  const mainbar = document.querySelector(init.mainbar);
  document.addEventListener('scroll', (event) => {
    // console.log(window.scrollY);
    if (mainbar) {
      const navbarHeight = parseInt(document.querySelector('#navbar-main').offsetHeight);
      // const titleMarginBottom = parseInt(window.getComputedStyle(title).getPropertyValue('margin-bottom').replace('px',''));
      // window.addEventListener('scroll', () => {
        if (window.scrollY > mainbar.offsetTop - navbarHeight) {
          mainbar.classList.add('fixed-top');
          mainbar.style.top = `${navbarHeight}px`;
          title.style.paddingBottom = `${mainbar.clientHeight}px`;
        }

        if (window.scrollY < navbarHeight + mainbar.clientHeight) {
          // console.log(`${window.scrollY} | ${mainbar.offsetTop} | ${navbarHeight}`);
          title.style.paddingBottom = null;
          mainbar.style.top = null;
          mainbar.classList.remove('fixed-top');
        }
      // });
    }
  });
}
