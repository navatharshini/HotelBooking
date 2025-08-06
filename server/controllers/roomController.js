import Hotel from "../models/Hotel.js";
import { v2 as cloudinary } from "cloudinary";
import Room from "../models/Room.js";
import Booking from "../models/booking.js";

//API to create a new room for a hotel

export const createRoom = async (req, res) => {
  try {
    const { roomType, pricePerNight, amenities } = req.body;
    const hotel = await Hotel.findOne({ owner: req.auth.userId });

    if (!hotel) {
      return res.json({ success: false, message: "No Hotel Found" });

      //upload images to cloudinary
      const uploadImages = req.files.map(async (file) => {
        const response = await cloudinary.uploader.upload(file.path);
        return response.secure_url;
      });

      // wait for all uploads to complete
      const images = await Promise.all(uploadImages);

      await Room.create({
        hotel: hotel._id,
        roomType,
        pricePerNight: +pricePerNight, //convert string to num use +
        amenities: JSON.parse(amenities),
        images,
      });
      res.json({ success: true, mesage: "room created sucessfully" });
    }
  } catch (error) {
    res.json({ success: false, mesage: error.mesage });
  }
};

//API to get all rooms

export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find({ isAvailable: true })
      .populate({
        path: "hotel",
        populate: {
          path: "owner",
          select: "image",
        },
      })
      .sort({ createdAt: -1 });
    res.json({ success: true, rooms });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//API to get all rooms  for a specific hotel

export const getOwnerRooms = async (req, res) => {



try {
  const hotelData = await Hotel({ owner: req.auth.userId });
  const rooms = await Room.find({ hotel: hotelData._id.toString() }).populate(
    "hotel"
  );
  res.json({ success: true, rooms });
} catch (error) {
  res.json({ success: false, message: error.message });
}};

//API to toggle availability of a room

export const toggleRoomAvailability = async (req, res) => {
  try {
    const { roomId } = req.body;
    const roomData = await Room.findById(roomId);
    roomData.isAvailable = !roomData.isAvailable;
    await roomData.save();
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//API to get all booking for a user
//GET /api/booking/user

export const getUserBookings = async (req, res) => {
  try {
    const user = req.user._id;
    const booking = await Booking.find({ user })
      .populate("room hotel")
      .sort({ createdAt: -1 });
    res.json({ success: true, message: booking });
  } catch (error) {
    res.json({ success: false, message: "Failed to fetch bookings" });
  }
};

export const getHotelBookings = async (req, res) => {
  try {
    const hotel = await Hotel.findOne({ owner: req.auth.userId });
    if (!hotel) {
      return res.json({ success: false, message: "No hotel found" });
    }
    const bookings = await Booking.find({ hotel: hotel._id })
      .populate("room hotel user")
      .sort({ createdAt: -1 });
    //Total bookings

    const totalBookings = bookings.length;
    const totalRevenue = bookings.reduce(
      (acc, booking) => acc + booking.totalPrice,
      0
    );
    res.json({
      success: true,
      dashboardData: { totalBookings, totalRevenue, bookings },
    });
  } catch (error) {
    res.json({ success: false, message: "failed to fetch bookings" });
  }
};
