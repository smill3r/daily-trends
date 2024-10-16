import { ScrapParams } from "../../interfaces/scrapper";
import { Trend } from "../../interfaces/trend";
import { Scrapper } from "./scrapper";

/**
 * This class provides the specific details needed to scrap the news website of ElMundo,
 * the selectors needed might change in the future, so they can be updated here without
 * affecting the logic behind the scrapping methods
 */
export default class ElMundoScrapper extends Scrapper<Trend> {
  private scrapeConfig: ScrapParams<Trend>[] = [];

  constructor(url = "https://www.elmundo.es", limit = 5) {
    super(url, limit, "El Mundo");
    this.setupConfig();
  }

  public getTrends(): Promise<Trend[]> {
    const articleSelector =
      "article.ue-c-cover-content:not(.ue-c-video-player-frame)";
    const urlSelector = "a.ue-c-cover-content__link";
    return this.scrape({ articleSelector, urlSelector }, this.scrapeConfig);
  }

  protected setupConfig(): void {
    this.scrapeConfig = [
      { key: "title", selector: "h1.ue-c-article__headline" },
      { key: "subtitle", selector: "p.ue-c-article__paragraph" },
      {
        key: "imageUrl",
        selector: "img.ue-c-article__image",
        attribute: "src",
      },
      { key: "imageCaption", selector: "span.ue-c-article__media-description" },
      { key: "imageAuthor", selector: "span.ue-c-article__media-source" },
      { key: "authorName", selector: "div.ue-c-article__author-name-item" },
      {
        key: "authorUrl",
        selector: ".ue-c-article__author-name-item a",
        attribute: "href",
      },
      { key: "publishedDate", selector: "div.ue-c-article__publishdate" },
      {
        key: "body",
        selector: ".ue-c-article__paragraph, .ue-c-article__subheadline",
        multiple: true,
      },
    ];
  }
}
