import Feed from "../models/feed.model";
import Trend, { ITrend } from "../models/trends.model";
import CustomError from "../types/classes/error-handlers/custom-error";
export class TrendService {
  public async getTrends() {
    return Trend.find();
  }

  public async addTrend(trend: ITrend) {
    const newTrend = new Trend(trend);
    const feed = await this.getFeed();
    if (!feed) {
      throw new CustomError(
        "FEED_NOT_FOUND",
        "Could not find the specified feed to add a trend"
      );
    }

    feed.trends.push(newTrend.id);
    await feed.save();
    return newTrend.save();
  }

  public async updateTrend(trend: ITrend, id: string) {
    return Trend.findByIdAndUpdate(id, trend, {
      new: true,
    });
  }

  public async deleteTrend(id: string) {
    const feed = await this.getFeed();
    if (!feed) {
      throw new CustomError(
        "FEED_NOT_FOUND",
        "Could not find feed to remove the trend from it"
      );
    }
    await Trend.findByIdAndDelete(id);
    feed.trends = feed.trends.filter((t) => t !== id);
    return feed?.save();
  }

  private async getFeed() {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);
    const feed = Feed.findOne({
      date: {
        $gt: startOfToday,
        $lt: endOfToday,
      },
    }).populate("trends");

    return feed;
  }
}
