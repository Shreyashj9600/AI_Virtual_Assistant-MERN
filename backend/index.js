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

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "https://ai-virtual-assistant-mern-2.onrender.com",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "AI Virtual Assistant Backend API is running 🚀",
  });
});


app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

connectDb();

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
