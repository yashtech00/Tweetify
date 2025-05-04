import jwt from "jsonwebtoken";
import AuthModel from "../model/AuthSchema";
import bcrypt from "bcryptjs";
import { LoginProp, SignupProp } from "../type/AuthType";
import { generateToken } from "../lib/generateToken";
import cloudinary from "../lib/Cloudinary";

export const Signup = async (req: { body: SignupProp }, res: any) => {
    const { username, fullname, email, password,Cover_Image } = req.body;

    try {
        const user = await AuthModel.findOne({ email });
        if (user) {
            return res.status(409).json({ message: "Already have an account, go for login" });
        }
        
            let coverImageUrlToUse = Cover_Image;
            
           
            if (Cover_Image) {
              const uploadRes = await cloudinary.uploader.upload(Cover_Image);
              coverImageUrlToUse = uploadRes.secure_url;
            }
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await AuthModel.create({
            fullname,
            username,
            email,
            password: hashedPassword,
            
            Cover_Image:coverImageUrlToUse,
        });
        generateToken(newUser._id, res);

        return res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Internal server error while signup" });
    }
};

export const login = async (req: { body: LoginProp }, res: any) => {
    const { email, password } = req.body;

    try {
        const user = await AuthModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found, go for Signup" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = generateToken(user._id, res);
        console.log("generated token", token);
        

        return res.status(200).json({ message: "Login successfully", user});
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const logout = async (req: any, res: any) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 })
        res.status(200).json({msg: "Logged out successfully"})
    } catch (error:any) {
        console.log("Error in logout controller", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getMe = async (req:any, res:any) => {
    try {
        console.log("before me");
        
        const user = await AuthModel.findById(req.user._id).select("-password");
        console.log({user},"yash get me");
        
        return res.status(200).json({
            message: "me got this =>",
            data: user
          });
          
    } catch (e:any) {
        console.error(e.message);
        return res.status(500).json("Internal server error");
    }
}