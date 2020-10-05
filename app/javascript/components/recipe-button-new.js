import { cookiesToObject } from "../components/cookies";

export const newRecipeButton = (location) => {

  const body = document.querySelector('body');
  const userSignedIn = body.dataset.user === 'true';
  const cookies = cookiesToObject(document.cookie);
  const device = body.dataset.device;

  if (userSignedIn) {

    // const root = document.querySelector('#root');

    // fetchUserData(init, options).then(data => {
      // console.log(data)
      const newRecipeButtonHTML = `<style>
      #new-recipe-btn {
        position: fixed;
        bottom: 32px;
        right: 16px;
        z-index: 999;
      }

      .new-recipe-btn {
        border: none;
        cursor: pointer;
        font-size: 1em;
        background-color: #dc3544;
        transition: all .3s;
      }
      .scaled {
        /* https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/scale */
        transform: scale(1); /* Equal to scaleX(1) scaleY(1) */
        transform-origin: right;
      }
      </style>
      <a href="/r/new" id="new-recipe-btn" class="new-recipe-btn d-print-none rounded-pill text-decoration-none d-flex align-items-center text-white p-2"></a>`;
      document.querySelector('body').insertAdjacentHTML('afterBegin', newRecipeButtonHTML);
      // console.log(document.querySelector('#new-recipe-btn'));
      const btnIcon = `<span id="new-recipe-btn-icon" class="material-icons md-18 d-flex m-1 ml-2">create</span>`;
      // console.log(location.currentLang);
      let btnText = ``;
      // console.log(data.user.auth.locale);
      // switch(data.user.auth.locale) {
      switch(location.currentLang) {
        case "en":
          btnText += `Sahre a recipe`;
          break;
        case "es":
          btnText += `Comparte una receta`;
          break;
        case "fr":
          btnText += `Partager une recette`;
          break;
        default:
          btnText += `Partager une recette`;
      }
      // btnText += `</span>`;
      const newRecipeButton = document.querySelector('#new-recipe-btn');
      newRecipeButton.innerHTML = btnIcon;
      const newRecipeButtonSizeMin = 42 ;// newRecipeButton.offsetWidth;
      // newRecipeButton.innerHTML = btnIcon + btnText;
      newRecipeButton.innerHTML = btnIcon + `<span id="new-recipe-btn-text"></span`;
      const newRecipeButtonSizeMax = newRecipeButton.offsetWidth + 1;
      const newRecipeButtonText = document.querySelector('#new-recipe-btn-text');
      const newRecipeButtonIcon = document.querySelector('#new-recipe-btn-icon');

      const expandText = (text) => {
        text = text.replace(/\s/g, '\u00A0');
        const textArray = text.split('');
        // console.log(textArray);
        if (newRecipeButtonText.innerText === '') {
          textArray.forEach((char, index) => {
            setTimeout(() => {
              newRecipeButtonText.innerText += char;
              // console.log(newRecipeButtonText.innerText);
            }, index * 5);
          })
        }
      }
      newRecipeButtonIcon.classList.add('ml-2');
      newRecipeButtonText.classList.add('mr-2');
      expandText(btnText);

      const shrinkText = () => {
        // text = text.replace(/\s/g, '\u00A0');
        const textArray = newRecipeButtonText.innerText.split('');
        // console.log(textArray);
        let str = '';
        if (textArray.length > 0) {
          textArray.forEach((char, index) => {
            setTimeout(() => {
              str = newRecipeButtonText.innerText;
              newRecipeButtonText.innerText = str.substring(0, str.length - 1);
              // console.log(newRecipeButtonText.innerText);
            }, index * 5);
          })
        }
      }

      const expandBtn = () => {
        Promise.resolve(`${newRecipeButtonSizeMax}px`)
        .then(result => {
          // newRecipeButton.style.width = `${newRecipeButtonSizeMax}px`;
          // newRecipeButtonIcon.classList.add('ml-2');
          // newRecipeButtonText.classList.remove('d-none');
          // newRecipeButtonText.innerText = '';
          newRecipeButtonIcon.classList.add('ml-2');
          // newRecipeButtonText.classList.remove('d-none');
          newRecipeButtonText.classList.add('mr-2');
          expandText(btnText);
        })
      }

      const shrinkBtn = () => {
        // newRecipeButton.style.width = `${newRecipeButtonSizeMin}px`;
        newRecipeButtonIcon.classList.remove('ml-2');
        // newRecipeButtonText.classList.add('d-none');
        newRecipeButtonText.classList.remove('mr-2');
        // newRecipeButtonText.innerText = '';
        shrinkText();
      }

      newRecipeButton.addEventListener('mouseenter', (event) => {
        expandBtn();
      });
      newRecipeButton.addEventListener('mouseleave', (event) => {
        shrinkBtn();
      });

      let lastScrollTop = 0;

      // element should be replaced with the actual target element on which you have applied scroll, use window in case of no target element.
      document.addEventListener("scroll", () => { // or window.addEventListener("scroll"....
        let st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
        if (st > lastScrollTop){
          shrinkBtn();
        } else {
          expandBtn();
        }
        lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
      }, false);
  }
}
