"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const BaseEntity_1 = __importDefault(require("./BaseEntity"));
class Article extends BaseEntity_1.default {
    constructor() {
        super(...arguments);
        this.poster = "/public/upload/defaultImg.jpg";
        this.views = 0;
        this.createTime = Date.now();
    }
    static transform(obj) {
        return super.baseTransform(Article, obj);
    }
}
__decorate([
    class_validator_1.IsNotEmpty({ message: "文章名称title不可以为空" }),
    class_transformer_1.Type(() => String),
    __metadata("design:type", String)
], Article.prototype, "title", void 0);
__decorate([
    class_transformer_1.Type(() => String),
    __metadata("design:type", String)
], Article.prototype, "poster", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: "文章内容content不可以为空" }),
    class_transformer_1.Type(() => String),
    __metadata("design:type", String)
], Article.prototype, "content", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: "文章类型tags不可以为空" }),
    class_validator_1.ArrayMinSize(1, { message: "文章类型至少有一个" }),
    class_validator_1.IsArray({ message: "文章类型必须是数组" }),
    class_transformer_1.Type(() => String),
    __metadata("design:type", Array)
], Article.prototype, "tags", void 0);
__decorate([
    class_validator_1.IsInt({ message: "浏览次数views不能为空" }),
    class_transformer_1.Type(() => Number),
    __metadata("design:type", Number)
], Article.prototype, "views", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: "创建时间createTime不能为空" }),
    class_transformer_1.Type(() => Number),
    __metadata("design:type", Number)
], Article.prototype, "createTime", void 0);
exports.default = Article;
