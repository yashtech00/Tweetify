import express from "express"
import { AllTweets, commentTweet, DeleteTweet, getAnyUserTweets, getFollowingTweets, LikeUnlikePost, PostTweet } from "../controllers/Tweet";
import AuthenticateRoute from "../middlewares/Authenticated";

const router = express.Router();


router.get("/Tweets",AuthenticateRoute, AllTweets);
router.post("/PostTweet",AuthenticateRoute, PostTweet),
router.put("/comment/:id",AuthenticateRoute, commentTweet),

router.delete("/DeleteTweet/:id", AuthenticateRoute, DeleteTweet);
router.put("/like/:id", AuthenticateRoute, LikeUnlikePost);
router.get("/following", AuthenticateRoute, getFollowingTweets);
router.get("/user/:username", AuthenticateRoute, getAnyUserTweets);


export default router