import { PrimeIcons } from "primereact/api";
import { BaseFrontendRoutes } from "./BaseFrontendRoutes";
import {
  FUNDRAISINGS_ROUTE_PATH,
  HOME_ROUTE_PATH,
  LANDING_ROUTE_PATH,
  MEMBERS_ROUTE_PATH,
  ORGANISATIONS_ROUTE_PATH,
  PLEDGES_ROUTE_PATH,
  PLEDGE_PAYMENTS_ROUTE_PATH,
  USERS_ROUTE_PATH,
} from "./PageRoutes";
import Dashboard from "../../../pages/Dashboard";
import MembersView from "../../../pages/MembersView";
import UsersView from "../../../pages/UsersView";
import FundraisingCausesView from "../../../pages/FundraisingCausesView";
import PledgesView from "../../../pages/PledgesView";
import PledgePaymentsView from "../../../pages/PledgePaymentsView";
import OrganisationsView from "../../../pages/OrganisationsView";
import Landing from "../../../pages/Landing";
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
    menuItems.push({ label: "Dashboard", icon: PrimeIcons.HOME, to: HOME_ROUTE_PATH, exact: true });
    menuItems.push({ label: "Members", icon: PrimeIcons.USERS, to: MEMBERS_ROUTE_PATH, exact: true });
    menuItems.push({ label: "Pledges", icon: PrimeIcons.MONEY_BILL, to: PLEDGES_ROUTE_PATH, exact: true });
    menuItems.push({ label: "PledgePayments", icon: PrimeIcons.DOLLAR, to: PLEDGE_PAYMENTS_ROUTE_PATH, exact: true });
    menuItems.push({ label: "Fundraisings", icon: PrimeIcons.HEART_FILL, to: FUNDRAISINGS_ROUTE_PATH, exact: true });

    if (this.userDetails.isSuperAdmin === true) {
      menuItems.push({ label: "Users", icon: PrimeIcons.USERS, to: USERS_ROUTE_PATH, exact: true });
      menuItems.push({ label: "Organisations", icon: PrimeIcons.BUILDING, to: ORGANISATIONS_ROUTE_PATH, exact: true });
    }
    navigationMenu.push({ items: menuItems });
    return navigationMenu;
  }

  getAuthenticatedComponetRouters(): any[] {
    let routes = [];
    routes.push({ path: LANDING_ROUTE_PATH, label: "Landing", component: Landing, exact: true });

    routes.push({ path: HOME_ROUTE_PATH, label: "DashBoard", component: Dashboard, exact: true });
    routes.push({ path: MEMBERS_ROUTE_PATH, label: "Members", component: MembersView, exact: true });
    routes.push({ path: PLEDGES_ROUTE_PATH, label: "Pledges", component: PledgesView, exact: true });
    routes.push({ path: FUNDRAISINGS_ROUTE_PATH, label: "Fundraisings", component: FundraisingCausesView, exact: true });
    routes.push({ path: PLEDGE_PAYMENTS_ROUTE_PATH, label: "PledgePayments", component: PledgePaymentsView, exact: true });

    if (this.userDetails.isSuperAdmin === true) {
      routes.push({ path: USERS_ROUTE_PATH, label: "Users", component: UsersView, exact: true });
      routes.push({ path: ORGANISATIONS_ROUTE_PATH, label: "Organisations", component: OrganisationsView, exact: true });
    }
    return routes;
  }
}
