"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = require("../controllers/User");
const router = express_1.default.Router();
router.get("/userProfile/:username", User_1.getUserProfile);
router.put("/editUserProfile", User_1.EditUserProfile);
exports.default = router;
