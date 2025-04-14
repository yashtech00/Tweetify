"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (userId, res) => {
    const token = jsonwebtoken_1.default.sign({ userId }, process.env.JWT_SECRET || "default_secret", { expiresIn: "24h" } // Consider your application's specific needs here  
    );
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: true, // must be true on HTTPS
        sameSite: "none", // required for cross-site cookie
        maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    console.log("tokens:", token);
    return token;
};
exports.generateToken = generateToken;
