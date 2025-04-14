import NotificationModel from "../model/notification";

export const Notification = async (req:any,res:any) => {
    try {
        const userId = req.user._id;
        console.log(userId,"notifi userId");
        
        const notification = await NotificationModel.find({ to: userId }).populate({
            path: "from",
            select: "username"
        })
        console.log(notification,"notifi");
        

        await NotificationModel.updateMany({ to: userId }, { read: true });
        return res.status(200).json({message:"fetch notification",data:notification });
    } catch (e) {
        console.error(e);
        return res.status(500).json({message:"Internal server error while sending notification"})
    }
}