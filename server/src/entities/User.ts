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

export default class User extends BaseEntity {
    @IsNotEmpty({ message: "用户名不能为空" })
    @Type(() => String)
    public username: string;

    @IsNotEmpty({ message: "用户密码password不可以为空" })
    @MinLength(6, { message: "用户密码password至少6位数" })
    @Type(() => String)
    public password: string;

    @Type(() => String)
    public passwordAgain: string;

    @Type(() => Boolean)
    public isAdmin: boolean = false;

    @Type(() => Boolean)
    public isSuperAdmin: boolean = false;

    @IsNotEmpty({ message: "创建时间cDate不能为空" })
    @Type(() => Number)
    public cDate: number = Date.now();

    @IsNotEmpty({ message: "创建时间uDate不能为空" })
    @Type(() => Number)
    public uDate: number = Date.now();

    public static transform(obj: object): User {
        return super.baseTransform(User, obj);
    }
    public async checkPassword(): Promise<string> {
        if (this.password  !== this.passwordAgain) {
            return "密码不一致";
        }
        return "";
    }
}
