import express from "express"
import { login, Signup } from "../controllers/Auth";

const router = express.Router();

router.post("/signup",SignupValidation, Signup);
router.post("/login",LoginValidation, login)
