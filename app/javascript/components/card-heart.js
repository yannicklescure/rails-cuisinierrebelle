const cardHeart = () => {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    const element = document.querySelector(`.fa-heart-${card.dataset.recipe}`);
    // element.classList.remove('d-none');
    element.style.opacity = 0;
    const cardImgTop = document.querySelector(`.card-img-top-${card.dataset.recipe}`);
    let clickCount = 0;
    cardImgTop.addEventListener('click', (event) => {
      clickCount++;
      const timeOut = () => {
        setTimeout(() => {
          clickCount = 0;
        }, 400);
      }
      if (clickCount === 1) {
        timeOut();
      } else if (clickCount === 2) {
        const liked = document.querySelector(`[data-like-recipe="${card.dataset.recipe}"]`);
        liked.click();
        clearTimeout(timeOut);
        clickCount = 0;
      }
    });
  });
}

export { cardHeart };
