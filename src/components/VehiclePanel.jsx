import { ChevronDown, UserRound } from 'lucide-react'
import React from 'react'
import Car from "../assets/car.png"
import Bike from "../assets/bike.png"
import Auto from "../assets/auto.png"


const VehiclePanel = ({ setVehiclePanelOpen, setConfirmRidePanelOpen }) => {
    return (
        <div>
            <span onClick={() => {
                setVehiclePanelOpen(false)
            }} className='flex justify-center items-center text-2xl text-gray-600 cursor-pointer rounded-lg p-2'>
                <ChevronDown />
            </span>
            <h3 className='text-2xl font-semibold mb-5'>Choose a Vehicle
            </h3>
            <div
                onClick={() => {
                    setConfirmRidePanelOpen(true)
                    // setVehiclePanelOpen(false)
                }}
                className='flex border-2 active:border-black  mb-2 rounded-xl w-full p-3  items-center justify-between'>
                <img className='h-10 object-contain' src={Car} alt="car" />
                <div className='ml-2 w-1/2'>
                    <h4 className='font-medium text-base flex'>UberGo <span className='flex justify-center items-center'><UserRound className='h-4' />4</span></h4>
                    <h5 className='font-medium text-sm'>2 mins away </h5>
                    <p className='font-normal text-xs text-gray-600'>Affordable, compact rides</p>
                </div>
                <h2 className='text-lg font-semibold'>₹190</h2>
            </div>
            <div
                onClick={() => {
                    setConfirmRidePanelOpen(true)
                    // setVehiclePanelOpen(false)
                }}
                className='flex border-2 active:border-black mb-2 rounded-xl w-full p-3  items-center justify-between'>
                <img className='h-10' src={Bike} alt="" />
                <div className='-ml-2 w-1/2'>
                    <h4 className='font-medium text-base flex'>Moto <span className='flex justify-center items-center'><UserRound className='h-4' />1</span></h4>
                    <h5 className='font-medium text-sm'>3 mins away </h5>
                    <p className='font-normal text-xs text-gray-600'>Affordable motorcycle rides</p>
                </div>
                <h2 className='text-lg font-semibold'>₹80</h2>
            </div>
            <div
                onClick={() => {
                    setConfirmRidePanelOpen(true)
                    // setVehiclePanelOpen(false)
                }}
                className='flex border-2 active:border-black mb-2 rounded-xl w-full p-3  items-center justify-between'>
                <img className='h-10' src={Auto} alt="" />
                <div className='ml-2 w-1/2'>
                    <h4 className='font-medium text-base flex'>UberAuto <span className='flex justify-center items-center'><UserRound className='h-4' />3</span></h4>
                    <h5 className='font-medium text-sm'>3 mins away </h5>
                    <p className='font-normal text-xs text-gray-600'>Affordable Auto rides</p>
                </div>
                <h2 className='text-lg font-semibold'>₹120</h2>
            </div>
        </div>
    )
}

export default VehiclePanel
