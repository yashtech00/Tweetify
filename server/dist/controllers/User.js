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
const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.params;
        console.log({ username });
        const user = yield AuthSchema_1.default.findOne({ username }).select("-password");
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        console.log({ user }, "profile user");
        return res.status(200).json({ message: "fetch user", data: user });
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Internal server error while fetching user details" });
    }
});
exports.getUserProfile = getUserProfile;
const EditUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullname, username, email, bio, link } = req.body;
        const userId = req.user._id;
        console.log(userId, "user id");
        const user = yield AuthSchema_1.default.findById(userId);
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        const updatedUser = yield AuthSchema_1.default.findByIdAndUpdate(userId, { fullname, username, email, bio, link }, { new: true });
        return res.status(200).json({ message: "Updated successfully", data: updatedUser });
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Internal server error while updating user details" });
    }
});
exports.EditUserProfile = EditUserProfile;
