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
        secure: true, // must be true on HTTPS
        sameSite: "none", // required for cross-site cookie
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      });
      
      
    console.log("tokens:", token);
    
    return token
}  