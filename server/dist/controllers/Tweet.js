"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteTweet = exports.GetCommentOnTweet = exports.commentTweet = exports.AllTweets = exports.PostTweet = void 0;
const CommentSchema_1 = __importDefault(require("../model/CommentSchema"));
const TweetSchema_1 = __importDefault(require("../model/TweetSchema"));
const PostTweet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { content, userId } = req.body;
    try {
        const tweets = yield TweetSchema_1.default.create({
            content,
            user: userId
        });
        return res.status(200).json({ message: "Tweet successfully posted", data: tweets });
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Internal server error while posting tweet" });
    }
});
exports.PostTweet = PostTweet;
const AllTweets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tweets = yield TweetSchema_1.default.find().populate("user", "username");
        return res.status(200).json({ message: "Fetched all tweets", data: tweets });
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Internal server error while fetching all tweets" });
    }
});
exports.AllTweets = AllTweets;
const commentTweet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tweetId } = req.params;
    try {
        const comment = yield CommentSchema_1.default.create({
            tweet: tweetId,
            user: req.body.userId,
            content: req.body.content,
        });
        return res.status(200).json({ message: "Comment successfully added", data: comment });
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Internal server error while commenting" });
    }
});
exports.commentTweet = commentTweet;
const GetCommentOnTweet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comments = yield CommentSchema_1.default.find({
            tweet: req.params.tweetId,
        }).populate("user", "username");
        return res.status(200).json({ message: "Fetched all comments successfully", data: comments });
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Internal server error while fetching comments" });
    }
});
exports.GetCommentOnTweet = GetCommentOnTweet;
const DeleteTweet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tweetId = req.params.id;
    const post = yield TweetSchema_1.default.findOne({ _id: tweetId });
    if (!post) {
        return res.status(401).json("Tweet post not found");
    }
    if (post.user.toString() !== req.user._id.toString()) {
        return res.status(401).json("You are not authorized to delete this post");
    }
    try {
        yield TweetSchema_1.default.findByIdAndDelete({
            _id: tweetId,
        });
        return res.status(200).json({ message: "Tweet deleted successfully" });
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Internal server error while deleting" });
    }
});
exports.DeleteTweet = DeleteTweet;
