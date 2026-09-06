import { ChevronDown } from 'lucide-react'
import React from 'react'
import Car from "../assets/car.png"
import Bike from "../assets/bike.png"
import Auto from "../assets/auto.png"
import { FaLocationCrosshairs } from "react-icons/fa6";
import { FaMapLocationDot } from "react-icons/fa6";

import { FaRupeeSign } from "react-icons/fa";


const Confirmride = ({ setConfirmRidePanelOpen, setVehicleFound,pickup,destination,fare,vehicleType ,createRide}) => {
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
                            <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                        </div>
                    </div>
                </div>
                <button onClick={() => {
                    setVehicleFound(true)
                    setConfirmRidePanelOpen(false)
                    createRide()
                }} className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg'>Confirm</button>
            </div>
        </div>
    )
}

export default Confirmride
