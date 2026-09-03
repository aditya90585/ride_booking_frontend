import React from 'react'
import logoWithText from "../assets/logoWithText.png"
import Car from "../assets/car.png"
import { FaLocationCrosshairs, FaMapLocationDot, FaRupeeSign } from 'react-icons/fa6'

const Riding = () => {
    return (
        <div className='h-screen w-screen overflow-hidden relative'>
            <div className='h-10 w-auto absolute top-4 left-4  drop-shadow-sm drop-shadow-amber-50'>
                <img src={logoWithText} className='h-full' alt="logo" />
            </div>

            <div className='h-1/2 w-full'>
                <img className='h-full w-full object-cover' src="https://preview.redd.it/ubers-car-animations-look-3d-but-its-actually-a-smart-v0-xer1e5ww0wcf1.jpeg?auto=webp&s=b85125fb5b9abe3b6e8fa38c0d4e424ffe9d842d" alt="" />
            </div>
            <div className='h-1/2 p-4'>
                <div className='flex items-center justify-between'>
                    <img className='h-30' src={Car} alt="" />
                    <div className='text-right'>
                        <h2 className='text-lg font-medium capitalize'>rider 007</h2>
                        <h4 className='text-xl font-semibold -mt-1 -mb-1'>UP15 R45679</h4>
                        <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
                    </div>
                </div>

                <div className='w-full mt-5'>
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
                <button className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg'>Make a Payment</button>
            </div>
        </div>
    )
}

export default Riding
