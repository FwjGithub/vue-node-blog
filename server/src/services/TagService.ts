import Tag from "../entities/Tag";
import { TagModel } from "../db";
import { ITag } from "../db/TagSchema";
import SearchCondition from "../entities/SearchCondition";
import { ISearchResult } from "../entities/CommonTypes";
export default class TagService {
    public static async getTag(): Promise<object | any[]> {
        // console.log("查询评论", articleId);
        const result = await TagModel.find()
            // .skip((condition.page - 1) * condition.limit)
            // .limit(condition.limit)
            .sort({
                date: -1,
            });
        const count = await TagModel.find().countDocuments();
        return {
            count,
            data: result,
            errors: [],
        };
    }
    public static async addTag(tag: object): Promise<ITag | string[]> {
        console.log("增加评论");
        // return "成功 增加"
        const c = Tag.transform(tag);
        const isExist = await Tag.checkIsExit(TagModel, {
            text: c.text,
        });
        if (isExist) {
            return ["该标签已存在"];
        }
        const errors = await c.validateThis();
        if (errors.length > 0) {
            return errors;
        } else {
            return await TagModel.create(c);
        }
    }
    public static async removeTag(id: string): Promise<any> {
        const doc = await TagModel.findOne({_id: id});
        console.log("删除tag：", doc);
        if (doc && doc.count > 0) {
            return false;
        }
        await TagModel.deleteOne({
            _id: id,
        });
        return true;
    }
    public static async addCount(arr: string[]): Promise<any> {
        console.log("增加标签的count");
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < arr.length; i++) {
            const text = arr[i];
            await TagModel.updateOne({text}, {
                $inc: {
                    count: 1
                }
            })
        }
        return true;
    }
    public static async decreaseCount(arr: string[]): Promise<any> {
        console.log("减少标签的count");
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < arr.length; i++) {
            const text = arr[i];
            await TagModel.updateOne({text}, {
                $inc: {
                    count: -1
                }
            })
        }
        return true;
    }
}
