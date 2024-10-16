import { IncomingMessage, ServerResponse } from "http";
import { FeedService } from "../services/feed.service";
import ControllerHandler from "../types/classes/error-handlers/controller-handler";

export class FeedController extends ControllerHandler {
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
      this.catchError(err, res);
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
      this.catchError(err, res);
    }
  }

  public async deleteFeed(req: IncomingMessage, res: ServerResponse) {
    const id = req?.params?.id;

    if (!id) {
      res.statusCode = 404;
      res.end(JSON.stringify({ error: "Error al eliminar el feed" }));
    }

    try {
      const deletedTrend = this.feedService.deleteFeed(id!);
      if (!deletedTrend) {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: "Feed no encontrado" }));
      } else {
        res.statusCode = 200;
        res.end(JSON.stringify({ message: "Feed eliminado" }));
      }
    } catch (err: unknown) {
      this.catchError(err, res);
    }
  }
}
