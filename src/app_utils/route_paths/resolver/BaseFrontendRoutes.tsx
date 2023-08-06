import { IFrontendRoute } from "./IFrontendRoute";

export class BaseFrontendRoutes implements IFrontendRoute {
  public userDetails: any = {};

  /**
   * This sets up required instance variables
   * @param userDetails
   */
  constructor(userDetails: {}) {
    this.userDetails = userDetails;
  }

  /**
   * Returns items for the main module navigation menu
   * @returns
   */
  getNavigationMenu(): any[] {
    return [];
  }

  /**
   *
   * @returns
   */
  getAuthenticatedComponetRouters(): any[] {
    return [];
  }

  /**
   * Generates full navigation route for the given path
   * @param path
   * @returns
   */
  generatePath(path: string) {
    return () => {
      window.location.hash = path;
    };
  }
}
