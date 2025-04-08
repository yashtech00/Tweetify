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
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds  
        httpOnly: true, // Prevents XSS  
        secure: process.env.NODE_ENV === "production", // Send only over HTTPS in production  
        sameSite: "strict", // Use 'None' only if required for cross-origin requests  
    });
    console.log("tokens:", token);
    return token;
};
exports.generateToken = generateToken;
