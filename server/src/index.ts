import "reflect-metadata";
import Express from "express";
import ArticleRoute from "./routes/ArticleRoute";
import bodyParser from "body-parser";
import UploadRoute from "./routes/UploadRoute";
import UserRoute from "./routes/UserRoute";
import Path from 'path';

const app = Express();
/**
 * 处理请求接收不到body的问题  a
 */

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const staticPath = Path.resolve(__dirname, "../public/pic");
console.log("静态资源路径：", staticPath);
app.use("/pic", Express.static(staticPath));

app.use("/admin/article", ArticleRoute);

app.use("/admin/upload", UploadRoute);

app.use("/api/user", UserRoute);

app.listen(8888, () => {
    console.log("监听端口8888");
});
