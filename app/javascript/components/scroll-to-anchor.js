const scrollToAnchor = (anchor) => {
  // @ https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo
  const btnTarget = document.querySelector(".home-button");
  console.log(btnTarget);
  btnTarget.addEventListener('click', (event) => {
    event.preventDefault();
    let target = event.currentTarget.getAttribute("href");
    console.log(`target: ${target}`);
    // @ https://stackoverflow.com/questions/442404/retrieve-the-position-x-y-of-an-html-element
    let element = document.querySelector(target);
    let rect = element.getBoundingClientRect();
    console.log(rect.top, rect.right, rect.bottom, rect.left);
    const scrollOptions = {
      top: rect.top,
      left: 0,
      behavior: 'smooth'
    };
    window.scrollTo(scrollOptions);
  });
};

export { scrollToAnchor };
