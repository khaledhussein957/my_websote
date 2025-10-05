import { Schema, Document, model } from "mongoose";
const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: "",
    },
    imageKey: {
        type: String,
    },
    resetPasswordCode: { type: String },
    resetPasswordExpiresAt: { type: Date },
    title: {
        type: String,
        default: "",
    },
    about_me: {
        type: String,
        default: "",
    },
}, { timestamps: true });
const User = model("User", UserSchema);
export default User;
//# sourceMappingURL=user.model.js.map