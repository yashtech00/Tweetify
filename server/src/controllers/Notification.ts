import { error } from "console";
import NotificationModel from "../model/notification";

export const Notification = async (req:any,res:any) => {
    try {
        const userId = req.user._id;
        const notification = await NotificationModel.find({ to: userId }).populate({
            path: "from",
            select: "username"
        })

        await NotificationModel.updateMany({ to: userId }, { read: true });
        return res.status(200).json(notification);
    } catch (e) {
        console.error(e);
        return res.status(500).json({message:"Internal server error while sending notification"})
    }
}