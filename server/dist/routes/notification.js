"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Notification_1 = require("../controllers/Notification");
const Authenticated_1 = __importDefault(require("../middlewares/Authenticated"));
const router = express_1.default.Router();
router.get("/notification", Authenticated_1.default, Notification_1.Notification);
exports.default = router;
