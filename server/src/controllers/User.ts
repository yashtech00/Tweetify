import AuthModel from "../model/AuthSchema"
import bcrypt from "bcrypt"

export const getUserProfile = async (req:any,res:any) => {
    
    try {
        const {username} = req.params;
        const user = await AuthModel.findOne({ username }).select("-password");
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        return res.status(200).json(user);
    } catch (e) {
        console.error(e);
        return res.status(500).json({message:"Internal server error while fetching user details"})
    }
}


export const EditUserProfile = async (req: any, res: any) => {
    try {
        const { fullname, username, email, currentPassword,newPassword, Bio, link } = req.body;
        const userId = req.user._id;
        const user = await AuthModel.findById(userId)
        if (!user) {
            return res.status(401).json({message:"User not found"})
        }

        if((!newPassword && currentPassword) || (!currentPassword && newPassword)){
            return res.status(400).json({error: "Enter both old password and new password"})
        }

        if(currentPassword && newPassword){
            const isCorrect = await bcrypt.compare(currentPassword, user.password)
            if(!isCorrect){ return res.status(400).json({error: "Current Password entered is incorrect"})}

            if(newPassword.length < 6){
                return res.status(400).json({error: "New password must be atleast 6 characters long"});  
            }
            user.password = await bcrypt.hash(newPassword,10);
        }
        

        const updateProfile = await AuthModel.updateOne({
            data: {
                fullname,
                username,
                email,
                Bio,
                link
            }
        })
        return res.status(200).json(updateProfile);
    } catch (e) {
        console.error(e);
        return res.status(500).json({message:"Internal server error while update user details"})
    }
}