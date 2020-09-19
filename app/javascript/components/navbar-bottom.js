import { cookiesToObject } from "../components/cookies";

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

const fetchUserData = (init, options) => {
  return fetch(init.url, options)
  .then(response => response.json())
  .then(result => {
    const data = result.data;
    return data;
  })
  .catch(ex => {
    console.log('parsing failed', ex);
  });
}

const getElementId = () => {
  document.querySelectorAll('.navbar-bottom-btn').forEach(element => {
    element.addEventListener('click', (event) => {
      // console.log(event.currentTarget);
      document.cookie = `navbarBottomBtn=;path=/users;SameSite=Strict;`;
      document.cookie = `navbarBottomBtn=${event.currentTarget.getAttribute('id')};path=/users;SameSite=Strict;`;
      // alert(document.cookie);
    });
  });
}

export const navbarBottom = (location) => {
  const body = document.querySelector('body');
  const userSignedIn = body.dataset.user === 'true';
  const cookies = cookiesToObject(document.cookie);
  const device = body.dataset.device;

  const init = {
    url: `/api/v1/user`,
    userSignedIn: userSignedIn,
    // currentController: location.currentController,
    // currentPage: location.currentPage,
    // locale: location.currentLang,
    user_email: cookies.user_email,
    user_token: cookies.user_token,
    device: device
  };

  if (userSignedIn) {

    let options;
    if(init.userSignedIn) {
      options = {
        headers: {
          'X-User-Email': atob(decodeURIComponent(init.user_email)),
          'X-User-Token': atob(decodeURIComponent(init.user_token))
        }
      };
    } else {
      options = {};
    }

    // const root = document.querySelector('#root');


    fetchUserData(init, options).then(data => {
      // console.log(data)
      console.log(data.user)
      let navbar = `<div id="navbar-bottom" class="fixed-bottom d-flex border-top justify-content-between align-items-center bg-white py-2 px-2">`;
      navbar += `<a id="home" href="/" class="navbar-bottom-btn text-decoration-none"><span class="material-icons md-32 d-flex px-3">home</span></a>`;
      // navbar += `<div class="d-flex" justify-content-center>`;
      navbar += `<a id="whatshot" href="/top100" class="navbar-bottom-btn text-decoration-none"><span class="material-icons md-32 d-flex px-3">whatshot</span></a>`;
      // navbar += `<a id="notifications" href="" class="navbar-bottom-btn"><span class="material-icons md-32 d-flex px-3">notifications</span></a>`;
      navbar += `<a id="new-recipe" href="/r/new" class="navbar-bottom-btn text-decoration-none"><span class="material-icons md-32 d-flex px-3">add_box</span></a>`;
      navbar += `<a id="bookmarks" href="/u/${data.user.auth.slug}/bookmarks" class="navbar-bottom-btn text-decoration-none"><span class="material-icons md-32 d-flex px-3">bookmarks</span></a>`;
      // navbar += `</div>`;
      navbar += `<a href="/u/${data.user.auth.slug}" class="px-3 text-decoration-none"><img id="user" src="${data.user.auth.image.thumb.url}" width="32" height="32" class="navbar-bottom-btn border rounded-circle"></a>`;
      navbar += `</div>`;
      // body.insertAdjacentHTML('afterBegin', navbar);
    });
  }

  // if (!location.currentController && !location.currentPage) {
  //   const homeButton = document.querySelector('#home');
  //   if (homeButton) smoothScroll(homeButton);
  // }
  getElementId();
  let id = '';
  // const elementId = getElementId();
  let el = '';
  // console.log(location.currentController);
  switch (location.currentController) {
    case null:
      id = 'home';
      el = document.querySelector('#home');
      // el.classList.add('text-dark');
      break;
    case 'top100':
      id = 'whatshot';
      el = document.querySelector('#whatshot');
      // el.classList.add('text-dark');
      break;
    case 'r':
      if (location.currentPage === 'new') {
        id = 'new-recipe';
        el = document.querySelector('#new-recipe');
        // el.classList.add('text-dark');
      }
      break;
    case 'u':
      if (location.currentPage.match(/.*\/bookmarks/)) {
        id = 'bookmarks';
        el = document.querySelector('#bookmarks');
        // el.classList.add('text-dark');
      } else {
        id = 'user';
        el = document.querySelector('#user');
        // el.classList.add('border-dark');
      }
      break;
    default:
      // console.log(`Sorry, we couldn't find ${location.currentController}.`);
      // el = getElementId();
      if (document.cookie.split(';').some((item) => item.trim().startsWith('navbarBottomBtn='))) {
        // console.log('The cookie "navbarBottomBtn" exists (ES6)')
        const cookieValue = document.cookie
          .split('; ')
          .find(row => row.startsWith('navbarBottomBtn'))
          .split('=')[1];
        // console.log(cookieValue);
        id = cookieValue;
        el = document.querySelector(`#${cookieValue}`);
      }
  }
  if (el) {
    // console.log(el.classList.value);
    // el.classList.remove('navbar-bottom-btn');
    // console.log(id);
    if (id === 'user') {
      el.classList.remove('border-muted');
      el.classList.add('border-dark');
    } else {
      el.classList.remove('text-muted');
      el.classList.add('text-dark');
    }
    smoothScroll(el);
  }
  // document.querySelectorAll('.navbar-bottom-btn').forEach( button => {
  //   button.classList.add('text-muted');
  // });
}
