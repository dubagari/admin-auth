import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/user.model.js"; // adjust path

dotenv.config({ path: "../.evn" });

const createAdmin = async () => {
  try {
    console.log("Mongo URI:", process.env.MONGO_URI); // check value in console

    if (!process.env.MONGO_URI) {
      throw new Error("❌ MONGO_URI is undefined. Check your .env file path.");
    }
    await mongoose.connect(process.env.MONGO_URI);

    const hashedPassword = bcrypt.hashSync("admin123", 10);

    const admin = new User({
      firstname: "Super",
      surname: "Admin",
      email: "admin@example.com",
      password: hashedPassword,
      role: "admin",
    });

    await admin.save();
    console.log("✅ Admin created successfully!");
    mongoose.disconnect();
  } catch (err) {
    console.error(err);
    mongoose.disconnect();
  }
};

createAdmin();
