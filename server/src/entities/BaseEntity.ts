import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import { ClassType } from "class-transformer/ClassTransformer";
import { TagModel, UserModel } from "../db";

export default abstract class BaseEntity {
    /**
     * 验证当前文章对象
     */
    public async validateThis(skipMissing = false): Promise<string[]> {
        const errors = await validate(this, {
            skipMissingProperties: skipMissing,
        });
        const temp = errors.map((e) => Object.values(e.constraints));
        const result: string[] = [];
        temp.forEach((t) => {
            result.push(...t);
        });
        return result;
    }

    public static async checkIsExit(
        model: typeof TagModel | typeof UserModel,
        condition: object
    ): Promise<boolean> {
        const exist = await model.findOne(condition);
        console.log("exist存在：", exist);
        return !!exist;
    }

    protected static baseTransform<T>(
        cls: ClassType<T>,
        plainObject: object
    ): T {
        if (plainObject instanceof cls) {
            console.log("进入if", plainObject, cls);
            return plainObject;
        }
        let result;
        if (plainObject === undefined) {
            result = plainToClass(cls, {});
        } else {
            result = plainToClass(cls, plainObject);
        }
        console.log("toclass之后：", result);
        // return plainToClass(cls, plainObject);
        return result;
    }
}
