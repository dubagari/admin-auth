import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./api/routes/auth.routes.js";
import adminRoutes from "./api/routes/admin.routes.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err));

// Error handler
app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || "Something went wrong";
  res.status(status).json({
    success: false,
    status,
    message,
  });
});

// Server start
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
