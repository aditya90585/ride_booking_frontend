import { Banknote, ChevronDown, CreditCard } from 'lucide-react'
import React from 'react'
import Car from "../assets/car.png"
import Bike from "../assets/bike.png"
import Auto from "../assets/auto.png"
import { FaLocationCrosshairs } from "react-icons/fa6";
import { FaMapLocationDot } from "react-icons/fa6";

import { FaRupeeSign } from "react-icons/fa";


const Confirmride = ({ setConfirmRidePanelOpen, setVehicleFound, pickup, destination, fare, vehicleType, paymentMethod, setPaymentMethod, createRide }) => {
    return (
        <div>
            <span onClick={() => {
                setConfirmRidePanelOpen(false)
            }} className='flex justify-center items-center text-2xl text-gray-600 cursor-pointer rounded-lg p-2'>
                <ChevronDown />
            </span>
            <h3 className='text-2xl font-semibold mb-5'>Confirm Your Ride</h3>
            <div className='flex flex-col w-full justify-between items-center '>
                <img className='h-60' src={vehicleType === "car" ? Car : vehicleType === "moto" ? Bike : Auto} alt="vehicle" />
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
                            <p className='text-sm -mt-1 text-gray-600'>{paymentMethod === "cash" ? "Pay with cash" : "Pay online"}</p>
                        </div>
                    </div>
                </div>
                <div className='w-full mt-4'>
                    <p className='text-sm font-semibold text-gray-700 mb-2'>Payment method</p>
                    <div className='grid grid-cols-2 gap-3'>
                        <button
                            type='button'
                            onClick={() => setPaymentMethod("cash")}
                            className={`flex items-center justify-center gap-2 rounded-xl border-2 p-3 font-semibold transition-colors ${paymentMethod === "cash" ? "border-green-600 bg-green-50 text-green-700" : "border-gray-200 text-gray-500"}`}
                        >
                            <Banknote size={20} />
                            Cash
                        </button>
                        <button
                            type='button'
                            onClick={() => setPaymentMethod("online")}
                            className={`flex items-center justify-center gap-2 rounded-xl border-2 p-3 font-semibold transition-colors ${paymentMethod === "online" ? "border-green-600 bg-green-50 text-green-700" : "border-gray-200 text-gray-500"}`}
                        >
                            <CreditCard size={20} />
                            Online
                        </button>
                    </div>
                </div>
                <button onClick={() => {
                    setVehicleFound(true)
                    setConfirmRidePanelOpen(false)
                    createRide(paymentMethod)
                }} className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg'>Confirm</button>
            </div>
        </div>
    )
}

export default Confirmride
