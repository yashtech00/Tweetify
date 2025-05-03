import cloudinary from "../lib/Cloudinary";
import AuthModel from "../model/AuthSchema";
import NotificationModel from "../model/notification";
import TweetModel from "../model/TweetSchema";



export const PostTweet = async (req: any, res: any) => {
  try {
    console.log("before post tweet");

    const { content,images } = req.body;
    const userId = req.user._id.toString();
    console.log(content, userId, "hello post tweet");

    const user = await AuthModel.findById(userId);
    if (!user) {
      return res.status(401).json("user not found");
    }

     let ImageUrlToUse = images;
        if (images) {
          try {
            const uploadRes = await cloudinary.uploader.upload(images, {
              folder: "profile_images",
            });
            ImageUrlToUse = uploadRes.secure_url;
          } catch (uploadError) {
            console.error(
              "Cloudinary upload error for profile image:",
              uploadError
            );
            return res
              .status(500)
              .json({ message: "Failed to upload profile image" });
          }
        }

    const tweets = await TweetModel.create({
      content,
      images: ImageUrlToUse,
      user: userId,
    });
    return res
      .status(200)
      .json({ message: "Tweet successfully posted", data: tweets });
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ message: "Internal server error while posting tweet" });
  }
};

export const AllTweets = async (req: any, res: any) => {
  try {
    const tweets = await TweetModel.find().populate("user", "username");
    return res
      .status(200)
      .json({ message: "Fetched all tweets", data: tweets });
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ message: "Internal server error while fetching all tweets" });
  }
};

export const commentTweet = async (req: any, res: any) => {
  try {
    const tweetId = req.params.id;
    const { content } = req.body;
      const userId = req.user._id;
      console.log(tweetId,"comment tweet Id");
      
    if (!content) {
      return res.status(401).json({ message: "Tweet content not found" });
    }

    const tweet = await TweetModel.findOne({ _id: tweetId });

    if (!tweet) {
      return res.status(401).json("tweet not found");
    }
    const comment = {
      user: userId,
      content,
    };
    tweet.comments.push(comment);
    await tweet.save();

    const updateComment = await TweetModel.findById(tweetId).populate({
      path: "comments.user",
      select: "-password",
    });
      console.log(updateComment, "tweet updated comment");
      
    return res
      .status(200)
        .json({ message: "commented successfully", data: updateComment?.comments });
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ message: "Internal server error while commenting" });
  }
};

export const DeleteTweet = async (req: any, res: any) => {
  const tweetId = req.params.id;
  const post = await TweetModel.findOne({ _id: tweetId });
  if (!post) {
    return res.status(401).json("Tweet post not found");
  }
  if (post.user.toString() !== req.user._id.toString()) {
    return res.status(401).json("You are not authorized to delete this post");
  }

  try {
    await TweetModel.findByIdAndDelete({
      _id: tweetId,
    });
    return res.status(200).json({ message: "Tweet deleted successfully" });
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ message: "Internal server error while deleting" });
  }
};

export const LikeUnlikeTweet = async (req: any, res: any) => {
  try {
    const userId = req.user.id;
      const { id:tweetId } = req.params;
    console.log(tweetId, "tweetId");

    const tweet = await TweetModel.findOne({ _id: tweetId });
    if (!tweet) {
      return res.status(401).json({ message: "tweet not found" });
    }

    const isLiked = tweet.likes.includes(userId);
    if (isLiked) {
      await TweetModel.updateOne(
        { _id: tweetId },
        { $pull: { likes: userId } }
      );

      const updatedLikes = tweet.likes.filter(
        (id) => id.toString() !== userId.toString()
      );
      return res.status(200).json(updatedLikes);
    } else {
        tweet.likes.push(userId);
        await AuthModel.updateOne({_id: userId}, {$push: {likedPosts: tweetId}})
        await tweet.save();

        const notification = new NotificationModel({
            from: userId,
            to: tweet.user,
            type: "like"
        })
        await notification.save();

      const updatedLikes = tweet.likes;
      return res.status(200).json(updatedLikes);
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json("Internal server error");
  }
};

export const getFollowingTweets = async (req: any, res: any) => {
  try {
    const userId = req.user._id;

    const user = await AuthModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const following = user.following;
    const findPosts = await TweetModel.find({ user: { $in: following } })
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
  } catch (error: any) {
    console.log("Error while getting all following posts: ", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAnyUserTweets = async (req: any, res: any) => {
  try {
    const { username } = req.params;
    const user = await AuthModel.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const posts = await TweetModel.find({ user: user._id })
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
  } catch (error: any) {
    console.log("Error while getting user posts: ", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getLikeTweets = async (req: any, res: any) => {
    const userId = req.params.id;
    try {
 
    const user = await AuthModel.findById(userId);
    if (!user) {
      return res.status(401).json("user not found");
    }
    const LikesTweet = await TweetModel.find({
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
  } catch (e:any) {
      console.error(e.message);
      return res.status(500).json({message:"Internal server error "})
      
  }
};

