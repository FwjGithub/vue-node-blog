"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleModel = void 0;
const ArticleSchema_1 = __importDefault(require("./ArticleSchema"));
exports.ArticleModel = ArticleSchema_1.default;
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect("mongodb://localhost:27017/blogdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("连接数据库成功"));
