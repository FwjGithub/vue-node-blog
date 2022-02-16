import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsInt, IsNotEmpty } from "class-validator";
import BaseEntity from "./BaseEntity";

export default class Article extends BaseEntity {
    @IsNotEmpty({ message: "文章名称title不可以为空" })
    @Type(() => String)
    public title: string;

    @Type(() => String)
    public poster: string = "/public/upload/defaultImg.jpg";

    @IsNotEmpty({ message: "文章内容content不可以为空" })
    @Type(() => String)
    public content: string;

    @IsNotEmpty({ message: "文章内容html不可以为空" })
    @Type(() => String)
    public html: string;

    @IsNotEmpty({ message: "文章类型tags不可以为空" })
    @ArrayMinSize(1, { message: "文章类型至少有一个" })
    @IsArray({ message: "文章类型必须是数组" })
    @Type(() => String)
    public tags: string[];

    @IsInt({ message: "浏览次数views不能为空" })
    @Type(() => Number)
    public views: number = 0;

    @IsNotEmpty({ message: "创建时间cDate不能为空" })
    @Type(() => Number)
    public cDate: number = Date.now();

    @IsNotEmpty({ message: "创建时间cDate不能为空" })
    @Type(() => Number)
    public uDate: number = Date.now();

    public static transform(obj: object): Article {
        return super.baseTransform(Article, obj);
    }
}
