import React, { useState } from 'react';
import Title from '../components/Title.jsx';
import { assets, userBookingsDummyData } from '../assets/assets.js'; // Ensure the data is correctly imported

const Bookings = () => {
  const [bookings, setBookings] = useState(userBookingsDummyData);

  return (
    <div className="py-28 md:pb-35 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32">
      <Title
        title="My Bookings"
        subTitle="Lorem, ipsum dolor sit amet consectetur adipisicing elit. A sint inventore iusto! Optio quidem sunt perspiciatis velit. Neque, sapiente debitis."
        align="left"
      />

      <div className="max-w-6xl mt-8 w-full text-gray-800">
        <div className="hidden md:grid md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 font-medium text-base py-3">
          <div className="w-1/3">Hotels</div>
          <div className="w-1/3">Date & Timing</div>
          <div className="w-1/3">Payment</div>
        </div>

        {bookings.map((booking) => (
  <div key={booking._id} className="flex flex-col md:flex-row border-b py-4 space-y-4 md:space-y-0 md:space-x-8">
    {/* Hotel Details */}
    <div className="flex flex-col md:flex-row items-start gap-4 md:w-1/2">
      <img
        src={booking.room.images[0]}
        alt="hotel-img"
        className="w-full md:w-44 h-32 md:h-44 object-cover rounded-lg shadow-lg"
      />
      <div className="flex flex-col gap-2">
        <p className="font-playfair text-2xl font-semibold">{booking.hotel.name}
          <span className="font-inter text-sm text-gray-500"> ({booking.room.roomType})</span>
        </p>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <img src={assets.locationIcon} alt="location-icon" className="w-4 h-4" />
          <span>{booking.hotel.address}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <img src={assets.guestsIcon} alt="guestsIcon" className="w-4 h-4" />
          <span>Guests: {booking.guests}</span>
        </div>
        <p className="text-lg font-medium text-gray-800">Total: ${booking.totalPrice}</p>
      </div>
    </div>

    {/* Date & Time */}
    <div className="flex flex-col md:flex-row gap-8 md:gap-16 md:w-1/2">
      <div>
        <p className="font-medium text-gray-700">Check-In:</p>
        <p className="text-sm text-gray-500">
          {new Date(booking.checkInDate).toDateString()}
        </p>
      </div>
      <div>
        <p className="font-medium text-gray-700">Check-Out:</p>
        <p className="text-sm text-gray-500">
          {new Date(booking.checkOutDate).toDateString()}
        </p>
      </div>
    </div>

    {/* Payment status */}
    <div className="flex flex-col items-start justify-center pt-3">
      <div className='flex items-center gap-2'>
<div className={`h-3 w-3 rounded-full ${booking.isPaid ? 'bg-green-500' :'bg-red-500'} `}></div>
     <p className={`text-sm ${booking.isPaid ? 'text-green-500' :'text-red-500'} `} >
      {booking.isPaid ? "Paid" :"Pending"}
     </p>
      </div>

      {!booking.isPaid &&(
       <button  className='w-20 px-2 py-1.5 mt-4 text-xs border border-gray-400 rounded-full hover:bg-gray-40 transition-all cursor-pointer'>
        Pay Now
       </button> 
      )}
    </div>
  </div>
))}

      </div>
    </div>
  );
};

export default Bookings;
