import jwt from "jsonwebtoken";  
import { Response } from "express"; // Importing Response type from Express  

export const generateToken = (userId: any, res: Response) => {  
    const token = jwt.sign(  
        { userId },  
        process.env.JWT_SECRET || "default_secret",  
        { expiresIn: "24h" } // Consider your application's specific needs here  
    );  

    res.cookie("jwt", token, {
        maxAge: 15*24*60*60*1000, //15days in miliseconds
        httpOnly: true,           // prevent XSS attacks cross site scripting attacks
        sameSite: "strict",        // CSRF attacks cross site request forgery attacks
        secure: (process.env.NODE_ENV || "development").trim() !== "development",
      });
      
}  