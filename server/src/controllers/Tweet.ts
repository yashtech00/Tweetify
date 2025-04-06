import TweetModel from "../model/TweetSchema";

interface TweetProp{
    content: string,
    createdAt: Date
    user: string
    like: Array<any>
}
export const PostTweet = async(req:{body:TweetProp}, res:any) => {
    const { content,user,createdAt } = req.body;
    try {
        const tweets = await TweetModel.create({
            content,
            user,
            createdAt
        })
        return res.status(200).json("tweet successfully", tweets);
    } catch (e) {
        console.error(e);
        return res.status(500).json("Internal server error while posting tweet");
    }
}

export const AllTweets = async (req, res) => {
    
}