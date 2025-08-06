import express from "express";
import { checkAvailabilityAPI, createBooking } from "../controllers/bookingController.js";
import { protect } from "../middleware/authMiddleware.js";
import { getHotelBookings, getUserBookings } from "../controllers/roomController.js";

const bookingRouter = express.Router();

bookingRouter.post('/check-availability', checkAvailabilityAPI);
bookingRouter.post('/book', protect, createBooking);
bookingRouter.get('/user', protect, getUserBookings);
bookingRouter.get('/hotel', protect, getHotelBookings);

export default bookingRouter;
