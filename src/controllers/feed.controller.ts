import { IncomingMessage, ServerResponse } from "http";
import { FeedService } from "../services/feed.service";
import { BaseController } from "./base-controller";

export class FeedController extends BaseController {
  private feedService: FeedService;
  constructor() {
    super();
    this.feedService = new FeedService();
  }

  public async generateFeed(req: IncomingMessage, res: ServerResponse) {
    try {
      const articles = await this.feedService.scrapTrends();

      if (articles) {
        res.statusCode = 202;
        res.end(JSON.stringify({ trends: articles }));
      }
    } catch (err: unknown) {
      this.handleError(err, res);
    }
  }

  public async getFeed(req: IncomingMessage, res: ServerResponse) {
    try {
      const feed = await this.feedService.getFeed();

      if (feed) {
        res.statusCode = 200;
        res.end(JSON.stringify({ feed: feed }));
      }
    } catch (err: unknown) {
      this.handleError(err, res);
    }
  }

  public async deleteFeed(req: IncomingMessage, res: ServerResponse) {
    const id = req?.params?.id;

    if (!id) {
      res.statusCode = 404;
      res.end(JSON.stringify({ error: "Could not receive the feed id" }));
    }

    try {
      const deletedTrend = this.feedService.deleteFeed(id!);
      if (!deletedTrend) {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: "Feed not found" }));
      } else {
        res.statusCode = 200;
        res.end(JSON.stringify({ message: "Feed deleted" }));
      }
    } catch (err: unknown) {
      this.handleError(err, res);
    }
  }
}
