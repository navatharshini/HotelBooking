import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home"; // Import Home component
import Footer from "./components/Footer";
import AllRooms from "./pages/AllRooms";
import RoomDetails from "./pages/RoomDetails";
import Bookings from "./pages/Bookings";
import HotelReg from "./components/HotelReg";
import Layout from "./pages/hotelOwner/layout";
import AddRoom from "./pages/hotelOwner/AddRoom";
import ListRoom from "./pages/hotelOwner/ListRoom";
import Dashboard from "./pages/hotelOwner/Dashboard";

const App = () => {
  const { pathname } = useLocation(); // Destructure pathname from location object
  const isOwnerPath = pathname.includes("owner");

  return (
    <div>
      {/* Conditionally render Navbar based on path */}
      {!isOwnerPath && <Navbar />}
      {false && <HotelReg />}

      <div className="min-h-[70vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<AllRooms />} />
          <Route path="/rooms/:id" element={<RoomDetails />} />
          <Route path="/my-bookings" element={<Bookings />} />
          <Route path="/owner" element={<Layout />}>
            <Route index element={<Dashboard/>} />
            <Route path="add-room" element={<AddRoom/>} />
            <Route path="list-room" element={<ListRoom/>} />

          </Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
