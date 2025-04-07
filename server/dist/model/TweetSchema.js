"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const TweetSchema = new Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    content: {
        type: String,
        maxlength: 280,
        trim: true,
        required: true,
    },
    likes: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "user"
        }],
    comment: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "comment"
        }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
const TweetModel = mongoose_1.default.model("tweet", TweetSchema);
exports.default = TweetModel;
