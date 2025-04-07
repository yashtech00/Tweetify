import z from "zod";
import { LoginProp, SignupProp } from "../type/AuthType";

const SignupSchema = z.object({
    username: z.string().optional(),
    email: z.string().email(),
    password: z.string(),
});

const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

export const SignupValidation = (req: { body: SignupProp }, res: any, next: any) => {
    const SignupValid = SignupSchema.safeParse(req.body);
    if (!SignupValid.success) {
        return res.status(411).json({ error: "Input fields are wrong", details: SignupValid.error.errors });
    }

    next();
};

export const LoginValidation = (req: { body: LoginProp }, res: any, next: any) => {
    const LoginValid = LoginSchema.safeParse(req.body);
    if (!LoginValid.success) {
        return res.status(411).json({ error: "Input fields are wrong", details: LoginValid.error.errors });
    }

    next();
};
