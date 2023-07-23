import { PrimeIcons } from "primereact/api";
import { Module } from "../../../app_utils/constants/Module";
import { UserSessionUtils } from "../../utils/UserSessionUtils";
import { arrayContains } from "../../utils/Utils";
import Login from "../../../pages/Login";
import { NormalUserRoutes } from "./NormalUserRoutes";
import { HOME_ROUTE_PATH, LOGIN_ROUTE_PATH } from "./PageRoutes";
import Landing from "../../../pages/Landing";
import Dashboard from "../../../pages/Dashboard";
export class MainFrontendRoutes {
  /**
   * Start of module section handler attributes
   */
  settingsModuleSelected = false;
  crmCoreModuleSelected = false;
  documentRepositoryModuleSelected = false;
  userDetails: any = {};
  appHistory: any = null;

  constructor(selectedModuleName: string) {
    this.settingsModuleSelected = selectedModuleName === Module.BACK_OFFICE.toString();
    this.crmCoreModuleSelected = selectedModuleName === Module.CRM_CORE.toString();
    this.documentRepositoryModuleSelected = selectedModuleName === Module.DOCUMENT_REPOSITORY.toString();
    this.userDetails = UserSessionUtils.getUserDetails();
  }

  /**
   * This checks whether a user can view the landing page. It checks whether a user has a specific
   * module or set of permissions that are allowed to view the landing page
   * @returns boolean
   */
  userCanViewLandingPage() {
    return true;
  }

  /**
   * From here we populate menu item for the selected module
   */
  getMainNavigationMenu() {
    return new NormalUserRoutes(this.userDetails).getNavigationMenu();
  }

  /**
   *
   * @returns
   */
  getMainUnAuthenticatedNavigationMenu() {
    return [{ label: "Login", icon: PrimeIcons.SIGN_IN, to: LOGIN_ROUTE_PATH }];
  }

  /**
   *
   * @returns
   */
  getAuthenticatedComponentRouters() {
    return new NormalUserRoutes(this.userDetails).getAuthenticatedComponetRouters();
  }

  /**
   *
   * @returns
   */
  getUnAuthenticatedComponetRouters() {
    return [{ path: HOME_ROUTE_PATH, label: "Dashboard", component: Dashboard, exact: true }];
  }

  /**
   *
   * @returns
   */
  getAuthenticatedRoutes() {
    return [
      { path: LOGIN_ROUTE_PATH, label: "Login", component: Login, exact: true },
      { path: HOME_ROUTE_PATH, label: "Login", component: Dashboard, exact: true },
    ];
  }
}
