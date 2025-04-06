import z from "zod"

 const SignupSchema = z.object({
    username: z.string().optional(),
    email: z.string().email(),
    password:z.string()
})

 const LoginSchema = z.object({
    email: z.string().email(),
    password:z.string()
})



const SignupValidation = (req, res, next) => {
    const SignupValid = SignupSchema.safeParse(req.body);
    if (!SignupValid) {
        return res.status(411).json("Input fields are wrong")
    }

    next();
}

const LoginValidation = (req, res, next) => {
    const LoginValid = LoginSchema.safeParse(req.body);
    if (!LoginValid) {
        return res.status(411).json("Input fields are wrong")
    }

    next();
}


