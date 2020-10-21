import { adminNavItem } from "../components/admin-nav-item";
import { adminNav } from "../components/admin-nav";

export const admin = (location) => {
  adminNavItem(location.currentPage);
  adminNav();
}
