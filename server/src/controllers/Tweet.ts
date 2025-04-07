import CommentModel from "../model/CommentSchema";
import TweetModel from "../model/TweetSchema";

interface TweetProp {
    content: string;
    createdAt: Date;
    user: object // Assuming user is a string (e.g., user ID)
    like: Array<string>; // Assuming like is an array of strings (e.g., user IDs)
}

interface CommentTweetProp{
    content: string,
    createdAt: Date,
    user: string,
    
}
export const PostTweet = async(req:{body:TweetProp}, res:any) => {
    const { content,user } = req.body;
    try {
        const tweets = await TweetModel.create({
            content:content,
            user:user,
        })
        return res.status(200).json("tweet successfully", tweets);
    } catch (e) {
        console.error(e);
        return res.status(500).json("Internal server error while posting tweet");
    }
}

export const AllTweets = async (req:any,res:any) => {
    try {
        const tweets = await TweetModel.find().populate('user', 'username');
        return res.status(200).json("fetch all tweets",tweets)
    } catch (e) {
        console.error(e);
        return res.status(500).json("Internal server error while fetching all tweets")
    }

}

export const commentTweet = async (req: any, res: any) => {
    try {
        const comment = await CommentModel.create({
                tweet: req.params.tweetId,
                user:req.user.id,
                content:req.content,  
        })
    } catch (e) {
        console.error(e);
        return res.status(500).json("Internal server error while commenting")    
    }
}

export const GetTweetById = async(req:any,res:any) => {
    try {
        const comment = await TweetModel.find({
            tweet: req.params.tweetId,
        }).populate('user', "username")
        return res.status(200).json("fetch all comments successfully");
    } catch (e) {
        console.error(e);
        return res.status(500).json("Internal server error while fetching comments")  
    }
}

export const DeleteTweet = async (req:any,res:any) => {
    try {
        const 
    } catch (e) {
        
    }
} 