import express from "express"
import { login, Signup } from "../controllers/Auth";
import { LoginValidation, SignupValidation } from "../middlewares/Auth";

const router = express.Router();

router.post("/signup",SignupValidation, Signup);
router.post("/login",LoginValidation, login)
