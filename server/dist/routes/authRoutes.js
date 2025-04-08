"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Auth_1 = require("../controllers/Auth");
const Auth_2 = require("../middlewares/Auth");
const Authenticated_1 = __importDefault(require("../middlewares/Authenticated"));
const router = express_1.default.Router();
router.post("/signup", Auth_2.SignupValidation, Auth_1.Signup);
router.post("/login", Auth_2.LoginValidation, Auth_1.login);
router.post("/logout", Auth_1.logout);
router.get("/me", Authenticated_1.default, Auth_1.getMe);
exports.default = router;
