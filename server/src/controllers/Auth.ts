import jwt from "jsonwebtoken";
import AuthModel from "../model/Schema";
import bcrypt from "bcrypt"



export const Signup = async(req: { body: SignupProp }, res: any) => {
    const { username, email, password } = req.body; 

    const user = await AuthModel.findOne({
        where: {
            email: email
        }
    })
    if (user) {
        return res.status(411).json("Already have an account , go for login");
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const newUser = await AuthModel.create({
            data: {
                username,
                email,
               password:hashedPassword
            }
        });
        return res.status(200).json("User register successfully",newUser);
    } catch (e) {
        console.error(e);
        return res.status(500).json("Internal server error");
    }
}

export const login = async(req: { body: LoginProp },res:any) => {
    const { email, password } = req.body;

    try {
        const user = await AuthModel.findOne({
            where: {
                email:email
            }
        })
        if (!user) {
            return res.status(404).json("User not found, go for Signup");
        }

        const token = jwt.sign(
            { email: email },
            process.env.JWT_SECRET || "",
            {expiresIn:'24h'}
        )
        return res.status(200).json("Login successfully",user,token)
    } catch (e) {
        console.error(e);
        return res.status(500).json("Internal server error")
        
    }
}