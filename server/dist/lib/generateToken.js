"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (userId, res) => {
    const token = jsonwebtoken_1.default.sign({ userId }, process.env.JWT_SECRET || "default_secret", { expiresIn: "24h" });
    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, //15days in miliseconds
        httpOnly: true, // prevent XSS attacks cross site scripting attacks
        sameSite: "strict", // CSRF attacks cross site request forgery attacks
    });
};
exports.generateToken = generateToken;
