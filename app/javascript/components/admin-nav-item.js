export const adminNavItem = (currentPage) => {
  const navItemActive = (id) => {
    const item = document.querySelector(`#${id}`);
    item.classList.add('active');
  }
  switch(currentPage) {
    case 'users':
      navItemActive('users');
      break;
    case 'recipes':
      navItemActive('recipes');
      break;
    case 'comments':
      navItemActive('comments');
      break;
    case 'spam':
      navItemActive('spam');
      break;
    default:
      navItemActive('dashboard');
  }
}
