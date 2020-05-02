export const searchInput = (init) => {

  const location = init.location;
  const device = init.device;

  if(device.match(/smartphone|phablet/)) {
    const navbarMain = document.querySelector('#navbar-main');
    const navbarSearch = document.querySelector('#navbar-search');

    const btnSearch = document.querySelector('#search-btn');
    btnSearch.addEventListener('click', event => {
      navbarSearch.style.height = `${navbarMain.offsetHeight}px`;
      navbarMain.classList.toggle('d-none');
      navbarSearch.classList.toggle('d-none');
      const query = document.querySelector('#search-input');
      query.focus();
      query.value = '';
    });
    const btnSearchBack = document.querySelector('#search-btn-back');
    btnSearchBack.addEventListener('click', event => {
      navbarMain.classList.toggle('d-none');
      navbarSearch.classList.toggle('d-none');
    });

    const shareBtn = document.querySelector('#share-btn');
    if(shareBtn) {
      let url = document.location.href;
      const canonicalElement = document.querySelector('link[rel=canonical]');
      if (canonicalElement !== null) {
          url = canonicalElement.href;
      }
      const shareData = {
        // title: 'MDN',
        // text: 'Learn web development on MDN!',
        url: url,
      }

      // Must be triggered some kind of "user activation"
      shareBtn.addEventListener('click', async () => {
        try {
          await navigator.share(shareData)
        } catch(e) {
          console.log('Error: ' + e);
        }
        console.log('MDN shared successfully');
      });
    }
  } else {
    const searchInput = document.querySelector('#search-input');
    if (location.currentPage === 'index' && location.query) {
      if (location.query.length > 0) {
        searchInput.value = '';
      }
    }
  }
}
