import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type:String,
      ref: "User", // Assumes you have a User model
      required: true,
    },
    room: {
      type: String,
      ref: "Room", // Assumes you have a Room model
      required: true,
    },
    hotel: {
      type: String,
      ref: "Hotel", // Assumes you have a Hotel model
      required: true,
    },
    checkInDate: {
      type: Date,
      required: true,
    },
    checkOutDate: {
      type: Date,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    guests: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
    paymentMethod:{
        type:String,
        required:true,
        default:"Pay At Hotel",
    },
    isPaid: {
type:Boolean, default:false
    }
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
