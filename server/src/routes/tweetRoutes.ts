import express from "express"
import { AllTweets, commentTweet, DeleteTweet, LikeUnlikePost, PostTweet } from "../controllers/Tweet";
import AuthenticateRoute from "../middlewares/Authenticated";

const router = express.Router();


router.get("/Tweets",AuthenticateRoute, AllTweets);
router.post("/PostTweet",AuthenticateRoute, PostTweet),
router.put("/comment/:id",AuthenticateRoute, commentTweet),

router.delete("/DeleteTweet/:id", AuthenticateRoute, DeleteTweet);
router.put("/like/:id", AuthenticateRoute, LikeUnlikePost);


export default router