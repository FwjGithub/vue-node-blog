import { Type } from "class-transformer";
import {
    IsNotEmpty,
} from "class-validator";
import BaseEntity from "./BaseEntity";

export default class Tag extends BaseEntity {
    @IsNotEmpty({ message: "标签的text不能为空" })
    @Type(() => String)
    public text: string;

    @Type(() => Number)
    public count: number = 0;

    @Type(() => Number)
    public date: number = Date.now();

    public static transform(tag: object): Tag {
        return super.baseTransform(Tag, tag);
    }
}
