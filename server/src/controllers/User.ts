import AuthModel from "../model/AuthSchema"
import bcrypt from "bcrypt"

export const getUserProfile = async (req:any,res:any) => {
    
    try {
        const { username } = req.params;
        console.log({username});
        
        const user = await AuthModel.findOne( {username} ).select("-password");
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        console.log({user},"profile user");
        
        return res.status(200).json({message:"fetch user",data:user});
    } catch (e) {
        console.error(e);
        return res.status(500).json({message:"Internal server error while fetching user details"})
    }
}


export const EditUserProfile = async (req: any, res: any) => {
    try {
        const { fullname, username, email, bio, link } = req.body;
        const userId = req.user._id;
        console.log(userId, "user id");

        const user = await AuthModel.findById(userId);
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        const updatedUser = await AuthModel.findByIdAndUpdate(
            userId,
            { fullname, username, email, bio, link },
            { new: true }
        );

        return res.status(200).json({ message: "Updated successfully", data: updatedUser });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Internal server error while updating user details" });
    }
};
