import Comment from "../entities/Comment";
import Mongoose from "mongoose";

export interface IComment extends Comment, Mongoose.Document {}

const commentSchema = new Mongoose.Schema<IComment>(
    {
        articleId: String,
        fromId: String,
        fromName: String,
        fromAvatar: String,
        likeNum: Number,
        date: Number,
        content: String,
        reply: Array
    },
    {
        versionKey: false,
    }
);
export default Mongoose.model<IComment>("Comment", commentSchema);
