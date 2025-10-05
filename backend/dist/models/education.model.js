import { Schema, Document, model, Types } from "mongoose";
const educationSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    institution: {
        type: String,
        required: true,
    },
    degree: {
        type: String,
        required: true,
    },
    startYear: {
        type: String,
    },
    endYear: {
        type: String,
    },
    gpa: {
        type: String,
        default: "N/A",
    },
    uri: {
        type: String,
        default: "N/A",
    },
}, { timestamps: true });
const Education = model("Education", educationSchema);
export default Education;
//# sourceMappingURL=education.model.js.map