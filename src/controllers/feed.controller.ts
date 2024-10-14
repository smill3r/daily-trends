import { ServerResponse } from "http";
import { IncomingMessage } from "http";

export class FeedController {

  generateFeed(req: IncomingMessage, res: ServerResponse) {
    if(req) {
      res.end();
    }
  }
}