import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDb from "./config/db.js";
import { authRouter } from "./routes/auth.router.js";
import userRouter from "./routes/user.router.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// ✅ Middleware
app.use(express.json());
app.use(cookieParser());

// ✅ CORS Config
app.use(
  cors({
    origin: "https://ai-virtual-assistant-mern-2.onrender.com",
    credentials: true,
  })
);

// // ✅ Handle Preflight Requests
// app.options("*", cors());

// ✅ Test Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ✅ Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

// ✅ Start Server After DB Connection
connectDb();

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
