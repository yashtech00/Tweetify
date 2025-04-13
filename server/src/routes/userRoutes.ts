import express from "express"
import { EditUserProfile, getUserProfile } from "../controllers/User";
import AuthenticateRoute from "../middlewares/Authenticated";

const router = express.Router();

router.get("/userProfile/:username",AuthenticateRoute, getUserProfile);
router.put("/editUserProfile",AuthenticateRoute, EditUserProfile);

export default router;