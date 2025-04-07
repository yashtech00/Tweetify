import jwt from "jsonwebtoken"

export const generateToken =  (userId:any,res:any) => {
    
    const token = jwt.sign(
        { userId},
        process.env.JWT_SECRET || "default_secret",
        { expiresIn: "24h" }
    );

    res.cookie("jwt",token,{
        maxAge: 15*24*60*60*1000, //15days in miliseconds
        httpOnly: true,           // prevent XSS attacks cross site scripting attacks
        sameSite: "strict",        // CSRF attacks cross site request forgery attacks
    })
}