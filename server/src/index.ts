import express from "express"
import cors from "cors"
import { connectDB } from "./model/db";
import dotenv from "dotenv";
dotenv.config();
import authRoutes from "./routes/authRoutes";
import tweetRoutes from "./routes/tweetRoutes"
import cookieParser from "cookie-parser";


const app = express();

connectDB();
//middleware -> it is used to parse incoming json request 
app.use(express.json())
app.use(cookieParser())

//CORS - cross origin resource sharing , it allow your express server to accept request from different origins
app.use(cors())

const PORT = process.env.PORT || 8000;

app.use("/user", authRoutes);
app.use("/tweets",tweetRoutes)


//server is listening on port 8000
app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
    
})