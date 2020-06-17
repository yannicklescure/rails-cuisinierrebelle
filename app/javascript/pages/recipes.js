import { cookiesToObject } from "../components/cookies";
import { lazyLoad } from "../components/lazy-load";

export const recipes = (root, location) => {
  // if (currentController === null || currentController === 'users' || currentController === 'bookmarks' || (currentController === 'recipes' && currentPage === null)) {
  // console.log(root.dataset.recipes);
  const body = document.querySelector('body');
  const userSignedIn = body.dataset.user === 'true';
  const cookies = cookiesToObject(document.cookie);
  const device = body.dataset.device;

  const init = {
    url: `/api/v1/recipes?cards=${root.dataset.recipes}`,
    userSignedIn: userSignedIn,
    currentController: location.currentController,
    currentPage: location.currentPage,
    user_email: cookies.user_email,
    user_token: cookies.user_token,
    locale: location.currentLang,
    device: device
  };
  if (location.query) {
    // console.log(location.query);
    init.url = `/api/v1/recipes?query=${location.query}`;
  }
  lazyLoad(init);

  if (userSignedIn && device === 'desktop') {
    const newRecipeButtonHTML = `<style>
    #new-recipe-btn {
      position: fixed;
      bottom: 60px;
      right: 30px;
      z-index: 999;
    }

    .new-recipe-btn {
      border: none;
      // border-radius: 50%;
      cursor: pointer;
      font-size: 1em;
      // padding: .4em .7em;
      transition: .3s;
      background-color: #dc3544;
    }

    .new-recipe-btn:hover {
      background-color: #cd5c5c;
    }
    </style>
    <a href="https://www.cuisinierrebelle.com/r/new" id="new-recipe-btn" class="new-recipe-btn d-print-none rounded-pill text-decoration-none d-flex align-items-center text-white px-3 py-2"></a>`;
    document.querySelector('body').insertAdjacentHTML('afterBegin', newRecipeButtonHTML);
    // console.log(document.querySelector('#new-recipe-btn'));
    const btnIcon = `<span class="material-icons md-18 d-flex" style="padding: 3px;">create</span>`;
    console.log(location.currentLang);
    let btnText;
    switch(location.currentLang) {
      case "en":
        btnText = `<span class="mr-2">New recipe</span>`;
        break;
      case "es":
        btnText = `<span class="mr-2">Nueva receta</span>`;
        break;
      case "fr":
        btnText = `<span class="mr-2">Nouvelle recette</span>`;
        break;
      default:
        btnText = `<span class="mr-2">Nouvelle recette</span>`;
    }
    const newRecipeButton = document.querySelector('#new-recipe-btn');
    newRecipeButton.innerHTML = btnIcon;
    // newRecipeButton.addEventListener('click', (event) => {
    //   event.preventDefault();
    //   console.log('click');
    // });
    newRecipeButton.addEventListener('mouseenter', (event) => {
      event.currentTarget.innerHTML = btnText + btnIcon;
    });
    newRecipeButton.addEventListener('mouseleave', (event) => {
      event.currentTarget.innerHTML = btnIcon;
    });
  }
  // }
}
