"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const ArticleRoute_1 = __importDefault(require("./routes/ArticleRoute"));
const body_parser_1 = __importDefault(require("body-parser"));
const UploadRoute_1 = __importDefault(require("./routes/UploadRoute"));
const app = express_1.default();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use("/api/article", ArticleRoute_1.default);
app.use("/api/upload", UploadRoute_1.default);
app.listen(3000, () => {
    console.log("监听端口3000");
});
