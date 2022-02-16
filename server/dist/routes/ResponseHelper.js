"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseHelper = void 0;
class ResponseHelper {
    static sendError(err, resp) {
        if (Array.isArray(err)) {
            err = err.join(",");
        }
        resp.send({
            code: 0,
            err,
            data: null,
        });
    }
    static sendData(data, resp) {
        resp.send({
            code: 1,
            err: "",
            data,
        });
    }
    static sendPageData(result, resp) {
        if (result.errors.length > 0) {
            this.sendError(result.errors, resp);
        }
        else {
            resp.send({
                code: 1,
                err: "",
                data: result.data,
                count: result.count
            });
        }
    }
}
exports.ResponseHelper = ResponseHelper;
