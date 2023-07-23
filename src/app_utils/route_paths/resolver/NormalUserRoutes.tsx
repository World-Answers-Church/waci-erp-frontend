import { PrimeIcons } from "primereact/api";
import { BaseFrontendRoutes } from "./BaseFrontendRoutes";
import { HOME_ROUTE_PATH, ROLES_ROUTE_PATH, USERS_ROUTE_PATH } from "./PageRoutes";
import Dashboard from "../../../pages/Dashboard";
import DashboardAnalytics from "../../../pages/DashboardAnalytics";
import MembersView from "../../../pages/MembersView";
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
    navigationMenu.push({
      items: [
        { label: "Dashboard Sales", icon: "pi pi-fw pi-home", to: "/", badge: "4", badgeClassName: "p-badge-info" },
        { label: "Dashboard", icon: PrimeIcons.LIST, to: HOME_ROUTE_PATH, exact: true },
        { label: "Users", icon: PrimeIcons.USERS, to: USERS_ROUTE_PATH, exact: true },
        { label: "Members", icon: PrimeIcons.USERS, to: ROLES_ROUTE_PATH, exact: true },
      ],
    });
    return navigationMenu;
  }

  getAuthenticatedComponetRouters(): any[] {
    return [
      { path: HOME_ROUTE_PATH, label: "Home", component: Dashboard, exact: true },
      { path: USERS_ROUTE_PATH, label: "Users", component: DashboardAnalytics, exact: true },
      { path: ROLES_ROUTE_PATH, label: "Members", component: MembersView, exact: true },
    ];
  }
}
