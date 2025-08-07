// hotelController.js
import { getAuth } from "@clerk/express";

import { syncUser } from "../utils/syncUser.js";
import Hotel from "../models/Hotel.js";

export const registerHotel = async (req, res) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await syncUser(userId);

    const { name, phone, address, city } = req.body;

    const newHotel = new Hotel({
      name,
      phone,
      address,
      city,
      owner: userId,
    });

    await newHotel.save();

    res.status(201).json({ message: "Hotel registered successfully" });
  } catch (error) {
    console.error("Hotel registration error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
