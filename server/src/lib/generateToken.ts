import jwt from "jsonwebtoken";  
import { Response } from "express"; // Importing Response type from Express  

export const generateToken = (userId: any, res: Response) => {  
    const token = jwt.sign(  
        { userId },  
        process.env.JWT_SECRET || "default_secret",  
        { expiresIn: "24h" } // Consider your application's specific needs here  
    );  

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: false, // Set to true only in production with HTTPS
        sameSite: "lax", // Or "none" with secure: true if using different domains
        maxAge: 24 * 60 * 60 * 1000 // 1 day
      });
      
    console.log("tokens:", token);
    
    return token
}  