import Express from "express";
import TagService from "../services/TagService";
import { ResponseHelper } from "./ResponseHelper";
const router = Express.Router();

router.get("/", async (req, resp) => {
    // console.log("req", req);
    // console.log("articleId", req.param, req.query);
    const result = await TagService.getTag();
    // 这里与其他返回的判断逻辑不一样，如果是数组就返回即可
    if (Array.isArray(result)) {
        ResponseHelper.sendError(result, resp);
    }else {
        ResponseHelper.sendData(result, resp);
    }
});
router.post("/addCount", async (req, resp) => {
    // console.log("req", req);
    // console.log("articleId", req.param, req.query);
    const result = await TagService.addCount(req.body);
    // 这里与其他返回的判断逻辑不一样，如果是数组就返回即可
    if (Array.isArray(result)) {
        ResponseHelper.sendError(result, resp);
    }else {
        ResponseHelper.sendData(result, resp);
    }
});

router.post("/", async (req, resp) => {
    // console.log("req", req);
    // console.log("articleId", req.param, req.query);
    const result = await TagService.addTag(req.body);
    // console.log("请求体：" , req.body)
    // ResponseHelper.sendData(req.body, resp);
    // 这里与其他返回的判断逻辑不一样，如果是数组就返回即可
    if (Array.isArray(result)) {
        ResponseHelper.sendError(result, resp);
    }else {
        ResponseHelper.sendData(result, resp);
    }
});

router.delete("/:id", async (req, resp) => {
    // console.log("id:", req.params.id)
    const bool = await TagService.removeTag(req.params.id);
    if (!bool) {
        ResponseHelper.sendError("删除失败，此标签仍有文章引用", resp);
        return;
    }
    ResponseHelper.sendData(true, resp);
});

export default router;
