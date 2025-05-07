import express from "express"
import { AllTweets, commentTweet, DeleteTweet, getAnyUserTweets, getFollowingTweets, getLikeTweets, getTweetById, LikeUnlikeTweet, PostTweet } from "../controllers/Tweet";
import AuthenticateRoute from "../middlewares/Authenticated";

const router = express.Router();

router.get("/like/:id", AuthenticateRoute, getLikeTweets);
router.get("/following", AuthenticateRoute, getFollowingTweets);
router.get("/user/:username", AuthenticateRoute, getAnyUserTweets);
router.get("/Tweets", AuthenticateRoute, AllTweets);

router.get("/bookmarkTweet", AuthenticateRoute, getBookmarkTweets);
router.post("/bookmarkTweet", AuthenticateRoute, postBookmarkTweet)

router.get("/retweet", AuthenticateRoute, getRetweet);
router.post("/retweet", AuthenticateRoute, postRetweet); 

router.post("/PostTweet",AuthenticateRoute, PostTweet),
router.put("/comment/:id",AuthenticateRoute, commentTweet),

router.delete("/DeleteTweet/:id", AuthenticateRoute, DeleteTweet);
router.put("/like/:id", AuthenticateRoute, LikeUnlikeTweet);
router.get("/tweet/:id", AuthenticateRoute, getTweetById);






export default router