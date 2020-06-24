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
      let navbar = `<div class="fixed-bottom d-flex border-top justify-content-between align-items-center bg-white py-2 px-2">`;
      navbar += `<a id="home" href="/" class="navbar-bottom text-decoration-none"><span class="material-icons md-32 d-flex px-3">home</span></a>`;
      // navbar += `<div class="d-flex" justify-content-center>`;
      navbar += `<a id="whatshot" href="/top100" class="navbar-bottom text-decoration-none"><span class="material-icons md-32 d-flex px-3">whatshot</span></a>`;
      // navbar += `<a id="notifications" href="" class="navbar-bottom"><span class="material-icons md-32 d-flex px-3">notifications</span></a>`;
      navbar += `<a id="new-recipe" href="/r/new" class="navbar-bottom text-decoration-none"><span class="material-icons md-32 d-flex px-3">add_box</span></a>`;
      navbar += `<a id="bookmarks" href="/u/${data.user.auth.slug}/bookmarks" class="navbar-bottom text-decoration-none"><span class="material-icons md-32 d-flex px-3">bookmarks</span></a>`;
      // navbar += `</div>`;
      navbar += `<a href="/u/${data.user.auth.slug}" class="px-3 text-decoration-none"><img id="user" src="${data.user.auth.image.thumb.url}" width="32" height="32" class="navbar-bottom border rounded-circle"></a>`;
      navbar += `</div>`;
      body.insertAdjacentHTML('afterBegin', navbar);
      // if (!location.currentController && !location.currentPage) {
      //   const homeButton = document.querySelector('#home');
      //   if (homeButton) smoothScroll(homeButton);
      // }
      let el = '';
      switch (location.currentController) {
        case null:
          el = document.querySelector('#home');
          el.classList.add('text-dark');
          break;
        case 'top100':
          el = document.querySelector('#whatshot');
          el.classList.add('text-dark');
          break;
        case 'r':
          if (location.currentPage === 'new') {
            el = document.querySelector('#new-recipe');
            el.classList.add('text-dark');
          }
          break;
        case 'u':
          if (location.currentPage.match(/.*\/bookmarks/)) {
            el = document.querySelector('#bookmarks');
            el.classList.add('text-dark');
          } else {
            el = document.querySelector('#user');
            el.classList.add('border-dark');
          }
          break;
        default:
          console.log(`Sorry, we couldn't find ${location.currentController}.`);
      }
      if (el.classList) {
        // console.log(el.classList.value);
        el.classList.remove('navbar-bottom');
        smoothScroll(el);
      }
      document.querySelectorAll('.navbar-bottom').forEach( button => {
        button.classList.add('text-muted');
      });
    });
  }
}
