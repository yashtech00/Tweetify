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
const bcrypt_1 = __importDefault(require("bcrypt"));
const generateToken_1 = require("../lib/generateToken");
const Signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    try {
        const user = yield AuthSchema_1.default.findOne({ email });
        if (user) {
            return res.status(409).json({ message: "Already have an account, go for login" });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = yield AuthSchema_1.default.create({
            username,
            email,
            password: hashedPassword,
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
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
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
        res.cookies("jwt", "", { maxAge: 0 });
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
        const me = yield AuthSchema_1.default.findById(req.user._id).select("-password");
        console.log(me, "yash get me");
        return res.status(200).json({ me });
    }
    catch (e) {
        console.error(e.message);
        return res.status(500).json("Internal server error");
    }
});
exports.getMe = getMe;
