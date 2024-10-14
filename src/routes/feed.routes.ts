import { FeedController } from "../controllers/feed.controller";
import Router from "../server/router";
import { Route } from "../types/interfaces/route";

export class FeedRoutes implements Route {
  private feedController: FeedController;
  constructor() {
    this.feedController = new FeedController();
  }

  public initializeRoutes(router: Router) {
    router.post("/trend", (req, res) =>
      this.feedController.generateFeed(req, res)
    );
  }
}
