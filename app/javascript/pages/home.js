const smoothScroll = (button) => {
  button.addEventListener('click', (event) => {
    if (window.scrollY > 0) {
      event.preventDefault();
      const scrollOptions = {
        top: 0,
        left: 0,
        behavior: 'smooth'
      };
      window.scrollTo(scrollOptions);
    }
  });
}

export const home = () => {
  const navbarBrandButton = document.querySelector('.navbar-brand');
  if (navbarBrandButton) smoothScroll(navbarBrandButton);
}
