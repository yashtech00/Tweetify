"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Auth_1 = require("../controllers/Auth");
const Auth_2 = require("../middlewares/Auth");
const router = express_1.default.Router();
router.post("/signup", Auth_2.SignupValidation, Auth_1.Signup);
router.post("/login", Auth_2.LoginValidation, Auth_1.login);
exports.default = router;
