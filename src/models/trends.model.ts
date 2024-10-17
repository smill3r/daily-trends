import mongoose, { Document, Schema } from "mongoose";
import { Trend } from "../types/interfaces/trend";

export interface ITrend extends Document, Trend {}

const trendSchema: Schema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  subtitle: { type: String, required: false },
  authorName: { type: String, required: false },
  authorUrl: { type: String, required: false },
  publishedDate: { type: String, required: true },
  imageUrl: { type: String, required: false },
  imageCaption: { type: String, required: false },
  imageAuthor: { type: String, required: false },
  body: { type: String, required: true },
  source: { type: String, required: true },
});

const Trend = mongoose.model<ITrend>("Trend", trendSchema);

export default Trend;
