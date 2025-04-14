import express from "express";
import { connectDB } from "./model/db";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import authRoutes from "./routes/authRoutes";
import tweetRoutes from "./routes/tweetRoutes";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes";
import notification from "./routes/notification";

const app = express();

const corsOptions = {
    origin: ['https://tweetify-tau.vercel.app', 'http://localhost:5173'],
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow common HTTP methods
    allowedHeaders: 'Content-Type,Authorization', // Allow common headers (add any custom headers you use)
  };
app.use(cors(corsOptions));

//middleware -> it is used to parse incoming json request
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectDB();
const PORT = process.env.PORT || 8001;

app.use("/user", authRoutes);
app.use("/tweets", tweetRoutes);
app.use("/profile", userRoutes);
app.use("/notify", notification);

//server is listening on port 8000
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
