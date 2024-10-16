/**
 * Interface that is passed to the Scrapper class in order to specify the shape of the object to be 
 * created when creating the scrapped articles
 */
export interface Trend {
  url: string;
  title: string;
  subtitle: string;
  authorName: string;
  authorUrl: string;
  publishedDate: string;
  imageUrl: string;
  imageCaption: string;
  imageAuthor: string;
  body: string;
  source: string;
}
