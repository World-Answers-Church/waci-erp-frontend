import { PrimeIcons } from "primereact/api";
import { BaseFrontendRoutes } from "./BaseFrontendRoutes";
import { HOME_ROUTE_PATH, ROLES_ROUTE_PATH, USERS_ROUTE_PATH } from "./PageRoutes";
import Dashboard from "../../../pages/Dashboard";
import MembersView from "../../../pages/MembersView";
import UsersView from "../../../pages/UsersView";
export class NormalUserRoutes extends BaseFrontendRoutes {
  /**
   * This sets up the back office routes with
   * @param userDetails,history
   */
  constructor(userDetails: {}) {
    super(userDetails);
  }

  getNavigationMenu(): any[] {
    let navigationMenu = [];
    let menuItems = [];
    menuItems.push({ label: "Dashboard", icon: PrimeIcons.LIST, to: HOME_ROUTE_PATH, exact: true });
    menuItems.push({ label: "Members", icon: PrimeIcons.USERS, to: ROLES_ROUTE_PATH, exact: true });
    if (this.userDetails.isSuperAdmin === true) {
      menuItems.push({ label: "Users", icon: PrimeIcons.USERS, to: USERS_ROUTE_PATH, exact: true });
    }
    navigationMenu.push({ items: menuItems });
    return navigationMenu;
  }

  getAuthenticatedComponetRouters(): any[] {
    let routes = [];
    routes.push({ path: HOME_ROUTE_PATH, label: "DashBoard", component: Dashboard, exact: true });
    routes.push({ path: ROLES_ROUTE_PATH, label: "Members", component: MembersView, exact: true });
    if (this.userDetails.isSuperAdmin === true) {
      routes.push({ path: USERS_ROUTE_PATH, label: "Users", component: UsersView, exact: true });
    }
    return routes;
  }
}
