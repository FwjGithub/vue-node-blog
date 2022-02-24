import User from "../entities/User";
import { UserModel } from "../db";
import { IUser } from "../db/UserSchema";
import SearchCondition from "../entities/SearchCondition";
import { ISearchResult } from "../entities/CommonTypes";
export default class UserService {
    public static async register(user: User): Promise<IUser | string[]> {
        const u = User.transform(user);
        const errors = await u.validateThis();
        const isEquals = await u.checkPassword();
        if (isEquals) {
            errors.push(isEquals);
        }
        // console.log("==========errors", errors);
        if (errors.length > 0) {
            return errors;
        } else {
            return await UserModel.create(u);
        }
    }

    public static async login(user: User): Promise<object | string[]> {
        const u = User.transform(user);
        const errors = await u.validateThis();
        const dbUser = await UserModel.findOne({
            username: u.username,
        });
        console.log(dbUser);
        if (!dbUser) {
            return ["用户不存在"];
        } else if (dbUser.password !== u.password) {
            return ["密码输出不正确"];
        } else {
            return {
                username: dbUser.username,
                _id: dbUser._id,
            };
        }
    }
    // public static async findById(id: string): Promise<IUser | null> {
    //     return await UserModel.findById(id);
    // }
}
