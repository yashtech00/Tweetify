"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Tweet_1 = require("../controllers/Tweet");
const Authenticated_1 = __importDefault(require("../middlewares/Authenticated"));
const router = express_1.default.Router();
router.get("/like/:id", Authenticated_1.default, Tweet_1.getLikeTweets);
router.get("/following", Authenticated_1.default, Tweet_1.getFollowingTweets);
router.get("/user/:username", Authenticated_1.default, Tweet_1.getAnyUserTweets);
router.get("/Tweets", Authenticated_1.default, Tweet_1.AllTweets);
router.post("/PostTweet", Authenticated_1.default, Tweet_1.PostTweet),
    router.put("/comment/:id", Authenticated_1.default, Tweet_1.commentTweet),
    router.delete("/DeleteTweet/:id", Authenticated_1.default, Tweet_1.DeleteTweet);
router.put("/like/:id", Authenticated_1.default, Tweet_1.LikeUnlikeTweet);
exports.default = router;
