import ArticleModel from "./ArticleSchema";
import UserModel from "./UserSchema";
import CommentModel from "./CommentSchema";
import Mongoose from "mongoose";

Mongoose.connect("mongodb://localhost:27017/blogdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("连接数据库成功"));

export { ArticleModel, UserModel, CommentModel };
