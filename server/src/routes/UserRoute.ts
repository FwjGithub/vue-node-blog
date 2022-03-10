import Express from "express";
import UserService from "../services/UserService";
import { ResponseHelper } from "./ResponseHelper";
const router = Express.Router();

router.post("/register", async (req, resp) => {
    // console.log("req", req);
    // console.log("req.body", req.body);
    const result = await UserService.register(req.body);
    if (Array.isArray(result)) {
        ResponseHelper.sendError(result, resp);
    } else {
        ResponseHelper.sendData(result, resp);
    }
});
router.post("/login", async (req, resp) => {
    // console.log("req", req);
    // console.log("req.body", req.body);
    const result = await UserService.login(req.body);
    if (Array.isArray(result)) {
        ResponseHelper.sendError(result, resp);
    } else {
        ResponseHelper.sendData(result, resp);
    }
});
router.get("/", async (req, resp) => {
    // console.log("req", req);
    // console.log("req.body", req.body);
    const result = await UserService.findByPage(req.query as any);
    if (result !== null){
        ResponseHelper.sendPageData(result, resp);
    }else{
        ResponseHelper.sendError("找不到对应文章", resp);
    }
});

router.delete("/:userId", async (req, resp) => {
    // console.log("userId:", req.params.userId)
    await UserService.remove(req.params.userId);
    ResponseHelper.sendData(true, resp);
});
router.put("/:userId", async (req, resp) => {
    // console.log("req", req);
    // console.log("req.body", req.body);
    const result = await UserService.changeAuth(req.params.userId, req.body);
    if (Array.isArray(result)) {
        ResponseHelper.sendError(result, resp);
    } else {
        ResponseHelper.sendData(result, resp);
    }
});

export default router;
