import { ChevronDown } from 'lucide-react'
import React from 'react'
import { FaLocationCrosshairs, FaMapLocationDot, FaRupeeSign } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axiosInstance from '../lib/axios'
import { toast } from 'react-toastify'

const ConfirmRidePopUp = ({ setRidePopUpPanel, setConfirmRidePopUpPanel, ride }) => {
    const navigate = useNavigate()
    const { register, handleSubmit, setFocus, formState: { errors } } = useForm()

    const onSubmit = async (data) => {
        try {
            const res = await axiosInstance.post("/ride/start-ride", {
                rideId: ride._id,
                otp: `${data.otp0}${data.otp1}${data.otp2}${data.otp3}`
            })
            if (res.status === 200) {
                toast.success("Ride started successfully!")
                setConfirmRidePopUpPanel(false)
                // setRidePopUpPanel(false)
                navigate("/captain-riding", { state: { ride: res.data } })
            }
        } catch (error) {
            console.error("Error starting ride:", error)
            toast.error("Failed to start ride. Please check the OTP and try again.")
        }
    }

    return (
        <div>
            <span onClick={() => {
                setConfirmRidePopUpPanel(false)
            }} className='flex justify-center items-center text-2xl text-gray-600 cursor-pointer rounded-lg p-2'>
                <ChevronDown />
            </span>
            <h3 className='text-2xl font-semibold mb-5'>Confirm this ride to Start</h3>
            <div className='flex items-center justify-between p-3 border-2 border-yellow-400 rounded-lg mt-4'>
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
                <form onSubmit={handleSubmit(onSubmit)} className='mt-6 w-full px-8'>
                    <h4 className='text-xl font-semibold mb-2'>Enter OTP</h4>
                    <div className='flex justify-between md:justify-center gap-3 mt-3 items-center'>
                        {[0, 1, 2, 3].map((index) => (
                            <input
                                key={index}
                                type='number'
                                inputMode='numeric'
                                maxLength={1}
                                className='bg-[#eee] text-center text-xl font-semibold rounded-lg aspect-square w-full h-auto md:w-20 md:h-20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                                {...register(`otp${index}`, {
                                    required: 'Enter all OTP digits',
                                    pattern: { value: /^[0-9]$/, message: 'OTP must contain only numbers' },
                                    onChange: (event) => {
                                        if (event.target.value && index < 3) setFocus(`otp${index + 1}`)
                                    },
                                    onKeyDown: (event) => {
                                        if (event.key === 'Backspace' && !event.target.value && index > 0) {
                                            setFocus(`otp${index - 1}`)
                                        }
                                    }
                                })}
                            />
                        ))}
                    </div>
                    {errors.otp0 && <p className='text-red-500 text-sm mt-2'>{errors.otp0.message}</p>}

                    <div className='flex justify-center items-center w-full gap-x-2'>
                        <button type='submit' className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg'>Confirm</button>
                        <button onClick={() => {
                            setConfirmRidePopUpPanel(false)
                            // setRidePopUpPanel(false)
                        }} className='w-full mt-5 bg-red-500 text-white font-semibold p-2 rounded-lg'>Cancel</button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default ConfirmRidePopUp
