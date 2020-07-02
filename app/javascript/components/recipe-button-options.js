export const optionsButton = (location) => {
  const optionsButton = document.querySelector('#recipe-button-options');
  let open = `<span class="material-icons md-18">expand_less</span>`;
  let closed = `<span class="material-icons md-18">expand_more</span>`;
  let openText = '';
  let closedText = '';

  console.log(location.currentLang);
  switch (location.currentLang) {
    case 'fr':
      openText = `Moins d'options`;
      closedText = `Plus d'options`;
      break;
    case 'en':
      openText = `Less options`;
      closedText = `More options`;
      break;
    case 'es':
      openText = `Menos opciones`;
      closedText = `Mas opciones`;
      break;
    default:
      openText = `Moins d'options`;
      closedText = `Plus d'options`;
  }

  optionsButton.addEventListener('click', (event) => {
    const collapse = event.currentTarget.getAttribute('aria-expanded') === 'true'
    if (collapse) {
      event.currentTarget.innerHTML = closed + closedText;
    } else {
      event.currentTarget.innerHTML = open + openText;
    }
  });
}
