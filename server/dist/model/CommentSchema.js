"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const CommentSchema = new Schema({
    tweet: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "tweet",
        required: true
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
});
const CommentModel = mongoose_1.default.model("comment", CommentSchema);
exports.default = CommentModel;
