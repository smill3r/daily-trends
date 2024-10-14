import mongoose, { Document, Schema } from "mongoose";

export interface ITrend extends Document {
    title: string;
    content: string;
    publishedAt: Date;
    imageURL: string;
    source: string;
}

const trendSchema: Schema = new Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    publishedAt: {type: Date, required: true},
    imageUrl: {type: String, default: ''},
    source: {type: String, required: true}
})

const Trends = mongoose.model<ITrend>('Trend', trendSchema);

export default Trends;