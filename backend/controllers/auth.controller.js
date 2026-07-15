import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import gentoken from "../config/token.js";

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const checkusername = await User.findOne({ username });
    if (checkusername) {
      return res.status(400).json({ message: "Username already exists" });
    }
    const checkemail = await User.findOne({ email });
    if (checkemail) {
      return res.status(400).json({ message: "Email already exists" });
    }
    if (!password || password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    const token = await gentoken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      sameSite: "None",
      secure: true,
    });
   const { password:_, ...userWithoutPassword } = user.toObject();

res.status(201).json({
  success: true,
  message: "User registered successfully",
  user: userWithoutPassword,
});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const login = async (req, res) => {
  try {
    const {  email, password } = req.body;
   
  
    const user= await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
     
const ismatch=await bcrypt.compare(password,user.password)
if(!ismatch){
    return res.status(400).json({ message: "Invalid password" });
}
    const token = await gentoken(user._id);
   const isProduction = process.env.NODE_ENV === "production";

res.cookie("token", token, {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "None" : "Lax",
  path: "/",
  maxAge: 7 * 24 * 60 * 60 * 1000,
});
    const { password: _, ...userData } = user.toObject();

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: userData,
    });
  
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "login Server Error" });
  }
};
 
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });

    res.status(200).json({ message: "logout successful" });
  } catch (error) {
    res.status(500).json({ message: "logout Server Error" });
  }
};