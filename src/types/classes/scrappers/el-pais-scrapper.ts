import { ScrapParams } from "../../interfaces/scrapper";
import { Trend } from "../../interfaces/trend";
import { Scrapper } from "./scrapper";

/**
 * This class provides the specific details needed to scrap the news website of ElPais,
 * the selectors needed might change in the future, so they can be updated here without
 * affecting the logic behind the scrapping methods
 */
export default class ElPaisScrapper extends Scrapper<Trend> {
  private scrapeConfig: ScrapParams<Trend>[] = [];

  constructor(url = "https://elpais.com", limit = 5) {
    super(url, limit, "El Pais");
    this.setupConfig();
  }

  public getTrends(): Promise<Trend[]> {
    const articleSelector = "article.c";
    const urlSelector = ".c_h .c_t a";
    return this.scrape({ articleSelector, urlSelector }, this.scrapeConfig);
  }

  protected setupConfig(): void {
    this.scrapeConfig = [
      { key: "title", selector: "h1.a_t" },
      { key: "subtitle", selector: "h2.a_st" },
      { key: "imageUrl", selector: ".a_e_m .a_m .a_m_w img", attribute: "src" },
      {
        key: "imageCaption",
        selector: "figcaption.a_m_p > span:nth-of-type(1)",
      },
      {
        key: "imageAuthor",
        selector: "figcaption.a_m_p > span:nth-of-type(2)",
      },
      { key: "authorName", selector: "a.a_md_a_n" },
      { key: "authorUrl", selector: "a.a_md_a_n", attribute: "href" },
      { key: "publishedDate", selector: ".a_md_f span" },
      { key: "body", selector: "div.a_c > p:not(#les)", multiple: true },
    ];
  }
}
