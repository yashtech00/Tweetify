"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = require("../controllers/User");
const Authenticated_1 = __importDefault(require("../middlewares/Authenticated"));
const router = express_1.default.Router();
router.get("/userProfile/:username", Authenticated_1.default, User_1.getUserProfile);
router.put("/editUserProfile", Authenticated_1.default, User_1.EditUserProfile);
router.post("/follow/:id", Authenticated_1.default, User_1.FollowUnfollow);
router.get("/suggested", Authenticated_1.default, User_1.getSuggestedUsers);
exports.default = router;
