"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./model/db");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const tweetRoutes_1 = __importDefault(require("./routes/tweetRoutes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
//middleware -> it is used to parse incoming json request 
app.use(express_1.default.json({ limit: "5mb" }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
const PORT = process.env.PORT || 5173;
app.use("/user", authRoutes_1.default);
app.use("/tweets", tweetRoutes_1.default);
//server is listening on port 8000
app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
    (0, db_1.connectDB)();
});
