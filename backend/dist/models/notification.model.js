import mongoose, { Schema, Document } from "mongoose";
const NotificationSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: {
        type: String,
        enum: ["info", "success", "warning", "error"],
        default: "info",
    },
    isRead: { type: Boolean, default: false },
}, { timestamps: true });
const Notification = mongoose.model("Notification", NotificationSchema);
export default Notification;
//# sourceMappingURL=notification.model.js.map