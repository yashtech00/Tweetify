import express from "express"
import { EditUserProfile, getUserProfile } from "../controllers/User";

const router = express.Router();

router.get("/userProfile/:username", getUserProfile);
router.put("/editUserProfile", EditUserProfile);

export default router;