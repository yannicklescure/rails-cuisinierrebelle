export const searchInput = (location) => {
  const searchInput = document.querySelector('#search-input');
  if (location.currentPage === 'index' && location.query) {
    if (location.query.length > 0) {
      searchInput.value = '';
    }
  }
}
