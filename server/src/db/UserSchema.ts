import User from "../entities/User";
import Mongoose from "mongoose";

export interface IUser extends User, Mongoose.Document {}

const userSchema = new Mongoose.Schema<IUser>(
    {
        username: String,
        password: String,
        isAdmin: Boolean,
        isSuperAdmin: Boolean,
        cDate: Number,
        uDate: Number,
    },
    {
        versionKey: false,
    }
);
export default Mongoose.model<IUser>("User", userSchema);
