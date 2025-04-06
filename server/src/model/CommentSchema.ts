import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    tweet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tweet",
        required:true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required:true
    },
    content: {
        type: String,
        required: true,
        trim:true
    },
    createdAt: {
        type: Date,
        default:Date.now(),
    }

})

const CommentModel = mongoose.model("comment", CommentSchema);

export default CommentModel;