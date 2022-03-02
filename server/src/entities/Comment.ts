import { Type } from "class-transformer";
import {
    ArrayMinSize,
    IsArray,
    IsInt,
    IsNotEmpty,
    NotEquals,
    Length,
    MinLength,
} from "class-validator";
import BaseEntity from "./BaseEntity";

export default class Comment extends BaseEntity {
    @IsNotEmpty({ message: "articleId不能为空" })
    @Type(() => String)
    public articleId: string;

    @IsNotEmpty({ message: "fromId不可以为空" })
    @Type(() => String)
    public fromId: string;

    @IsNotEmpty({ message: "fromName不可以为空" })
    @Type(() => String)
    public fromName: string;

    @Type(() => String)
    public fromAvatar: string = 'http://ww4.sinaimg.cn/bmiddle/006DLFVFgy1ft0j2pddjuj30v90uvagf.jpg';

    @Type(() => Number)
    public likeNum: number = 0;

    @IsNotEmpty({ message: "content不可以为空" })
    @Type(() => String)
    public content: string;

    @Type(() => Array)
    public reply: object[] = [];

    @Type(() => Number)
    public date: number = Date.now();

    public static transform(obj: object): Comment {
        return super.baseTransform(Comment, obj);
    }
    // public async checkPassword(): Promise<string> {
    //     if (this.password  !== this.passwordAgain) {
    //         return "密码不一致";
    //     }
    //     return "";
    // }
}
