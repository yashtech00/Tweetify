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
exports.getLikeTweets = exports.getAnyUserTweets = exports.getFollowingTweets = exports.LikeUnlikeTweet = exports.DeleteTweet = exports.commentTweet = exports.AllTweets = exports.PostTweet = void 0;
const AuthSchema_1 = __importDefault(require("../model/AuthSchema"));
const notification_1 = __importDefault(require("../model/notification"));
const TweetSchema_1 = __importDefault(require("../model/TweetSchema"));
const PostTweet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { content } = req.body;
        const userId = req.user._id;
        const user = yield AuthSchema_1.default.findById(userId);
        if (!user) {
            return res.status(401).json("user not found");
        }
        const tweets = yield TweetSchema_1.default.create({
            content,
            user: userId,
        });
        return res
            .status(200)
            .json({ message: "Tweet successfully posted", data: tweets });
    }
    catch (e) {
        console.error(e);
        return res
            .status(500)
            .json({ message: "Internal server error while posting tweet" });
    }
});
exports.PostTweet = PostTweet;
const AllTweets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tweets = yield TweetSchema_1.default.find().populate("user", "username");
        return res
            .status(200)
            .json({ message: "Fetched all tweets", data: tweets });
    }
    catch (e) {
        console.error(e);
        return res
            .status(500)
            .json({ message: "Internal server error while fetching all tweets" });
    }
});
exports.AllTweets = AllTweets;
const commentTweet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tweetId = req.params.id;
        const { content } = req.body;
        const userId = req.user._id;
        console.log(tweetId, "comment tweet Id");
        if (!content) {
            return res.status(401).json({ message: "Tweet content not found" });
        }
        const tweet = yield TweetSchema_1.default.findOne({ _id: tweetId });
        if (!tweet) {
            return res.status(401).json("tweet not found");
        }
        const comment = {
            user: userId,
            content,
        };
        tweet.comments.push(comment);
        yield tweet.save();
        const updateComment = yield TweetSchema_1.default.findById(tweetId).populate({
            path: "comments.user",
            select: "-password",
        });
        console.log(updateComment, "tweet updated comment");
        return res.status(200).json({
            message: "commented successfully",
            data: updateComment === null || updateComment === void 0 ? void 0 : updateComment.comments,
        });
    }
    catch (e) {
        console.error(e);
        return res
            .status(500)
            .json({ message: "Internal server error while commenting" });
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
        return res
            .status(500)
            .json({ message: "Internal server error while deleting" });
    }
});
exports.DeleteTweet = DeleteTweet;
const LikeUnlikeTweet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const { id: tweetId } = req.params;
        console.log(tweetId, "tweetId");
        const tweet = yield TweetSchema_1.default.findOne({ _id: tweetId });
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
            yield AuthSchema_1.default.updateOne({ _id: userId }, { $push: { likedPosts: tweetId } });
            yield tweet.save();
            const notification = new notification_1.default({
                from: userId,
                to: tweet.user,
                type: "like",
            });
            yield notification.save();
            const updatedLikes = tweet.likes;
            return res.status(200).json(updatedLikes);
        }
    }
    catch (e) {
        console.error(e);
        return res.status(500).json("Internal server error");
    }
});
exports.LikeUnlikeTweet = LikeUnlikeTweet;
const getFollowingTweets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user._id;
        const user = yield AuthSchema_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const following = user.following;
        const findPosts = yield TweetSchema_1.default.find({ user: { $in: following } })
            .sort({ createdAt: -1 })
            .populate({
            path: "user",
            select: "-password",
        })
            .populate({
            path: "comments.user",
            select: "-password",
        });
        res.status(200).json(findPosts);
    }
    catch (error) {
        console.log("Error while getting all following posts: ", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getFollowingTweets = getFollowingTweets;
const getAnyUserTweets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.params;
        const user = yield AuthSchema_1.default.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const posts = yield TweetSchema_1.default.find({ user: user._id })
            .sort({ createdAt: -1 })
            .populate({
            path: "user",
            select: "-password",
        })
            .populate({
            path: "comments.user",
            select: "-password",
        });
        res.status(200).json({ data: posts });
    }
    catch (error) {
        console.log("Error while getting user posts: ", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getAnyUserTweets = getAnyUserTweets;
const getLikeTweets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    try {
        const user = yield AuthSchema_1.default.findById(userId);
        if (!user) {
            return res.status(401).json("user not found");
        }
        const LikesTweet = yield TweetSchema_1.default.find({
            _id: { $in: user.likedTweets },
        })
            .populate({
            path: "user",
            select: "-password",
        })
            .populate({
            path: "comments.user",
            select: "-password",
        });
        res.status(200).json(LikesTweet);
    }
    catch (e) {
        console.error(e.message);
        return res.status(500).json({ message: "Internal server error " });
    }
});
exports.getLikeTweets = getLikeTweets;
