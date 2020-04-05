const menuOpener = (menuOpen) => {
  const adminNavItems = document.querySelectorAll('.admin-nav-item');
  let adminNavBtnIcon = document.querySelector('#admin-nav-btn-icon');
  adminNavItems.forEach(adminNavItem => {
    if(!menuOpen) {
      adminNavItem.classList.add('d-none');
      adminNavBtnIcon.innerHTML = `<svg class="bi bi-chevron-right" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 01.708 0l6 6a.5.5 0 010 .708l-6 6a.5.5 0 01-.708-.708L10.293 8 4.646 2.354a.5.5 0 010-.708z" clip-rule="evenodd"/>
        </svg>`;
    }
    else {
      adminNavItem.classList.remove('d-none');
      adminNavBtnIcon.innerHTML = `<svg class="bi bi-chevron-left" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 010 .708L5.707 8l5.647 5.646a.5.5 0 01-.708.708l-6-6a.5.5 0 010-.708l6-6a.5.5 0 01.708 0z" clip-rule="evenodd"/>
        </svg>`;
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
