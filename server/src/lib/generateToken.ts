import jwt from "jsonwebtoken";  
import { Response } from "express"; // Importing Response type from Express  

export const generateToken = (userId: any, res: Response) => {  
    const token = jwt.sign(  
        { userId },  
        process.env.JWT_SECRET || "default_secret",  
        { expiresIn: "24h" } // Consider your application's specific needs here  
    );  

    res.cookie("jwt", token, {  
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds  
        httpOnly: true,                    // Prevents XSS  
        secure: process.env.NODE_ENV === "production", // Send only over HTTPS in production  
        sameSite: "strict",                   // Use 'None' only if required for cross-origin requests  
    }); 
    console.log("tokens:", token);
    
    return token
}  