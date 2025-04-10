import express from "express"
import { Notification } from "../controllers/Notification";
import AuthenticateRoute from "../middlewares/Authenticated";

const router = express.Router();

router.get("/notification",AuthenticateRoute, Notification);