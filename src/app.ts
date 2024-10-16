import { RoutesManager } from "./routes/route-manager.routes";
import Router from "./server/router";
import AppServer from "./server/server";

// Setup router first
const router = new Router();
const routesManager = new RoutesManager();
routesManager.initializeRoutes(router);

// Init server
const appServer = new AppServer(router.handle);
appServer.startServer();
appServer.connectToDatabase();
