import mongoose, { Document, Schema } from "mongoose";

export interface IFeed extends Document {
  title: string;
  date: Date;
  trends: string[];
}

const feedSchema: Schema = new Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true, default: Date.now },
  trends: [{ type: Schema.Types.ObjectId, ref: "Trend" }],
});

const Feed = mongoose.model<IFeed>("Feed", feedSchema);

export default Feed;
