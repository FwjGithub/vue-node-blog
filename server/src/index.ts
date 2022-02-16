import "reflect-metadata";
import Express from "express";
import ArticleRoute from "./routes/ArticleRoute";
import bodyParser from "body-parser";
import UploadRoute from "./routes/UploadRoute";
const app = Express();

/**
 * 处理请求接收不到body的问题  a
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/admin/article", ArticleRoute);

app.use("/admin/upload", UploadRoute);

app.listen(8888, () => {
    console.log("监听端口8888");
});
