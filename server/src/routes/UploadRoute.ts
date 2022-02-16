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
        const imgPath =
            path.resolve(__dirname, "../../public/uploadImg/") +
            Math.random().toLocaleString().slice(2, 10) +
            imgfile?.originalname;
        fs.writeFile(imgPath, imgfile?.buffer, () => {
            console.log("写入成功");
            ResponseHelper.sendData(imgPath, resp);
        });
    }
);

export default router;
