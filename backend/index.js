import express from "express";
import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";

import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";

const app = express();
const port = process.env.PORT;

//Cookie parser Middleware
app.use(cookieParser());

// JSON Parser Middleware
app.use(express.json());

// CORS Policy Middleware
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like curl or server-to-server)
      if (!origin) return callback(null, true);
      // Allow all origins by echoing back the origin
      callback(null, origin);
    },
    credentials: true, // Allow cookies/auth headers
  })
);

// Enables Routing from AuthRoutes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
// app.use("/api/tasks", taskRoutes);
// app.use("/api/reports", reportRoutes);

// Connects to MONGODB, Then Listens on The Server
app.listen(port, () => {
  connectDB().then(() => {
    console.log(`Server is listening on port ${port}...`);
  });
});
