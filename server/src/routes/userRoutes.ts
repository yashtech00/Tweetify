import express from "express"
import { EditUserProfile, FollowUnfollow, getSuggestedUsers, getUserProfile } from "../controllers/User";
import AuthenticateRoute from "../middlewares/Authenticated";

const router = express.Router();

router.get("/userProfile/:username",AuthenticateRoute, getUserProfile);
router.put("/editUserProfile", AuthenticateRoute, EditUserProfile);
router.post("/follow/:id", AuthenticateRoute, FollowUnfollow);
router.get("/suggested",AuthenticateRoute, getSuggestedUsers);

export default router;