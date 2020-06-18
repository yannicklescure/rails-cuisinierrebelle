import { cookiesToObject } from "../components/cookies";

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

export const navbarBottom = () => {
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
      let navbar = `<div class="fixed-bottom d-flex border-top justify-content-center align-items-center bg-white py-2 px-4">`;
      navbar += `<a href="/" class="text-dark text-decoration-none"><span class="material-icons md-32 d-flex px-3">home</span></a>`;
      navbar += `<a href="/top100" class="text-dark text-decoration-none"><span class="material-icons md-32 d-flex px-3">whatshot</span></a>`;
      // navbar += `<a href="" class="text-dark"><span class="material-icons md-32 d-flex px-3">notifications</span></a>`;
      navbar += `<a href="/r/new" class="text-dark text-decoration-none"><span class="material-icons md-32 d-flex px-3">add_box</span></a>`;
      navbar += `<a href="/u/${data.user.auth.slug}/bookmarks" class="text-dark text-decoration-none"><span class="material-icons md-32 d-flex px-3">bookmarks</span></a>`;
      navbar += `<a href="/u/${data.user.auth.slug}" class="text-dark px-3 text-decoration-none"><img src="${data.user.auth.image.thumb.url}" width="32" height="32" class="border border-dark rounded-circle"></a>`;
      navbar += `</div>`;
      body.insertAdjacentHTML('afterBegin', navbar);
    });
  }
}
