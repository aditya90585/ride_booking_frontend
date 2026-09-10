import { ChevronDown } from 'lucide-react'
import React from 'react'
import { FaLocationCrosshairs, FaMapLocationDot, FaRupeeSign } from 'react-icons/fa6'
import Car from "../assets/car.png"

const WaitingForDriver = ({ setWaitingForDriver, ride }) => {
  return (
    <div>
      <span onClick={() => {
        setWaitingForDriver(false)
      }} className='flex justify-center items-center text-2xl text-gray-600 cursor-pointer rounded-lg p-2'>
        <ChevronDown />
      </span>
      <div className='flex items-center justify-between'>
        <img className='h-30' src={Car} alt="" />
        <div className='text-right'>
          <h2 className='text-lg font-medium capitalize'>{ride?.captain?.fullName?.firstName} {ride?.captain?.fullName?.lastName}</h2>
          <h4 className='text-xl font-semibold -mt-1 -mb-1'>{ride?.captain?.vehicle?.plate}</h4>
          <p className='text-sm text-gray-600'>{ride?.captain?.vehicle?.color} {ride?.captain?.vehicle?.vehicleType}</p>
          <h1 className='text-lg font-semibold'><span className='font-bold'>OTP</span>  :  {ride?.otp} </h1>
        </div>
      </div>
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

    </div>
  )
}

export default WaitingForDriver
