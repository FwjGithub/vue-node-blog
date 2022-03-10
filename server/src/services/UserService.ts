import User from "../entities/User";
import { UserModel } from "../db";
import { IUser } from "../db/UserSchema";
import SearchCondition from "../entities/SearchCondition";
import { ISearchResult } from "../entities/CommonTypes";
export default class UserService {
    public static async register(user: User): Promise<IUser | string[]> {
        const isExist = await User.checkIsExit(UserModel, {
            username: user.username,
        });
        if (isExist) {
            return ["用户名已被使用哦~"];
        }
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
            return dbUser;
        }
    }
    
    public static async findByPage(
        conditionObj: SearchCondition
    ): Promise<ISearchResult<IUser> | null> {
        const condition = SearchCondition.transform(conditionObj);

        const errors = await condition.validateThis(true);
        if (errors.length > 0) {
            return null;
        } else {
            const result = await UserModel.find({
                $or: [
                    { username: new RegExp(condition.key) },
                ],
            })
                .skip((condition.page - 1) * condition.limit)
                .limit(condition.limit)
                .sort({
                    cDate: -1,
                });
            const count = await UserModel.find({
                username: new RegExp(condition.key),
            }).countDocuments();
            return {
                count,
                data: result,
                errors: [],
            };
        }
    }
    public static async remove(id: string): Promise<boolean> {
        // const tags = result.tags;
        // console.log("removeArticle：", result?.tags);
        // tslint:disable-next-line: no-unused-expression
        await UserModel.deleteOne({
            _id: id,
        });
        return true;
    }
    public static async changeAuth(userId: string, newAuth: any): Promise<object | string[]> {
        newAuth.cDate = Date.now();
        const result = await UserModel.updateOne(
            {
                _id: userId,
            },
            newAuth
        );
        // console.log(dbUser);
        if (!result) {
            return ["用户不存在"];
        }  else {
            return result;
        }
    }
    // public static async findById(id: string): Promise<IUser | null> {
    //     return await UserModel.findById(id);
    // }
}
