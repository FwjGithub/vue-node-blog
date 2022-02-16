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
const ArticleService_1 = __importDefault(require("../services/ArticleService"));
const ResponseHelper_1 = require("./ResponseHelper");
const router = express_1.default.Router();
router.post("/", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield ArticleService_1.default.add(req.body);
    if (Array.isArray(result)) {
        ResponseHelper_1.ResponseHelper.sendError(result, resp);
    }
    else {
        ResponseHelper_1.ResponseHelper.sendData(result, resp);
    }
}));
router.get("/:id", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const articleid = req.params.id;
        const article = yield ArticleService_1.default.findById(articleid);
        ResponseHelper_1.ResponseHelper.sendData(article, resp);
    }
    catch (_a) {
        ResponseHelper_1.ResponseHelper.sendData(null, resp);
    }
}));
router.delete("/:id", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("id:", req.params.id);
    yield ArticleService_1.default.remove(req.params.id);
    ResponseHelper_1.ResponseHelper.sendData(true, resp);
}));
router.get("/", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield ArticleService_1.default.findByPage(req.query);
    if (result !== null) {
        ResponseHelper_1.ResponseHelper.sendPageData(result, resp);
    }
    else {
        ResponseHelper_1.ResponseHelper.sendError("找不到对应文章", resp);
    }
}));
router.put("/:id", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield ArticleService_1.default.edit(req.params.id, req.body);
    ResponseHelper_1.ResponseHelper.sendData(result, resp);
}));
exports.default = router;
