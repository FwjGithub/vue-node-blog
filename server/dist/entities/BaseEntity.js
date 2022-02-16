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
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class BaseEntity {
    validateThis(skipMissing = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = yield class_validator_1.validate(this, {
                skipMissingProperties: skipMissing,
            });
            const temp = errors.map((e) => Object.values(e.constraints));
            const result = [];
            temp.forEach((t) => {
                result.push(...t);
            });
            return result;
        });
    }
    static baseTransform(cls, plainObject) {
        if (plainObject instanceof cls) {
            console.log("进入if", plainObject, cls);
            return plainObject;
        }
        let result;
        if (plainObject === undefined) {
            result = class_transformer_1.plainToClass(cls, {});
        }
        else {
            result = class_transformer_1.plainToClass(cls, plainObject);
        }
        console.log("toclass之后：", result);
        return result;
    }
}
exports.default = BaseEntity;
