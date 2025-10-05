import { Document, Types } from "mongoose";
export interface IEducation extends Document {
    user: Types.ObjectId;
    institution: string;
    degree: string;
    startYear: string;
    endYear: string;
    gpa: string;
    uri: string;
    createdAt: Date;
    updatedAt: Date;
}
declare const Education: import("mongoose").Model<IEducation, {}, {}, {}, Document<unknown, {}, IEducation, {}, {}> & IEducation & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default Education;
//# sourceMappingURL=education.model.d.ts.map