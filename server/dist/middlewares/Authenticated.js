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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AuthSchema_1 = __importDefault(require("../model/AuthSchema"));
const AuthenticateRoute = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Request cookies:", req.cookies); // Should show all cookies  
        const token = req.cookies.jwt; // Get token from cookies  
        console.log("Retrieved token:", token); // Focus on this log 
        if (!token) {
            return res.status(401).json({ message: "No token,Authorization denied" });
        }
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }
        const decode = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (!decode || typeof decode === "string") {
            return res.status(401).json({ message: "Token is not valid" });
        }
        const user = yield AuthSchema_1.default.findById(decode.userId).select("-password");
        if (!user) {
            return res.status(401).json("User not found");
        }
        req.user = user;
        next();
    }
    catch (e) {
        console.error(e.message);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.default = AuthenticateRoute;
