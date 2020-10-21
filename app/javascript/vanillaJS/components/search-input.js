export const searchInput = (init) => {

  const location = init.location;
  const device = init.device;

  // if(device.match(/smartphone|phablet/)) {
  //   const navbarMain = document.querySelector('#navbar-main');
  //   const navbarSearch = document.querySelector('#navbar-search');

  //   const btnSearch = document.querySelector('#search-btn');
  //   if (btnSearch) {
  //     btnSearch.addEventListener('click', event => {
  //       navbarSearch.style.height = `${navbarMain.offsetHeight}px`;
  //       navbarMain.classList.toggle('d-none');
  //       navbarSearch.classList.toggle('d-none');
  //       const query = document.querySelector('#search-input');
  //       query.focus();
  //       query.value = '';
  //     });
  //     const btnSearchBack = document.querySelector('#search-btn-back');
  //     btnSearchBack.addEventListener('click', event => {
  //       navbarMain.classList.toggle('d-none');
  //       navbarSearch.classList.toggle('d-none');
  //     });
  //   }
  // } else {
  //   const searchInput = document.querySelector('#search-input');
  //   if (location.currentPage === 'index' && location.query) {
  //     if (location.query.length > 0) {
  //       searchInput.value = '';
  //     }
  //   }
  // }
  const searchInput = document.querySelector('#search-input');
  if (location.currentPage === 'index' && location.query) {
    if (location.query.length > 0) {
      searchInput.value = '';
    }
  }
}
