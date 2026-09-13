import { ChevronDown } from 'lucide-react'
import React, { useEffect } from 'react'
import { FaLocationCrosshairs, FaMapLocationDot, FaRupeeSign } from 'react-icons/fa6'
import Car from "../assets/car.png"
import Bike from "../assets/bike.png"
import Auto from "../assets/auto.png"


const LookingForDriver = ({ setVehicleFound, pickup, destination, fare, vehicleType, ride }) => {

  return (
    <div>
      <span onClick={() => {
        setVehicleFound(false)
      }} className='flex justify-center items-center text-2xl text-gray-600 cursor-pointer rounded-lg p-2'>
        <ChevronDown />
      </span>
      {/* <div className='w-full h-1 bg-black rounded-lg my-2'><div className=' h-full w-[40%]  bg-white rounded-lg'></div></div>
       */}

      <div className="w-full h-1 bg-linear-to-r from-blue-400 to-blue-900 rounded-lg my-2 overflow-hidden">
        <div className="h-full w-[40%] bg-linear-to-r from-blue-300 to-blue-500 rounded-lg animate-[slide_2s_ease-in-out_infinite]"></div>
      </div>

      <h3 className='text-2xl font-semibold mb-5'>Looking for a Driver</h3>
      <div className='flex flex-col w-full justify-between items-center '>
        <img className='h-60' src={Car} alt="vehicle" />
        <div className='w-full mt-5'>
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <FaLocationCrosshairs />
            <div>
              <h3 className='text-lg font-medium'>562/11-A</h3>
              <p className='text-sm -mt-1 text-gray-600'>{pickup}</p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <FaMapLocationDot />
            <div>
              <h3 className='text-lg font-medium'>562/11-A</h3>
              <p className='text-sm -mt-1 text-gray-600'>{destination}</p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3'>
            <FaRupeeSign />
            <div>
              <h3 className='text-lg font-medium'>₹{fare[vehicleType]}</h3>
              <p className='text-sm -mt-1 text-gray-600'>
                {ride?.paymentMethod === "cash"
                  ? "Cash"
                  : "Online"}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default LookingForDriver
