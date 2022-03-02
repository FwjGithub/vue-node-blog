import Express from "express";
import CommentService from "../services/CommentService";
import { ResponseHelper } from "./ResponseHelper";
const router = Express.Router();

router.get("/:articleId", async (req, resp) => {
    // console.log("req", req);
    // console.log("articleId", req.param, req.query);
    const result = await CommentService.getComment(req.params.articleId);
    // 这里与其他返回的判断逻辑不一样，如果是数组就返回即可
    if (Array.isArray(result)) {
        ResponseHelper.sendError(result, resp);
    }else {
        ResponseHelper.sendData(result, resp);
    }
});

router.post("/add", async (req, resp) => {
    // console.log("req", req);
    // console.log("req.body", req.body);
    const result = await CommentService.addComment(req.body);
    if (Array.isArray(result)) {
        ResponseHelper.sendError(result, resp);
    } else {
        ResponseHelper.sendData(result, resp);
    }
});

router.post("/reply", async (req, resp) => {
    // console.log("req", req);
    // console.log("req.body", req.body);
    const result = await CommentService.replyComment(req.body);
    if (Array.isArray(result)) {
        ResponseHelper.sendError(result, resp);
    } else {
        ResponseHelper.sendData(result, resp);
    }
});
// router.post("/login", async (req, resp) => {
//     // console.log("req", req);
//     // console.log("req.body", req.body);
//     const result = await CommentService.login(req.body);
//     if (Array.isArray(result)) {
//         ResponseHelper.sendError(result, resp);
//     } else {
//         ResponseHelper.sendData(result, resp);
//     }
// });

export default router;
