import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { errorHandler } from "../middleware/error.js";

export const signup = async (req, res, next) => {
  try {
    const { firstname, surname, email, password, role } = req.body;
    const hash = bcrypt.hashSync(password, 10);
    const newUser = new User({
      firstname,
      surname,
      email,
      password: hash,
      role,
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    next(errorHandler(401, "email already exist"));
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const validUser = await User.findOne({ email });
    if (!validUser) return res.status(404).json({ message: "User not found" });

    const hashedPassword = bcrypt.compareSync(password, validUser.password);
    if (!hashedPassword)
      return res.status(401).json({ message: "Wrong credentials" });

    const token = jwt.sign(
      { id: validUser._id, role: validUser.role },
      process.env.JWT_SECRET
    );

    const { password: pass, ...ress } = validUser._doc;

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(ress);
  } catch (error) {
    next(errorHandler(error));
  }
};

// Logout
export const logout = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};
