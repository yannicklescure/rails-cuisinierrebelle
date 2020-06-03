export const top100 = () => {
  const top100Title = document.querySelector('#top-100-title');
  const top100TitleBar = document.querySelector('#top-100-title-bar');
  if (top100TitleBar) {
    const top100TitleBarOffsetTop = top100TitleBar.offsetTop;
    const navbarHeight = parseInt(document.querySelector('#navbar-main').offsetHeight);
    const top100TitleMarginBottom = parseInt(window.getComputedStyle(top100Title).getPropertyValue('margin-bottom').replace('px',''));
    window.addEventListener('scroll', () => {
      if (window.scrollY > top100TitleBarOffsetTop - navbarHeight) {
        top100TitleBar.style.top = `${navbarHeight}px`;
        top100TitleBar.classList.add('fixed-top');
        top100Title.style.paddingBottom = `${top100TitleBar.offsetHeight}px`;
      } else if (window.scrollY < top100TitleBarOffsetTop + navbarHeight) {
        top100TitleBar.style.top = null;
        top100TitleBar.classList.remove('fixed-top');
        top100Title.style.paddingBottom = null;
      }
    });
  }
}
