import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import { clerkMiddleware, requireAuth } from "@clerk/express"; // ✅ Correct imports
import clerkWebhooks from "./controllers/clerkWebhooks.js";
import userRouter from "./routes/userRoutes.js";
import hotelRouter from "./routes/hotelRoutes.js";
import roomRouter from "./routes/roomRoutes.js";
import connectCloudinary from "./configs/clodinary.js";
import bookingRouter from "./routes/bookingRoutes.js";

// Check required Clerk env vars
if (!process.env.CLERK_PUBLISHABLE_KEY || !process.env.CLERK_SECRET_KEY) {
  throw new Error("Missing Clerk authentication keys in environment variables");
}

connectDB();
connectCloudinary();

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Clerk middleware (global) — sets req.auth
app.use(clerkMiddleware());

// ✅ Skip auth for webhook route
app.use("/api/clerk", clerkWebhooks);

// ✅ Auth-protected test route
app.get("/api/test-auth", requireAuth(), (req, res) => {
  res.json({ success: true, userId: req.auth.userId });
});

// ✅ Protected routes (if needed)
app.use("/api/user", requireAuth(), userRouter);
app.use("/api/hotels", requireAuth(), hotelRouter);
app.use("/api/rooms", requireAuth(), roomRouter);
app.use("/api/bookings", requireAuth(), bookingRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
