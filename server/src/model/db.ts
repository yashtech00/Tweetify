
import mongoose from "mongoose";

export const connectDB = () => {
    const mongoUrl = process.env.MONGO_URL;
    if (!mongoUrl) {
        throw new Error("MONGO_URL is not defined in the environment variables.");
    }
    try {
        mongoose.connect(mongoUrl)
            .then(() => {
                console.log("Connected to MongoDB successfully.");
            })
            .catch((e) => {
                console.error("Error connecting to MongoDB:", e);
                throw e;
            });
    } catch (e) {
        console.error("Error connecting to MongoDB:", e);
        throw e;
    }
}