import Router from "../../server/router";

export interface Route {
  initializeRoutes(router: Router): void;
}
