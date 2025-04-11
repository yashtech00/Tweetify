"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const AuthSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    followers: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "user",
            default: []
        }
    ],
    following: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "user",
            default: []
        }
    ],
    bio: {
        type: String,
        default: ""
    },
    link: {
        type: String,
        default: ""
    },
    likedTweets: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "tweet",
            default: []
        }
    ],
    tweets: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "tweet",
            default: []
        }
    ]
}, { timestamps: true });
const AuthModel = mongoose_1.default.model("user", AuthSchema);
exports.default = AuthModel;
