"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Tweet_1 = require("../controllers/Tweet");
const Authenticated_1 = __importDefault(require("../middlewares/Authenticated"));
const router = express_1.default.Router();
router.get("/Tweets", Authenticated_1.default, Tweet_1.AllTweets);
router.post("/PostTweet", Authenticated_1.default, Tweet_1.PostTweet),
    router.post("/comment", Authenticated_1.default, Tweet_1.commentTweet),
    router.get("/GetComment", Authenticated_1.default, Tweet_1.GetCommentOnTweet);
router.delete("/DeleteTweet", Authenticated_1.default, Tweet_1.DeleteTweet);
exports.default = router;
