import express from "express"
import { AllTweets, commentTweet, DeleteTweet, getAnyUserTweets, getFollowingTweets, getLikeTweets, LikeUnlikeTweet, PostTweet } from "../controllers/Tweet";
import AuthenticateRoute from "../middlewares/Authenticated";

const router = express.Router();

router.get("/like/:id", AuthenticateRoute, getLikeTweets);
router.get("/following", AuthenticateRoute, getFollowingTweets);
router.get("/user/:username", AuthenticateRoute, getAnyUserTweets);
router.get("/Tweets", AuthenticateRoute, AllTweets);

router.post("/PostTweet",AuthenticateRoute, PostTweet),
router.put("/comment/:id",AuthenticateRoute, commentTweet),

router.delete("/DeleteTweet/:id", AuthenticateRoute, DeleteTweet);
router.put("/like/:id", AuthenticateRoute, LikeUnlikeTweet);







export default router