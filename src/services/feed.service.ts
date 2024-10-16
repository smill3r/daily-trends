import Feed from "../models/feed.model";
import Trend from "../models/trends.model";
import ElMundoScrapper from "../types/classes/scrappers/el-mundo-scrapper";
import ElPaisScrapper from "../types/classes/scrappers/el-pais-scrapper";

export class FeedService {
  public async scrapTrends() {
    const feed = await this.getFeed();

    if (feed.length) {
      console.log("Feed already exists");
      return [];
    }

    const elpais = new ElPaisScrapper();

    const elPaisTrends = await elpais.getTrends();

    const elmundo = new ElMundoScrapper();
    const elMundoTrends = await elmundo.getTrends();

    const trendsArray = await Trend.insertMany([
      ...elPaisTrends,
      ...elMundoTrends,
    ]);

    const trendIds = trendsArray.map((trend) => trend._id);

    const today = new Date();

    const newFeed = new Feed({
      title: "Feed de " + today,
      date: today,
      trends: trendIds,
    });

    return newFeed.save();
  }

  public async getFeed() {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);
    return Feed.find({
      date: {
        $gt: startOfToday,
        $lt: endOfToday,
      },
    }).populate("trends");
  }

  public async deleteFeed(id: string) {
    const feed = await Feed.findById(id).populate("trends");

    if (!feed) {
      return;
    }

    await Trend.deleteMany({ _id: { $in: feed.trends } });

    return Feed.findByIdAndDelete(id);
  }
}
