import express from "express"
import { connectDB } from "./model/db";
import dotenv from "dotenv";
dotenv.config();
import authRoutes from "./routes/authRoutes";
import tweetRoutes from "./routes/tweetRoutes"
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express();
app.use(cors());

//middleware -> it is used to parse incoming json request 
app.use(express.json({limit: "5mb"}));    
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 5173;

app.use("/user", authRoutes);
app.use("/tweets",tweetRoutes)


//server is listening on port 8000
app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
    connectDB();
})