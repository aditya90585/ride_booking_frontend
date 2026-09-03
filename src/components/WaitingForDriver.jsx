import { ChevronDown } from 'lucide-react'
import React from 'react'
import { FaLocationCrosshairs, FaMapLocationDot, FaRupeeSign } from 'react-icons/fa6'
import Car from "../assets/car.png"

const WaitingForDriver = ({ setWaitingForDriver }) => {
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
          <h2 className='text-lg font-medium capitalize'>rider 007</h2>
          <h4 className='text-xl font-semibold -mt-1 -mb-1'>UP15 R45679</h4>
          <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
          <h1 className='text-lg font-semibold'>  4356 </h1>
        </div>
      </div>
      <div className='w-full mt-5'>
        <div className='flex items-center gap-5 p-3 border-b-2'>
          <FaLocationCrosshairs />
          <div>
            <h3 className='text-lg font-medium'>562/11-A</h3>
            <p className='text-sm -mt-1 text-gray-600'>Ganga Nagar,Meerut,Uttar Pradesh</p>
          </div>
        </div>
        <div className='flex items-center gap-5 p-3 border-b-2'>
          <FaMapLocationDot />
          <div>
            <h3 className='text-lg font-medium'>562/11-A</h3>
            <p className='text-sm -mt-1 text-gray-600'>Shiv Chowk , Muzaffarnagar, Uttar Pradesh</p>
          </div>
        </div>
        <div className='flex items-center gap-5 p-3'>
          <FaRupeeSign />
          <div>
            <h3 className='text-lg font-medium'>₹120</h3>
            <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
          </div>
        </div>

      </div>

    </div>
  )
}

export default WaitingForDriver
