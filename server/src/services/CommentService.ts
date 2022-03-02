import Comment from "../entities/Comment";
import { CommentModel } from "../db";
import { IComment } from "../db/CommentSchema";
import SearchCondition from "../entities/SearchCondition";
import { ISearchResult } from "../entities/CommonTypes";
export default class CommentService {
    public static async getComment(articleId: string): Promise<object | any[]> {
        console.log("查询评论", articleId);
        const result = await CommentModel.find({
            $or: [
                { articleId: new RegExp(articleId) }
            ],
        })
            // .skip((condition.page - 1) * condition.limit)
            // .limit(condition.limit)
            .sort({
                date: -1,
            });
        const count = await CommentModel.find({
            articleId: new RegExp(articleId),
        }).countDocuments();
        return {
            count,
            data: result,
            errors: [],
        };
        return [];
    }
    public static async addComment(comment: Comment): Promise<IComment | string[]> {
        console.log("增加评论")
        // return "成功 增加"
        const c = Comment.transform(comment);
        const errors = await c.validateThis();
        if (errors.length > 0) {
            return errors;
        } else {
            return await CommentModel.create(c);
        }
    }
    public static async replyComment(obj: any): Promise<any> {
        console.log("回复评论")
        const result = await CommentModel.update({_id: obj.commentId}, {
            $push: {
                reply: obj.reply
            }
        })

        return result;
    }
}
