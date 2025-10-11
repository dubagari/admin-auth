import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
  },
  surname: {
    type: String,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

export default mongoose.model("User", userSchema);
