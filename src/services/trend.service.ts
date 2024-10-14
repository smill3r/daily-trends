import { INITIAL_NEWS } from "../config/db.config";
import Trend, { ITrend } from "../models/trends.model";
export class TrendService {
  public async getTrends() {
    return Trend.find().limit(INITIAL_NEWS);
  }

  public async createTrend(trend: ITrend) {
    const newTrend = new Trend(trend);
    return newTrend.save();
  }

  public async updateTrend(trend: ITrend, id: string) {
    return Trend.findByIdAndUpdate(id, trend, {
      new: true,
    });
  }

  public async deleteTrend(id: string) {
    return Trend.findByIdAndDelete(id);
  }
}
