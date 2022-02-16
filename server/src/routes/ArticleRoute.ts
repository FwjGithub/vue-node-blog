import Express from "express";
import ArticleService from "../services/ArticleService";
import { ResponseHelper } from "./ResponseHelper";
const router = Express.Router();

router.post("/", async (req, resp) => {
    // console.log("req", req);
    // console.log("req.body", req.body);
    const result = await ArticleService.add(req.body);
    if (Array.isArray(result)) {
        ResponseHelper.sendError(result, resp);
    } else {
        ResponseHelper.sendData(result, resp);
    }
});
router.get("/:id", async (req, resp) => {
    // console.log("id是", req);

    try {
        // console.log("id是", req.params.id);
        const articleid = req.params.id;
        const article = await ArticleService.findById(articleid);
        // 响应：服务器的接口的响应格式，往往是一种标准格式
        ResponseHelper.sendData(article, resp);
    } catch {
        ResponseHelper.sendData(null, resp);
    }
});
router.delete("/:id", async (req, resp) => {
    console.log("id:", req.params.id)
    await ArticleService.remove(req.params.id);
    ResponseHelper.sendData(true, resp);
});
router.get("/", async (req, resp) => {
    // console.log(req.query)
    const result = await ArticleService.findByPage(req.query as any);
    if (result !== null){
        ResponseHelper.sendPageData(result, resp);
    }else{
        ResponseHelper.sendError("找不到对应文章", resp);
    }
});
router.put("/:id", async (req, resp) => {
    // 客户端通过body传一个json对象，用作修改这个文章
    const result = await ArticleService.edit(req.params.id, req.body);

    ResponseHelper.sendData(result, resp);
});
export default router;
