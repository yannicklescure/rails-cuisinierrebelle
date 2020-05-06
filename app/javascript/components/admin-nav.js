const menuOpener = (menuOpenData) => {
  const adminNavItems = document.querySelectorAll('.admin-nav-item');
  let adminNavBtnIcon = document.querySelector('#admin-nav-btn-icon');
  adminNavItems.forEach(adminNavItem => {
    if(menuOpenData.state) {
      adminNavItem.classList.remove('d-none');
      adminNavBtnIcon.innerHTML = `<i class="material-icons md-18 mb-1">keyboard_arrow_left</i>`;
    }
    else {
      adminNavItem.classList.add('d-none');
      adminNavBtnIcon.innerHTML = `<i class="material-icons md-18 mb-1">keyboard_arrow_right</i>`;    }
  });
}

const adminNavItemLink = (menuOpenData) => {
  let adminNavBtn = document.querySelector('#admin-nav');
  adminNavBtn.href = `${adminNavBtn.href.split('?')[0]}?menu=${!menuOpenData.state}${menuOpenData.params}`;
  let adminNavItemLinks = document.querySelectorAll('.admin-nav-item-link');
  adminNavItemLinks.forEach(adminNavItemLink => {
    adminNavItemLink.href = `${adminNavItemLink.href.split('?')[0]}?menu=${menuOpenData.state}${menuOpenData.params}`;
  });
  const pagination = document.querySelector('.pagination');
  if (pagination) {
    let adminNavPaginationLinks = Array.from(pagination.getElementsByTagName('a'));
    if(adminNavPaginationLinks) {
      adminNavPaginationLinks.forEach(adminNavPaginationLink => {
        const str = adminNavPaginationLink.href.split('?menu=');
        const strParams = str[1].match(/.*&.*/) ? `&${str[1].split('&')[1]}` : '';
        adminNavPaginationLink.href = `${str[0]}?menu=${menuOpenData.state}${strParams}`;
      });
    }
  }
}

const menuOpenStatus = () => {
  let locationHref = window.location.href.match(/https?:\/(?<domain>\/\w+.+:\d+|\/\w+.\w+.\w+)(?<lang>\/en|\/es|\/fr)?(?<controller>\/\w+)?(?<page>\/.+)?/);
  let state = true;
  let url = locationHref.input;
  let params = '';
  if (url.match(/\?/)) {
    const data = url.split('?')[1];
    params = data.split('&');
    state = params.filter( e => e.match(/menu=.*/) )[0].split('menu=')[1] == 'true';
    url = url.split('?')[0];
    params = params.filter( e => !e.match(/menu=.*/) ).join('&');
    params = params.length > 0 ? `&${params}` : params;
  }
  return {
    state: state,
    url: url,
    params: params
  };
}

export const adminNav = () => {
  const adminNav = document.querySelector('#admin-nav');
  const menuOpenData = menuOpenStatus();
  adminNavItemLink(menuOpenData);
  menuOpener(menuOpenData);

  adminNav.addEventListener('click', (event) => {
    // let menuOpen = event.currentTarget.dataset.menuOpen == "true";
    event.preventDefault();
    const menuOpenData = menuOpenStatus();
    menuOpenData.state = !menuOpenData.state;
    menuOpener(menuOpenData);
    adminNavItemLink(menuOpenData);
    event.currentTarget.dataset.menuOpen = menuOpenData.state;
    window.history.replaceState("object or string", "Title", `${menuOpenData.url}?menu=${menuOpenData.state}${menuOpenData.params}`);
  });
}
