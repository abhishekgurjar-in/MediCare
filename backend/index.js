import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./Routes/authRoutes.js";
import userRoute from "./Routes/userRoutes.js";
import doctorRoute from "./Routes/doctorRoutes.js";
import reviewRoute from "./Routes/reviewRoutes.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// CORS options
const corsOptions = {
  origin: ["http://localhost:5173"], // Replace with your frontend URL
  credentials: true,
};

app.get("/", (req, res) => {
  res.send("API is working");
});

// Database connection
mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Database Connected");
  } catch (err) {
    console.log("MongoDB Database Connection failed", err);
    process.exit(1); // Exit process with failure
  }
};

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

// Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/doctors", doctorRoute);
app.use("/api/v1/reviews", reviewRoute);
// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

app.listen(port, () => {
  connectDB();
  console.log("Server is running on port", port);
});
