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

const fetchUserLocale = () => {

  const cookies = cookiesToObject(document.cookie);

  const init = {
    url: `/api/v1/user`,
    userSignedIn: document.querySelector('body').dataset.user === 'true',
    // currentController: location.currentController,
    // currentPage: location.currentPage,
    // locale: location.currentLang,
    user_email: cookies.user_email,
    user_token: cookies.user_token,
    device: document.querySelector('body').dataset.device
  };

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
  return fetchUserData(init, options).then(data => data.user.auth.locale);
}

export const currentLocation = async (options) => {

  const userSignedIn = document.querySelector('body').dataset.user === 'true';

  let data = window.location.href.match(/(?<domain>https?:\/\/\w+.+:\d+|\/\w+.\w+.\w+)(?<lang>\/en|\/es|\/fr)?(?<query>\/index.+)?(?<controller>\/\w+)?(?<page>\/.+)?/);
  // console.log(data.groups);
  let domain = data.groups.domain;
  let currentLang = data.groups.lang || 'fr';
  if (currentLang) currentLang = currentLang.replace('/','');
  // console.log(currentLang);

  if (userSignedIn) {
    currentLang = await fetchUserLocale()
    // console.log(currentLang);
  }

  let currentController = data.groups.controller || null;
  if (currentController) currentController = currentController.replace('/','');
  let currentPage = data.groups.page || null;
  let query = data.groups.query || null;
  if (currentPage) {
    currentPage = currentPage.replace('/','');
    if (currentPage.match(/.*?.*/)) {
      currentPage = currentPage.split('?')[0];
    }
  } else {
    if(query && query.match(/.*?.*/)) {
      currentPage = query.split('?')[0].replace('/','');
      query = query.split('?query=')[1];
    }
  }

  return {
    domain: domain,
    currentLang: currentLang,
    currentController: currentController,
    currentPage: currentPage,
    query: query
  }
}
