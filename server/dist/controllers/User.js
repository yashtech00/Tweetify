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
exports.EditUserProfile = exports.getUserProfile = void 0;
const AuthSchema_1 = __importDefault(require("../model/AuthSchema"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.params;
        console.log({ username });
        const user = yield AuthSchema_1.default.findOne({ username }).select("-password");
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        console.log({ user }, "profile user");
        return res.status(200).json({ user });
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Internal server error while fetching user details" });
    }
});
exports.getUserProfile = getUserProfile;
const EditUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullname, username, email, currentPassword, newPassword, Bio, link } = req.body;
        const userId = req.user._id;
        const user = yield AuthSchema_1.default.findById(userId);
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        if ((!newPassword && currentPassword) || (!currentPassword && newPassword)) {
            return res.status(400).json({ error: "Enter both old password and new password" });
        }
        if (currentPassword && newPassword) {
            const isCorrect = yield bcrypt_1.default.compare(currentPassword, user.password);
            if (!isCorrect) {
                return res.status(400).json({ error: "Current Password entered is incorrect" });
            }
            if (newPassword.length < 6) {
                return res.status(400).json({ error: "New password must be atleast 6 characters long" });
            }
            user.password = yield bcrypt_1.default.hash(newPassword, 10);
        }
        const updateProfile = yield AuthSchema_1.default.updateOne({
            data: {
                fullname,
                username,
                email,
                Bio,
                link
            }
        });
        return res.status(200).json(updateProfile);
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Internal server error while update user details" });
    }
});
exports.EditUserProfile = EditUserProfile;
