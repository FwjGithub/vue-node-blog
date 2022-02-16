"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const articleSchema = new mongoose_1.default.Schema({
    title: String,
    poster: String,
    content: String,
    tags: [String],
    views: Number,
    createTime: Number
}, {
    versionKey: false,
});
exports.default = mongoose_1.default.model("Article", articleSchema);
