import { IncomingMessage, ServerResponse } from "http";

export type RouteHandler = (req: IncomingMessage, res: ServerResponse) => void;

interface RegisteredRoute {
  method: string;
  path: string;
  regex: RegExp;
  handler: RouteHandler;
}

export default class Router {
  private routes: RegisteredRoute[] = [];

  public get(path: string, handler: RouteHandler) {
    this.register("GET", path, handler);
  }

  public post(path: string, handler: RouteHandler) {
    this.register("POST", path, handler);
  }

  public put(path: string, handler: RouteHandler) {
    this.register("PUT", path, handler);
  }

  public delete(path: string, handler: RouteHandler) {
    this.register("DELETE", path, handler);
  }

  private register(method: string, path: string, handler: RouteHandler): void {
    const routeRegex = new RegExp(`^${path.replace(/:\w+/g, "(\\w+)")}$`);
    this.routes.push({ method, path: path, regex: routeRegex, handler });
  }

  public handle = (req: IncomingMessage, res: ServerResponse) => {
    const { method, url } = req;

    for (const route of this.routes) {
      const match = url?.match(route.regex);
      if (match && method === route.method) {
        const paramNames = route.path.match(/:\w+/g) || [];

        const params: Record<string, string> = {};

        paramNames.forEach((name, index) => {
          params[name.substring(1)] = match[index + 1];
        });

        req.params = params;
        return route.handler(req, res);
      }
    }

    res.statusCode = 404;
    res.end("404 Not Found");
  }
}
