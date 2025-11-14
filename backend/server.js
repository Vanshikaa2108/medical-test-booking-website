import express from "express";
import cors from "cors";
import connectDB from "./db.js";
import userRoutes from "./routes/userRoutes.js";

connectDB();

const app = express();
app.use(express.json());

// Configure CORS for local frontend
app.use(
  cors({
    origin: "http://localhost:3000", // Local frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Routes
app.use("/api/users", userRoutes);

console.log("API routes are registered");

const PORT = 5000; // Backend runs on 5000
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
