"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (userId, res) => {
    var _a, _b;
    const token = jsonwebtoken_1.default.sign({ userId }, process.env.JWT_SECRET || "default_secret", { expiresIn: "24h" } // Consider your application's specific needs here  
    );
    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, //15days in miliseconds
        httpOnly: true, // prevent XSS attacks cross site scripting attacks
        sameSite: "strict", // CSRF attacks cross site request forgery attacks
        secure: (((_b = (_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.NODE_ENV) === null || _b === void 0 ? void 0 : _b.trim()) || "development") !== "development",
    });
    console.log("tokens:", token);
    return token;
};
exports.generateToken = generateToken;
