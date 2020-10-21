const navItemActive = (id) => {
  const item = document.querySelector(`#${id}`);
  item.classList.add('active');
}

export const adminNavItem = (currentPage) => {
  if(!currentPage) currentPage = `dashboard`;
  navItemActive(currentPage);
}
