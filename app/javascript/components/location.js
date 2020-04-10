export const currentLocation = (options) => {
  let data = window.location.href.match(/https?:\/(?<domain>\/\w+.+:\d+|\/\w+.\w+.\w+)(?<lang>\/en|\/es|\/fr)?(?<query>\/index.+)?(?<controller>\/\w+)?(?<page>\/.+)?/);
  // console.log(data.groups);
  let currentLang = data.groups.lang || 'en';
  if (currentLang) currentLang = currentLang.replace('/','');
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
    currentLang: currentLang,
    currentController: currentController,
    currentPage: currentPage,
    query: query
  }
}
