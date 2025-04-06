import express from "express"

const router = express.Router();

router.post("/signup",SignupValidation, Signup);
router.post("/login",LoginValidation, Login)
