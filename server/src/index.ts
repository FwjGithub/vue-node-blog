import "reflect-metadata";
import Express from "express";
import ArticleRoute from "./routes/ArticleRoute";
import bodyParser from "body-parser";
import UploadRoute from "./routes/UploadRoute";
import UserRoute from "./routes/UserRoute";
import CommentRoute from "./routes/CommentRoute";
import Path from 'path';

const app = Express();
/**
 * 处理请求接收不到body的问题  a
 */

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const staticPath = Path.resolve(__dirname, "../public/pic");
console.log("静态资源路径：", staticPath);
//请求静态资源
app.use("/pic", Express.static(staticPath));

// 关于文章模块的请求
app.use("/admin/article", ArticleRoute);

// 上传图片
app.use("/admin/upload", UploadRoute);

// 用户模块
app.use("/api/user", UserRoute);

// 评论模块
app.use("/api/comment", CommentRoute)

app.listen(8888, () => {
    console.log("监听端口8888");
});
