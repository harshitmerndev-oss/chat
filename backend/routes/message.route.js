import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { upload } from "../middlewares/multer.js";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
const messageRoutes = express.Router();

messageRoutes.post("/send/:receiver",isAuth,upload.single("image"),sendMessage)
messageRoutes.get("/get/:receiver",isAuth,getMessages)

export default messageRoutes