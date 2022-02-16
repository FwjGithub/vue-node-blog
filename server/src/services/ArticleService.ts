import Article from "../entities/Article";
import { ArticleModel } from "../db";
import { IArticle } from "../db/ArticleSchema";
import SearchCondition from "../entities/SearchCondition";
import { ISearchResult } from "../entities/CommonTypes";
export default class ArticleService {
    public static async add(art: Article): Promise<IArticle | string[]> {
        const article = Article.transform(art);
        // console.log("==========文章转换后：", article);
        const errors = await article.validateThis();
        // console.log("==========errors", errors);
        if (errors.length > 0) {
            return errors;
        } else {
            return await ArticleModel.create(article);
        }
    }

    public static async findById(id: string): Promise<IArticle | null> {
        return await ArticleModel.findById(id);
    }

    /**
     * 按页查询文章，key为title包含的字符串
     * @param conditionObj 查询条件，类型是平面对象
     */
    public static async findByPage(
        conditionObj: SearchCondition
    ): Promise<ISearchResult<IArticle> | null> {
        const condition = SearchCondition.transform(conditionObj);

        const errors = await condition.validateThis(true);
        if (errors.length > 0) {
            return null;
        } else {
            const result = await ArticleModel.find({
                title: new RegExp(condition.key),
            })
                .skip((condition.page - 1) * condition.limit)
                .limit(condition.limit);
            const count = await ArticleModel.find({
                title: new RegExp(condition.key),
            }).countDocuments();
            return {
                count,
                data: result,
                errors: [],
            };
        }
    }

    public static async remove(id: string): Promise<boolean> {
        await ArticleModel.deleteOne({
            _id: id,
        });
        return true;
    }

    public static async edit(id: string, updateArticle: object): Promise<any> {
        // 首先转换对象
        const article = Article.transform(updateArticle);

        // 验证对象
        const errors = await article.validateThis(true);
        console.log("执行了edit", errors);
        if (errors.length > 0) {
            console.log("修改出错了");
            return errors;
        } else {
            const result = await ArticleModel.updateOne(
                {
                    _id: id,
                },
                updateArticle
            );
            return result;
        }
    }
}
