import mongoose, { Document, Schema } from "mongoose";
import { ITrend } from "./trends.model";

export interface IFeed extends Document {
  title: string;
  date: Date;
  news: ITrend[];
}

const feedSchema: Schema = new Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  news: [{ type: Schema.Types.ObjectId, ref: "News" }],
});

const Feed = mongoose.model<IFeed>("Feed", feedSchema);

export default Feed;
