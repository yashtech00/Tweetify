import express from "express"
import { getMe, login, logout, Signup } from "../controllers/Auth";
import { LoginValidation, SignupValidation } from "../middlewares/Auth";
import AuthenticateRoute from "../middlewares/Authenticated";

const router = express.Router();

router.post("/signup",SignupValidation, Signup);
router.post("/login", LoginValidation, login)
router.post("/logout", logout);
router.get("/me", AuthenticateRoute, getMe);


export default router;