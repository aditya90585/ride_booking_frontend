import { ChevronDown } from 'lucide-react'
import React from 'react'
import { FaLocationCrosshairs, FaMapLocationDot, FaRupeeSign } from 'react-icons/fa6'

const FinishRide = ({ setFinishRidePanel, endRide ,ride}) => {

  return (
    <div>
      <span onClick={() => {
        setFinishRidePanel(false)
      }} className='flex justify-center items-center text-2xl text-gray-600 cursor-pointer rounded-lg p-2'>
        <ChevronDown />
      </span>
      <h3 className='text-2xl font-semibold mb-5'>Finish this Ride</h3>
      <div className='flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-4'>
        <div className='flex items-center gap-3 '>
          <img className='h-12 rounded-full object-cover w-12' src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg" alt="" />
          <h2 className='text-lg font-medium capitalize'>{ride?.user?.fullName?.firstName} {ride?.user?.fullName?.lastName}</h2>
        </div>
        <h5 className='text-lg font-semibold'>2.2 KM</h5>
      </div>

      <div className='flex flex-col w-full justify-between items-center '>
        <div className='w-full mt-5'>
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <FaLocationCrosshairs />
            <div>
              <h3 className='text-lg font-medium'>562/11-A</h3>
              <p className='text-sm -mt-1 text-gray-600'>{ride?.pickupLocation}</p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <FaMapLocationDot />
            <div>
              <h3 className='text-lg font-medium'>562/11-A</h3>
              <p className='text-sm -mt-1 text-gray-600'>{ride?.destination}</p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3'>
            <FaRupeeSign />
            <div>
              <h3 className='text-lg font-medium'>₹{ride?.fare}</h3>
              <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
            </div>
          </div>
        </div>
        <div className='flex justify-center items-center w-full gap-x-2'>
          <button onClick={() => {
            endRide()
          }} className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg'>Finish Ride</button>
        </div>

      </div>
    </div>
  )
}

export default FinishRide