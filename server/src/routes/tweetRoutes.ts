import express from "express"
import { AllTweets, commentTweet, DeleteTweet, GetCommentOnTweet, PostTweet } from "../controllers/Tweet";
import AuthenticateRoute from "../middlewares/Authenticated";

const router = express.Router();


router.get("/Tweets",AuthenticateRoute, AllTweets);
router.post("/PostTweet",AuthenticateRoute, PostTweet),
router.post("/comment/:id",AuthenticateRoute, commentTweet),
router.get("/GetComment",AuthenticateRoute, GetCommentOnTweet);
router.delete("/DeleteTweet",AuthenticateRoute, DeleteTweet);


export default router