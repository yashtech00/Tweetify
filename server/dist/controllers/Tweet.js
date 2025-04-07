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
exports.LikeUnlikePost = exports.DeleteTweet = exports.commentTweet = exports.AllTweets = exports.PostTweet = void 0;
const TweetSchema_1 = __importDefault(require("../model/TweetSchema"));
// interface TweetProp {
//     content: string;
//     createdAt: Date;
//     userId: object; // Assuming user is a string (e.g., user ID)
//     like: Array<string>; // Assuming like is an array of strings (e.g., user IDs)
// }
// interface CommentTweetProp {
//     content: string;
//     createdAt: Date;
//     userId: string;
// }
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
    try {
        const { tweetId } = req.params.id;
        const { content } = req.body;
        const userId = req.user._id;
        if (!content) {
            return res.status(401).json({ message: "Tweet not found" });
        }
        const tweet = yield TweetSchema_1.default.findOne({ tweetId });
        if (!tweet) {
            return res.status(401).json("tweet not found");
        }
        const comment = {
            user: userId,
            content: content
        };
        tweet.comments.push(comment);
        yield tweet.save();
        const updateComment = yield TweetSchema_1.default.findById(tweetId).populate({
            path: "comments.user",
            select: "-password"
        });
        // if (!updateComment) {
        //     return res.status(401).json("error")
        // }
        return res.status(200).json({ message: "commented successfully" }, updateComment === null || updateComment === void 0 ? void 0 : updateComment.comments);
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Internal server error while commenting" });
    }
});
exports.commentTweet = commentTweet;
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
const LikeUnlikePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const { id: tweetId } = req.params;
        const tweet = yield TweetSchema_1.default.findOne({ tweetId });
        if (!tweet) {
            return res.status(401).json({ message: "tweet not found" });
        }
        const isLiked = tweet.likes.includes(userId);
        if (isLiked) {
            yield TweetSchema_1.default.updateOne({ _id: tweetId }, { $pull: { likes: userId } });
            const updatedLikes = tweet.likes.filter((id) => id.toString() !== userId.toString());
            return res.status(200).json(updatedLikes);
        }
        else {
            tweet.likes.push(userId);
            yield tweet.save();
            const updatedLikes = tweet.likes;
            return res.status(200).json(updatedLikes);
        }
    }
    catch (e) {
        console.error(e);
        return res.status(500).json("Internal server error");
    }
});
exports.LikeUnlikePost = LikeUnlikePost;
