const returnPosition = () => {
  let data = window.location.href.match(/https?:\/(?<domain>\/\w+.+:\d+|\/\w+.\w+.\w+)(?<lang>\/en|\/es|\/fr)?(?<controller>\/\w+)?(?<page>\/.+)?/);
  console.log(data.groups.domain);
  let currentLang = data.groups.lang || null;
  if(currentLang != null) currentLang = currentLang.replace('/','');
  let currentController = data.groups.controller || null;
  if(currentController != null) currentController = currentController.replace('/','');
  let currentPage = data.groups.page || null;
  if(currentPage != null) currentPage = currentPage.replace('/','');
  return [currentLang, currentController, currentPage]
}

export { returnPosition };
