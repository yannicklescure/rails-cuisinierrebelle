const menuOpener = (menuOpen) => {
  const adminNavItems = document.querySelectorAll('.admin-nav-item');
  let adminNavBtnIcon = document.querySelector('#admin-nav-btn-icon');
  adminNavItems.forEach(adminNavItem => {
    if(!menuOpen) {
      adminNavItem.classList.add('d-none');
      adminNavBtnIcon.innerHTML = `<i class="material-icons md-18 mb-1">keyboard_arrow_right</i>`;
    }
    else {
      adminNavItem.classList.remove('d-none');
      adminNavBtnIcon.innerHTML = `<i class="material-icons md-18 mb-1">keyboard_arrow_left</i>`;
    }
  });
}

const adminNavItemLink = (menuOpen) => {
  let adminNavBtn = document.querySelector('#admin-nav');
  if (adminNavBtn.href.match(/\?/)) {
    adminNavBtn.href = `${adminNavBtn.href.split('?')[0]}?menu=${!menuOpen}`;
  } else {
    adminNavBtn.href = `${adminNavBtn}?menu=${!menuOpen}`;
  }
  let adminNavItemLinks = document.querySelectorAll('.admin-nav-item-link');
  adminNavItemLinks.forEach(adminNavItemLink => {
    adminNavItemLink.href = `${adminNavItemLink.href.split('?')[0]}?menu=${menuOpen}`;
    // console.log(adminNavItemLink.href);
  });
}

const menuOpenStatus = () => {
  let locationHref = window.location.href.match(/https?:\/(?<domain>\/\w+.+:\d+|\/\w+.\w+.\w+)(?<lang>\/en|\/es|\/fr)?(?<controller>\/\w+)?(?<page>\/.+)?/);
  // console.log(locationHref.input);
  let state = true;
  let url = locationHref.input;
  if (url.match(/\?/)) {
    const data = url.split('?')[1];
    state = data.split('menu=')[1] == 'true';
    url = url.split('?')[0];
  }
  return [state, url];
}

export const adminNav = () => {
  const adminNav = document.querySelector('#admin-nav');
  let menuOpen = menuOpenStatus()[0];
  adminNavItemLink(menuOpen);
  menuOpener(menuOpen);
  adminNav.addEventListener('click', (event) => {
    // let menuOpen = event.currentTarget.dataset.menuOpen == "true";
    event.preventDefault();
    menuOpen = !menuOpenStatus()[0];
    adminNavItemLink(menuOpen);
    menuOpener(menuOpen);
    event.currentTarget.dataset.menuOpen = menuOpen;
    window.history.replaceState("object or string", "Title", `${menuOpenStatus()[1]}?menu=${menuOpen}`);
  });
}
