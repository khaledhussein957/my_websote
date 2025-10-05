import { Document } from "mongoose";
export interface IUser extends Document {
    name: string;
    email: string;
    phone: string;
    password: string;
    image?: string;
    imageKey?: string;
    title?: string;
    about_me?: string;
    resetPasswordCode: string;
    resetPasswordExpiresAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
declare const User: import("mongoose").Model<IUser, {}, {}, {}, Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default User;
//# sourceMappingURL=user.model.d.ts.map