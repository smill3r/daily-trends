import { Server, createServer } from "http";
import mongoose from "mongoose";
import { MONGO_URI } from "../config/db.config";
import { RouteHandler } from "./router";

export default class AppServer {
  private port: number | string;
  private server: Server;

  constructor(routeHandler: RouteHandler) {
    this.port = process.env.port || 3000;
    this.server = createServer((req, res) => routeHandler(req, res));
  }

  public async startServer() {
    await this.server.listen(this.port);
    console.log(`Server running on http://localhost:${this.port}`);
  }

  public connectToDatabase() {
    const URL = process.env.MONGO_URL || MONGO_URI;
    mongoose
      .connect(URL)
      .then(() => {
        console.log("MongoDB connected successfully");
      })
      .catch((err) => {
        console.error("MongoDB connection error:", err);
      });
  }
}
