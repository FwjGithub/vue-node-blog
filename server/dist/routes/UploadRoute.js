"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const ResponseHelper_1 = require("./ResponseHelper");
const upload = multer_1.default();
const router = express_1.default.Router();
router.post("/", upload.single("imgfile"), (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const imgfile = req.file;
    const imgPath = path_1.default.resolve(__dirname, "../../public/upload/") +
        Math.random().toLocaleString().slice(2, 10) + (imgfile === null || imgfile === void 0 ? void 0 : imgfile.originalname);
    fs_1.default.writeFile(imgPath, imgfile === null || imgfile === void 0 ? void 0 : imgfile.buffer, () => {
        console.log("写入成功");
        ResponseHelper_1.ResponseHelper.sendData(imgPath, resp);
    });
}));
exports.default = router;
