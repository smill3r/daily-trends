import { IncomingMessage, ServerResponse } from "http";
import { ITrend } from "../models/trends.model";
import { TrendService } from "../services/trend.service";
import { BaseController } from "./base-controller";

export class TrendController extends BaseController {
  private trendService: TrendService;
  constructor() {
    super();
    this.trendService = new TrendService();
  }

  public async getTrends(req: IncomingMessage, res: ServerResponse) {
    try {
      const trends = await this.trendService.getTrends();
      res.statusCode = 200;
      res.end(JSON.stringify({ trends: trends }));
    } catch (err: unknown) {
      this.handleError(err, res);
    }
  }

  public async createTrend(req: IncomingMessage, res: ServerResponse) {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      const trendData: ITrend = JSON.parse(body);
      try {
        const newTrend = await this.trendService.addTrend(trendData);
        res.statusCode = 201;
        res.end(JSON.stringify({ message: "Trend created", data: newTrend }));
      } catch (err: unknown) {
        this.handleError(err, res);
      }
    });
  }

  public async updateTrend(req: IncomingMessage, res: ServerResponse) {
    const id = req?.params?.id;

    if (!id) {
      res.statusCode = 404;
      res.end(JSON.stringify({ error: "Could not receive the trend id" }));
    }

    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      const trendData: ITrend = JSON.parse(body);

      try {
        const updatedTrend = await this.trendService.updateTrend(
          trendData,
          id!
        );
        if (!updatedTrend) {
          res.statusCode = 404;
          res.end(JSON.stringify({ error: "Trend not found" }));
        } else {
          res.statusCode = 200;
          res.end(
            JSON.stringify({ message: "Trend updated", data: updatedTrend })
          );
        }
      } catch (err: unknown) {
        this.handleError(err, res);
      }
    });
  }

  public async deleteTrend(req: IncomingMessage, res: ServerResponse) {
    const id = req?.params?.id;

    if (!id) {
      res.statusCode = 404;
      res.end(JSON.stringify({ error: "Error receiving the trend id" }));
    }

    try {
      const deletedTrend = this.trendService.deleteTrend(id!);
      if (!deletedTrend) {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: "Trend not found" }));
      } else {
        res.statusCode = 200;
        res.end(JSON.stringify({ message: "Trend deleted" }));
      }
    } catch (err: unknown) {
      this.handleError(err, res);
    }
  }
}
