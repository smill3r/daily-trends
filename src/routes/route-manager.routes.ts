import Router from "../server/router";
import { Route } from "../types/interfaces/route";
import { FeedRoutes } from "./feed.routes";
import { TrendRoutes } from "./trend.routes";

export class RoutesManager {
  private registeredRoutes: Array<Route> = [];

  constructor() {
    this.setRoutes();
  }

  private setRoutes() {
    const trendRoutes = new TrendRoutes();
    this.registeredRoutes.push(trendRoutes);

    const feedRoutes = new FeedRoutes();
    this.registeredRoutes.push(feedRoutes);
  }

  public initializeRoutes(router: Router) {
    this.registeredRoutes.forEach((route) => route.initializeRoutes(router));
  }
}
