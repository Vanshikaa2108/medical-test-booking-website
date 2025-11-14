import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const connectDB = async () => {
  const maxRetries = 5; // Maximum number of retries
  let retries = 0;

  const connectWithRetry = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("MongoDB connected successfully");
    } catch (err) {
      retries++;
      if (retries < maxRetries) {
        console.error(`MongoDB connection failed (attempt ${retries}/${maxRetries}):`, err.message);
        console.log("Retrying in 5 seconds...");
        setTimeout(connectWithRetry, 5000); // Retry after 5 seconds
      } else {
        console.error("MongoDB connection failed after maximum retries:", err.message);
        process.exit(1); // Exit the process if retries are exhausted
      }
    }
  };

  await connectWithRetry();
};

export default connectDB;
