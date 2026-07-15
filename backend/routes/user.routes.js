import express from "express";
import { editprofile, getUser, getotheruser} from "../controllers/user.controller.js";
import isAuth from "../middlewares/isAuth.js";
import { upload } from "../middlewares/multer.js";
const userRoutes = express.Router();

userRoutes.get("/current",isAuth, getUser);
userRoutes.get("/others",isAuth, getotheruser)
userRoutes.put("/profile",isAuth,upload.single("image"),editprofile)

export default userRoutes