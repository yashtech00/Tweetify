
import AuthModel from "../model/AuthSchema";
import TweetModel from "../model/TweetSchema";

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

export const PostTweet = async (req: any, res: any) => {
    try {
        console.log("before post tweet");
        
    const { content } = req.body
        const userId = req.user._id.toString();
        console.log(content,userId,"hello post tweet");
        
    
        const user = await AuthModel.findById(userId);
    if (!user) {
        return res.status(401).json("user not found");
    }
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
    try {
    const  tweetId = req.params.id
        const { content } = req.body;
        const userId = req.user._id;
    if (!content) {
        return res.status(401).json({message:"Tweet not found"})
    }

    const tweet = await TweetModel.findOne({ _id: tweetId });

    if (!tweet) {
        return res.status(401).json("tweet not found")
    }
        const comment = {
            user: userId,
            content: content
        }
        tweet.comments.push(comment);
        await tweet.save();

        const updateComment = await TweetModel.findById(tweetId).populate({
            path: "comments.user",
            select: "-password"
        });
        return res.status(200).json({message:"commented successfully"},updateComment?.comments);
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Internal server error while commenting" });
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

export const LikeUnlikePost = async (req: any, res: any) => {
    try {
        const userId = req.user.id
        const tweetId = req.params;
        console.log(tweetId,"yash tweetId");
        

    const tweet = await TweetModel.findOne({ _id:tweetId });
    if (!tweet) {
        return res.status(401).json({ message: "tweet not found" });
        }
        
        const isLiked = tweet.likes.includes(userId);
        if (isLiked) {
            await TweetModel.updateOne({ _id: tweetId }, { $pull: { likes: userId } });
            
            const updatedLikes = tweet.likes.filter((id) => id.toString() !== userId.toString());
            return res.status(200).json(updatedLikes);
        } else {
            tweet.likes.push(userId);
            await tweet.save();

            const updatedLikes = tweet.likes;
            return res.status(200).json(updatedLikes);
        }
        
    } catch (e) {
        console.error(e);
        return res.status(500).json("Internal server error");
    }
}

export const getFollowingTweets = async (req:any, res:any) => {
    try {
        const userId = req.user._id;

        const user = await AuthModel.findById(userId);
        if(!user){ return res.status(404).json({message: "User not found"}) }

        const following = user.following;
        const findPosts = await TweetModel.find({user: {$in: following}}).sort({createdAt: -1})
        .populate({
            path: "user",
            select: "-password"
        })
        .populate({
            path: "comments.user",
            select: "-password"
        })

        res.status(200).json(findPosts);

    } catch (error:any) {
        console.log("Error while getting all following posts: ",error.message);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

export const getAnyUserTweets = async (req:any,res:any)=>{
    try {
        const {username} = req.params;
        const user = await AuthModel.findOne({username});
        if(!user){return res.status(404).json({message: "User not found"});}

        const posts = await TweetModel.find({user: user._id}).sort({createdAt: -1}).populate({
            path: "user",
            select: "-password"
        }).populate({
            path: "comments.user",
            select: "-password"
        });

        res.status(200).json(posts);
    } catch (error:any) {
        console.log("Error while getting user posts: ",error.message);
        return res.status(500).json({message: "Internal Server Error"});
    }
}



