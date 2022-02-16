import Article from "../entities/Article";
import Mongoose from "mongoose";

export interface IArticle extends Article, Mongoose.Document {}

const articleSchema = new Mongoose.Schema<IArticle>(
    {
        title: String,
        poster: String,
        content: String,
        html: String,
        tags: [String],
        views: Number,
        cDate: Number,
        uDate: Number
    },
    {
        versionKey: false,
    }
);
export default Mongoose.model<IArticle>("Article", articleSchema);
