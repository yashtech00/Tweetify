import { Request, Response } from "express";
import CommentModel from "../model/CommentSchema";
import TweetModel from "../model/TweetSchema";

interface TweetProp {
    content: string;
    createdAt: Date;
    userId: object; // Assuming user is a string (e.g., user ID)
    like: Array<string>; // Assuming like is an array of strings (e.g., user IDs)
}

interface CommentTweetProp {
    content: string;
    createdAt: Date;
    userId: string;
}

export const PostTweet = async (req: any, res: any) => {

    const {content, userId} = req.body
    
    try {
        const tweets = await TweetModel.create({
            content,
            user: userId
        });
        return res.status(200).json({ message: "Tweet successfully posted", data: tweets });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Internal server error while posting tweet" });
    }
};

export const AllTweets = async (req: any, res:any) => {
    try {
        const tweets = await TweetModel.find().populate("user", "username");
        return res.status(200).json({ message: "Fetched all tweets", data: tweets });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Internal server error while fetching all tweets" });
    }
};

export const commentTweet = async (req: any, res:any) => {
    const { tweetId } = req.params.id;
    try {
        const comment = await CommentModel.create({
            tweet: tweetId,
            user: req.userId,
            content: req.content,
        });
        return res.status(200).json({ message: "Comment successfully added", data: comment });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Internal server error while commenting" });
    }
};

export const GetCommentOnTweet = async (req: any, res:any) => {
    try {
        const comments = await CommentModel.find({
            tweet: req.params.tweetId,
        }).populate("user", "username");
        return res.status(200).json({ message: "Fetched all comments successfully", data: comments });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Internal server error while fetching comments" });
    }
};

export const DeleteTweet = async (req: any, res:any )=> {

    const tweetId = req.params.id
    const post = await TweetModel.findOne({ _id: tweetId })
    if (!post) {
        return res.status(401).json("Tweet post not found")
    }
    if (post.user.toString() !== req.user._id.toString()) {
        return res.status(401).json("You are not authorized to delete this post")
    }

    try {
         await TweetModel.findByIdAndDelete({
            _id:tweetId,
        });
        return res.status(200).json({ message: "Tweet deleted successfully" });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Internal server error while deleting" });
    }
};