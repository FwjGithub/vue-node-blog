import { Response } from "express";
import { ISearchResult } from "../entities/CommonTypes";

export class ResponseHelper {
    /**
     * 响应一个错误
     */
    public static sendError(err: string | string[], resp: Response) {
        if (Array.isArray(err)) {
            err = err.join(",");
        }
        resp.send({
            code: 0,
            err,
            data: null,
        });
    }

    /**
     * 响应一个普通数据
     */
    public static sendData(data: any, resp: Response) {
        resp.send({
            code: 1,
            err: "",
            data,
        });
    }

    /**
     * 响应一个分页数据
     */

    public static sendPageData<T>(result: ISearchResult<T>, resp: Response) {
        if (result.errors.length > 0) {
            this.sendError(result.errors, resp);
        } else {
            resp.send({
                code: 1,
                err: "",
                data: result.data,
                count: result.count
            });
        }
    }
}
