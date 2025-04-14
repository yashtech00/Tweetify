"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notification = void 0;
const notification_1 = __importDefault(require("../model/notification"));
const Notification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user._id;
        console.log(userId, "notifi userId");
        const notification = yield notification_1.default.find({ to: userId }).populate({
            path: "from",
            select: "username"
        });
        console.log(notification, "notifi");
        yield notification_1.default.updateMany({ to: userId }, { read: true });
        return res.status(200).json({ message: "fetch notification", data: notification });
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Internal server error while sending notification" });
    }
});
exports.Notification = Notification;
