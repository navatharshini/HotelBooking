import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node"; // Changed import
import clerkWebhooks from "./controllers/clerkWebhooks.js";
import userRouter from "./routes/userRoutes.js";
import hotelRouter from "./routes/hotelRoutes.js";
import roomRouter from "./routes/roomRoutes.js";
import connectCloudinary from "./configs/clodinary.js";
import bookingRouter from "./routes/bookingRoutes.js";

// Verify environment variables before starting
if (!process.env.CLERK_PUBLISHABLE_KEY || !process.env.CLERK_SECRET_KEY) {
  throw new Error("Missing Clerk authentication keys in environment variables");
}

connectDB();
connectCloudinary();


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Clerk middleware configuration
const clerkAuthMiddleware = ClerkExpressRequireAuth({
  publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
  secretKey: process.env.CLERK_SECRET_KEY,
});

// Apply Clerk auth to all routes except webhooks
app.use((req, res, next) => {
  if (req.path.startsWith("/api/clerk")) {
    return next(); // Skip auth for webhooks
  }
  return clerkAuthMiddleware(req, res, next);
});

// Webhook route (no authentication)
app.use("/api/clerk", clerkWebhooks);

app.get("/", (req, res) => res.send("API is working"));
app.use("/api/user", userRouter);
app.use("/api/hotels/", hotelRouter);
app.use("/api/rooms/", roomRouter);
app.use("/api/bookings", bookingRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
