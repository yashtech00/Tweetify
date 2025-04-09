    import express from "express"
    import { connectDB } from "./model/db";
    import dotenv from "dotenv";
    import cors from "cors"
    dotenv.config();
    import authRoutes from "./routes/authRoutes";
    import tweetRoutes from "./routes/tweetRoutes"
    import cookieParser from "cookie-parser";


    const app = express();

    const corsConfig = {
        origin:"http://localhost:5173",  // specific origin, not "*"
        credentials: true,                // allows cookies to be sent
    };
    app.use(cors(corsConfig));

    //middleware -> it is used to parse incoming json request 
    app.use(express.json({limit: "5mb"}));    
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());

    

    connectDB();
    const PORT = process.env.PORT || 8001;

    app.use("/user", authRoutes);
    app.use("/tweets",tweetRoutes)


    //server is listening on port 8000
    app.listen(PORT, () => {
        console.log(`server is running on ${PORT}`);
    
    })