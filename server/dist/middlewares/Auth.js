"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginValidation = exports.SignupValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const SignupSchema = zod_1.default.object({
    username: zod_1.default.string().optional(),
    email: zod_1.default.string().email(),
    password: zod_1.default.string(),
    fullname: zod_1.default.string()
});
const LoginSchema = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string(),
});
const SignupValidation = (req, res, next) => {
    const SignupValid = SignupSchema.safeParse(req.body);
    if (!SignupValid.success) {
        return res.status(411).json({ error: "Input fields are wrong", details: SignupValid.error.errors });
    }
    next();
};
exports.SignupValidation = SignupValidation;
const LoginValidation = (req, res, next) => {
    const LoginValid = LoginSchema.safeParse(req.body);
    if (!LoginValid.success) {
        return res.status(411).json({ error: "Input fields are wrong", details: LoginValid.error.errors });
    }
    next();
};
exports.LoginValidation = LoginValidation;
