import axios from "axios";
import iconv from "iconv-lite";
import { JSDOM } from "jsdom";
import { HeaderParams, ScrapParams } from "../../interfaces/scrapper";

/**
 * This class can be extended to provide scrapping functionalites,
 * it takes a generic type to act as a factory of scrapped articles
 */
export abstract class Scrapper<T> {
  protected url: string;
  protected limit: number;
  private source: string;

  constructor(url: string, limit: number, source: string) {
    this.url = url;
    this.limit = limit;
    this.source = source;
    this.setInterceptors();
  }

  /**
   * Method that requests trend scrapping
   * @returns promise with array of articles
   */
  public abstract getTrends(): Promise<T[]>;
  /**
   * Method that specifies the scrapping configuration
   */
  protected abstract setupConfig(): void;

  /**
   * This method takes the scrapping configuration, makes http requests
   * to retrieve the html documents and then passes the retrieved information
   * to an object with the specified configuration
   * @param headerParams specify the urls for the article and article links
   * @param props configuration for the article elements to scrap
   * @returns promise that returns a list of scrapped articles
   */
  protected async scrape(
    headerParams: HeaderParams,
    props: ScrapParams<T>[]
  ): Promise<T[]> {
    const { data } = await axios.get(this.url, {
      responseType: "arraybuffer",
    });

    const dom = new JSDOM(data);
    const { document } = dom.window;
    const articles = document.querySelectorAll(headerParams.articleSelector);

    // We use padding since sometimes the cover articles are videos or other formats difficult to present in a list of trends
    const padding = 3;

    const shortenedList =
      articles.length > this.limit
        ? Array.from(articles).slice(0, this.limit + padding)
        : articles;

    const scrappedTrends: T[] = [];

    for (const article of shortenedList) {
      const articleLink = article.querySelector(
        headerParams.urlSelector
      ) as HTMLAnchorElement;

      if (articleLink !== null) {
        const trendUrl = articleLink.href;
        const articleData = await this.getTrendDetail(trendUrl, props);
        scrappedTrends.push(articleData);
      }
    }

    // Make the final cut to fit the specified trends limit
    return scrappedTrends.length > this.limit
      ? scrappedTrends.slice(0, this.limit - 1)
      : scrappedTrends;
  }

  /**
   * This method will scrap for each article element specified in the configuration
   * @param trendUrl url for the trend to scrap
   * @param props configuration for the article elements to scrap
   * @returns promise that resolves the article data
   */
  private async getTrendDetail(
    trendUrl: string,
    props: ScrapParams<T>[]
  ): Promise<T> {
    const { data } = await axios.get(trendUrl, {
      responseType: "arraybuffer",
    });

    const dom = new JSDOM(data);
    const { document } = dom.window;
    const scrappedDetails: { [key: string]: string } = {};

    for (const { selector, key, attribute, multiple } of props) {
      // Get 1 element or many elements from the DOM according to the configuration
      const element = multiple
        ? document.querySelectorAll(selector)
        : document.querySelector(selector);

      if (element instanceof dom.window.NodeList) {
        scrappedDetails[key as string] = Array.from(element)
          .map(this.trimTextContent)
          .join("\n");
      } else if (element) {
        scrappedDetails[key as string] = attribute
          ? element.getAttribute(attribute) || ""
          : this.trimTextContent(element);
      } else {
        scrappedDetails[key as string] = "";
      }
    }

    scrappedDetails["url"] = trendUrl;
    scrappedDetails["source"] = this.source;

    return scrappedDetails as T;
  }

  private trimTextContent(el: Element): string {
    return el?.textContent?.replace(/(<([^>]+)>)/gi, "").trim() || "";
  }

  /**
   * We need to set encoding interceptors for websites that use different encondings than UTF-8
   */
  private setInterceptors(): void {
    axios.interceptors.response.use((response) => {
      const ctype = response.headers["content-type"];
      // Interceptor for ElMundo charset
      if (ctype.includes("charset=iso-8859-15")) {
        response.data = iconv.decode(response.data, "iso-8859-15");
      }
      return response;
    });
  }
}
