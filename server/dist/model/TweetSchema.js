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
        required: true,
    },
    content: {
        type: String,
        maxlength: 280,
        trim: true,
        required: true,
    },
    likes: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "user",
        },
    ],
    comments: [
        {
            content: {
                type: String,
                required: true,
            },
            user: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "user",
                required: true,
            },
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });
const TweetModel = mongoose_1.default.model("tweet", TweetSchema);
exports.default = TweetModel;
