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
exports.getSuggestedUsers = exports.FollowUnfollow = exports.EditUserProfile = exports.getUserProfile = void 0;
const AuthSchema_1 = __importDefault(require("../model/AuthSchema"));
const notification_1 = __importDefault(require("../model/notification"));
const Cloudinary_1 = __importDefault(require("../lib/Cloudinary"));
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
        return res
            .status(500)
            .json({ message: "Internal server error while fetching user details" });
    }
});
exports.getUserProfile = getUserProfile;
const EditUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullname, username, email, bio, link, profile_Image, Cover_Image } = req.body;
        const userId = req.user._id;
        console.log(userId, "user id");
        const user = yield AuthSchema_1.default.findById(userId);
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        let profileImageUrlToUse = profile_Image;
        let coverImageUrlToUse = Cover_Image;
        if (profile_Image) {
            try {
                const uploadRes = yield Cloudinary_1.default.uploader.upload(profile_Image, {
                    folder: "profile_images",
                });
                profileImageUrlToUse = uploadRes.secure_url;
            }
            catch (uploadError) {
                console.error("Cloudinary upload error for profile image:", uploadError);
                return res
                    .status(500)
                    .json({ message: "Failed to upload profile image" });
            }
        }
        if (Cover_Image) {
            try {
                const uploadRes = yield Cloudinary_1.default.uploader.upload(Cover_Image, {
                    folder: "cover_images",
                });
                coverImageUrlToUse = uploadRes.secure_url;
            }
            catch (uploadError) {
                console.error("Cloudinary upload error for cover image:", uploadError);
                return res
                    .status(500)
                    .json({ message: "Failed to upload cover image" });
            }
        }
        const updatedUser = yield AuthSchema_1.default.findByIdAndUpdate(userId, {
            fullname,
            username,
            email,
            bio,
            link,
            profile_Image: profileImageUrlToUse,
            Cover_Image: coverImageUrlToUse,
        }, { new: true });
        return res
            .status(200)
            .json({ message: "Updated successfully", data: updatedUser });
    }
    catch (e) {
        console.error(e);
        return res
            .status(500)
            .json({ message: "Internal server error while updating user details" });
    }
});
exports.EditUserProfile = EditUserProfile;
const FollowUnfollow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userId = req.user._id;
        const UserModified = yield AuthSchema_1.default.findById(id);
        const currentUser = yield AuthSchema_1.default.findById(userId);
        if (id === userId) {
            return res.status(401).json({ message: "You cannot follow yourself" });
        }
        if (!UserModified || !currentUser) {
            return res.status(401).json({ message: "User not found" });
        }
        const isFollowing = currentUser.following.includes(id);
        if (isFollowing) {
            yield AuthSchema_1.default.findByIdAndUpdate(id, {
                $pull: { followers: userId },
            });
            yield AuthSchema_1.default.findByIdAndUpdate(userId, {
                $pull: { followers: id },
            });
        }
        else {
            yield AuthSchema_1.default.findByIdAndUpdate(id, { $push: { followers: userId } });
            yield AuthSchema_1.default.findByIdAndUpdate(userId, { $push: { following: id } });
            const newNotification = new notification_1.default({
                type: "follow",
                from: userId,
                to: UserModified._id,
            });
            yield newNotification.save();
            return res.status(200).json({ message: "Followed successfully" });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
        console.log("error in follow or Unfollow User", error.message);
    }
});
exports.FollowUnfollow = FollowUnfollow;
const getSuggestedUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user._id;
        const usersFollowedByMe = yield AuthSchema_1.default.findById(userId).select("following");
        const users = yield AuthSchema_1.default.aggregate([
            {
                $match: {
                    _id: { $ne: userId },
                },
            },
            { $sample: { size: 10 } },
        ]);
        const filteredUsers = users.filter((user) => !(usersFollowedByMe === null || usersFollowedByMe === void 0 ? void 0 : usersFollowedByMe.following.includes(user._id)));
        const suggestedUsers = filteredUsers.slice(0, 4);
        suggestedUsers.forEach((user) => (user.password = null));
        res.status(200).json(suggestedUsers);
    }
    catch (error) {
        console.log("Error in geting the sugestions", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getSuggestedUsers = getSuggestedUsers;
