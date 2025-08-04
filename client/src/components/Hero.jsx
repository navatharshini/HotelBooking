import React from 'react'
import {assets, cities} from '../assets/assets'

const Hero = () => {
  return (
    <div className='relative flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-white h-screen'>
      {/* Background image with overlay */}
      <div className='absolute inset-0 z-0'>
        <div className='absolute inset-0 bg-[url("/src/assets/H.jpeg")] bg-no-repeat bg-cover bg-center'></div>
        <div className='absolute inset-0 bg-black/40'></div>
      </div>

      {/* Content - positioned above overlay */}
      <div className='relative z-10'>
      <p className='bg-blue-300 px-3.5 py-1 rounded-full mt-20 font-medium inline-block'>
  The Ultimate Hotel Experience
</p>
        <h1 className='font-playfair text-2xl md:text-5xl md:text-[56px] md:leading-[56px] font-bold md:font-extrabold max-w-xl mt-4'>Discover your perfect Gateway Destination</h1>
        <p className='max-w-130 mt-2 text-sm md:text-base'>Escape to serene beaches, vibrant cities, or tranquil retreats for unforgettable adventures and relaxation</p>
        
        <form className='mt-8 bg-white text-gray-500 rounded-lg px-6 py-4 flex flex-col md:flex-row max-md:items-start gap-4 max-md:mx-auto'>
          <div>
            <div className='flex items-center gap-2'>
              <img src={assets.calenderIcon} alt="calender" className='h-4'/>
              <label htmlFor="destinationInput">Destination</label>
            </div>
            <input 
              list='destinations' 
              id="destinationInput" 
              type="text" 
              className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" 
              placeholder="Type here" 
              required 
            />
            <datalist id='destinations'>
              {cities.map((city,index) => (
                <option value={city} key={index}/> 
              ))}
            </datalist>
          </div>

          <div>
            <div className='flex items-center gap-2'>
              <img src={assets.calenderIcon} alt="calender" className='h-4'/>
              <label htmlFor="checkIn">Check in</label>
            </div>
            <input 
              id="checkIn" 
              type="date" 
              className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" 
            />
          </div>

          <div>
            <div className='flex items-center gap-2'>
              <img src={assets.calenderIcon} alt="calender" className='h-4'/>
              <label htmlFor="checkOut">Check out</label>
            </div>
            <input 
              id="checkOut" 
              type="date" 
              className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" 
            />
          </div>

          <div className='flex md:flex-col max-md:gap-2 max-md:items-center'>
            <label htmlFor="guests">Guests</label>
            <input 
              min={1} 
              max={4} 
              id="guests" 
              type="number" 
              className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none max-w-16" 
              placeholder="0" 
            />
          </div>

          <button className='flex items-center justify-center gap-1 rounded-md bg-black py-3 px-4 text-white my-auto cursor-pointer max-md:w-full max-md:py-1 hover:bg-gray-800 transition-colors'>
            <img src={assets.searchIcon} alt="search" className='h-7'/>
            <span>Search</span>
          </button>
        </form>
      </div>
    </div>
  )
}

export default Hero