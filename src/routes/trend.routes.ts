import { TrendController } from "../controllers/trend.controller";
import Router from "../server/router";
import { Route } from "../types/interfaces/route";

export class TrendRoutes implements Route {
  private trendController: TrendController;
  constructor() {
    this.trendController = new TrendController();
  }

  public initializeRoutes(router: Router): void {
    router.get("/trend", (req, res) =>
      this.trendController.getTrends(req, res)
    );
    router.post("/trend", (req, res) =>
      this.trendController.createTrend(req, res)
    );
    router.put("/trend/:id", (req, res) =>
      this.trendController.updateTrend(req, res)
    );
    router.delete("/trend/:id", (req, res) =>
      this.trendController.deleteTrend(req, res)
    );
  }
}
