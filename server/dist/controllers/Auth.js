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
exports.getMe = exports.logout = exports.login = exports.Signup = void 0;
const AuthSchema_1 = __importDefault(require("../model/AuthSchema"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generateToken_1 = require("../lib/generateToken");
const Cloudinary_1 = __importDefault(require("../lib/Cloudinary"));
const Signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, fullname, email, password, profile_Image, Cover_Image } = req.body;
    try {
        const user = yield AuthSchema_1.default.findOne({ email });
        if (user) {
            return res.status(409).json({ message: "Already have an account, go for login" });
        }
        let profileImageUrlToUse = profile_Image;
        let coverImageUrlToUse = Cover_Image;
        if (profile_Image) {
            const uploadRes = yield Cloudinary_1.default.uploader.upload(profile_Image);
            profileImageUrlToUse = uploadRes.secure_url;
        }
        if (Cover_Image) {
            const uploadRes = yield Cloudinary_1.default.uploader.upload(Cover_Image);
            coverImageUrlToUse = uploadRes.secure_url;
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const newUser = yield AuthSchema_1.default.create({
            fullname,
            username,
            email,
            password: hashedPassword,
            profile_Image: profileImageUrlToUse,
            Cover_Image: coverImageUrlToUse,
        });
        (0, generateToken_1.generateToken)(newUser._id, res);
        return res.status(201).json({ message: "User registered successfully", user: newUser });
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Internal server error while signup" });
    }
});
exports.Signup = Signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield AuthSchema_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found, go for Signup" });
        }
        const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = (0, generateToken_1.generateToken)(user._id, res);
        console.log("generated token", token);
        return res.status(200).json({ message: "Login successfully", user });
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ msg: "Logged out successfully" });
    }
    catch (error) {
        console.log("Error in logout controller", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.logout = logout;
const getMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("before me");
        const user = yield AuthSchema_1.default.findById(req.user._id).select("-password");
        console.log({ user }, "yash get me");
        return res.status(200).json({
            message: "me got this =>",
            data: user
        });
    }
    catch (e) {
        console.error(e.message);
        return res.status(500).json("Internal server error");
    }
});
exports.getMe = getMe;
