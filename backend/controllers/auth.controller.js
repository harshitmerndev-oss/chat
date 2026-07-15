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
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }

    const ismatch = await bcrypt.compare(password, user.password);

    if (!ismatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    console.log("Generated Token:", token);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    console.log("Set-Cookie Header:", res.getHeader("Set-Cookie"));

    const { password: _, ...userData } = user.toObject();

    return res.status(200).json({
      success: true,
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