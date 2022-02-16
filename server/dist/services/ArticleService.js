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
const Article_1 = __importDefault(require("../entities/Article"));
const db_1 = require("../db");
const SearchCondition_1 = __importDefault(require("../entities/SearchCondition"));
class ArticleService {
    static add(art) {
        return __awaiter(this, void 0, void 0, function* () {
            const article = Article_1.default.transform(art);
            const errors = yield article.validateThis();
            if (errors.length > 0) {
                return errors;
            }
            else {
                return yield db_1.ArticleModel.create(article);
            }
        });
    }
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.ArticleModel.findById(id);
        });
    }
    static findByPage(conditionObj) {
        return __awaiter(this, void 0, void 0, function* () {
            const condition = SearchCondition_1.default.transform(conditionObj);
            const errors = yield condition.validateThis(true);
            if (errors.length > 0) {
                return null;
            }
            else {
                const result = yield db_1.ArticleModel.find({
                    title: new RegExp(condition.key),
                })
                    .skip((condition.page - 1) * condition.limit)
                    .limit(condition.limit);
                const count = yield db_1.ArticleModel.find({
                    title: new RegExp(condition.key),
                }).countDocuments();
                return {
                    count,
                    data: result,
                    errors: [],
                };
            }
        });
    }
    static remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.ArticleModel.deleteOne({
                _id: id,
            });
            return true;
        });
    }
    static edit(id, updateArticle) {
        return __awaiter(this, void 0, void 0, function* () {
            const article = Article_1.default.transform(updateArticle);
            const errors = yield article.validateThis(true);
            console.log("执行了edit", errors);
            if (errors.length > 0) {
                console.log("修改出错了");
                return errors;
            }
            else {
                const result = yield db_1.ArticleModel.updateOne({
                    _id: id,
                }, updateArticle);
                return result;
            }
        });
    }
}
exports.default = ArticleService;
