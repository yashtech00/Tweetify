import mongoose from "mongoose"

const Schema = mongoose.Schema

const NotificationSchema = new Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ["follow", "like"]
    },
    read: {
        type: Boolean,
        default: false
    }
});

const NotificationModel = mongoose.model("notification", NotificationSchema);

export default NotificationModel;