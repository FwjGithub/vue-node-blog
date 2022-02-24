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

export default router;
