/**
 * Configuration provided to indicate the fields to scrap and how to access that information
 *
 */
export interface ScrapParams<T> {
  /**
   * Indicates the name of the property that will be assigned the scrapped value
   */
  key: keyof T;
  /**
   * A css selector to pass to querySelector in order to get the information
   */
  selector: string;
  /**
   * Specify which attribute to get, we get the text content by default
   */
  attribute?: string;
  /**
   * Specify if we want to retrieve one or many HTML elements
   */
  multiple?: boolean;
}

/**
 * Here we indicate the main selectors for the news site
 */
export interface HeaderParams {
  /**
   * Selector to get all cover articles
   */
  articleSelector: string;
  /**
   * Selector to get the url of each article
   */
  urlSelector: string;
}
