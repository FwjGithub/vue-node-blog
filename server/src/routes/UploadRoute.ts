import Express, { Router } from "express";
import multer from "multer"; // v1.0.5
import fs from "fs";
import path from "path";
import { ResponseHelper } from "./ResponseHelper";

const upload = multer(); // for parsing multipart/form-data
const router = Express.Router();

router.post(
    "/",
    upload.single("imgfile"),
    async (req, resp): Promise<any> => {
        const imgfile = req.file;
        // console.log(imgfile);
        const imgPath = path.resolve(__dirname, "../../public/pic/i"); // 为了把图片存到pic文件夹，需要再pic后面多谢/和多一个任意字符
        const hash = Math.random().toLocaleString().slice(2, 10) + imgfile?.originalname;
        const finalPath = imgPath + hash;
        const respUrl = "/pic/i" + hash;
        fs.writeFile(finalPath, imgfile?.buffer, () => {
            console.log("写入成功", finalPath);
            ResponseHelper.sendData(respUrl, resp);
        });
    }
);

export default router;
