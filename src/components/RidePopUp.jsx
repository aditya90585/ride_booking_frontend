import { ChevronDown } from 'lucide-react'
import React from 'react'
import { FaLocationCrosshairs, FaMapLocationDot, FaRupeeSign } from 'react-icons/fa6'

const RidePopUp = ({ setRidePopUpPanel, setConfirmRidePopUpPanel }) => {
    return (
        <div>
            <span onClick={() => {
                setRidePopUpPanel(false)
            }} className='flex justify-center items-center text-2xl text-gray-600 cursor-pointer rounded-lg p-2'>
                <ChevronDown />
            </span>
            <h3 className='text-2xl font-semibold mb-5'>New Ride Available!</h3>
            <div className='flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-4'>
                <div className='flex items-center gap-3 '>
                    <img className='h-12 rounded-full object-cover w-12' src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg" alt="" />
                    <h2 className='text-lg font-medium'>test user</h2>
                </div>
                <h5 className='text-lg font-semibold'>2.2 KM</h5>
            </div>

            <div className='flex flex-col w-full justify-between items-center '>
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
                <div className='flex justify-center items-center w-full gap-x-2'>
                    <button onClick={() => {
                        setConfirmRidePopUpPanel(true)
                    }} className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg'>Accept</button>
                    <button onClick={() => {
                        setRidePopUpPanel(false)
                    }} className='w-full mt-5 bg-red-500 text-white font-semibold p-2 rounded-lg'>Ignore</button>
                </div>

            </div>
        </div>
    )
}

export default RidePopUp
