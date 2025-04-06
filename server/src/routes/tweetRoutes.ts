import express from "express"

const router = express.Router();


router.get("/Gettweets", AllTweets);
router.post("/Posttweet", PostTweet)
router.get("/Gettweet", OneTweet);
router.delete("/Deletetweet", DeleteTweet);
