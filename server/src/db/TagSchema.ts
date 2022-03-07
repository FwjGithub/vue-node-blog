import Tag from "../entities/Tag";
import Mongoose from "mongoose";

export interface ITag extends Tag, Mongoose.Document {}

const tagSchema = new Mongoose.Schema<ITag>(
    {
        text: String,
        count: Number,
        date: Number
    },
    {
        versionKey: false,
    }
);
export default Mongoose.model<ITag>("Tag", tagSchema);
