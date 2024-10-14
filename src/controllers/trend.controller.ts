import { IncomingMessage, ServerResponse } from "http";
import { ITrend } from "../models/trends.model";
import { TrendService } from "../services/trend.service";

export class TrendController {
  private trendService: TrendService;
  constructor() {
    this.trendService = new TrendService();
  }

  public async getTrends(req: IncomingMessage, res: ServerResponse) {
    try {
      const trends = await this.trendService.getTrends();
      console.log(trends);
      res.statusCode = 200;
      res.end(JSON.stringify(trends));
    } catch {
      res.statusCode = 500;
      res.end(
        JSON.stringify({ error: "Error al obtener los trends: " })
      );
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
        const newTrend = await this.trendService.createTrend(trendData);
        res.statusCode = 201;
        res.end(JSON.stringify({ message: "Trend creado", data: newTrend }));
      } catch {
        res.statusCode = 500;
        res.end(JSON.stringify({ error: "Error al crear el trend" }));
      }
    });
  }

  public async updateTrend(req: IncomingMessage, res: ServerResponse) {
    const id = req?.params?.id;

    if (!id) {
      res.statusCode = 404;
      res.end(JSON.stringify({ error: "Error al actualizar el trend" }));
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
          res.end(JSON.stringify({ error: "Trend no encontrado" }));
        } else {
          res.statusCode = 200;
          res.end(
            JSON.stringify({ message: "Trend actualizado", data: updatedTrend })
          );
        }
      } catch {
        res.statusCode = 500;
        res.end(JSON.stringify({ error: "Error al actualizar el trend" }));
      }
    });
  }

  public async deleteTrend(req: IncomingMessage, res: ServerResponse) {
    const id = req?.params?.id;

    if (!id) {
      res.statusCode = 404;
      res.end(JSON.stringify({ error: "Error al eliminar el trend" }));
    }

    try {
      const deletedTrend = this.trendService.deleteTrend(id!);
      if (!deletedTrend) {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: "Trend no encontrado" }));
      } else {
        res.statusCode = 200;
        res.end(JSON.stringify({ message: "Trend eliminado" }));
      }
    } catch {
      res.statusCode = 500;
      res.end(JSON.stringify({ error: "Error al eliminar el trend" }));
    }
  }
}
