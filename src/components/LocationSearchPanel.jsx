import { CarTaxiFront } from 'lucide-react'
import React from 'react'
import { FaCar } from 'react-icons/fa'
import { MdLocationCity, MdLocationOn } from 'react-icons/md'

const LocationSearchPanel = ({ setVehiclePanelOpen, setPanelOpen, suggestions, setPickup, setDestination, activeField ,findTrip}) => {

  return (
    <div className='flex flex-col gap-y-8 h-full w-full'>
      <button onClick={() => {
        setVehiclePanelOpen(true)
        setPanelOpen(false)
        findTrip()
      }} className='bg-black text-white w-full rounded-lg flex justify-center items-center gap-x-2 p-2'><CarTaxiFront /> Find Trip</button>
      {suggestions.map((elem, i) => (
        <div key={i} onClick={() => {
          if (activeField == "pickup") {
            setPickup(elem)
          } else {
            setDestination(elem)
          }
        }
        } className='flex gap-2 items-center justify-start'>
          <h2 className='bg-[#eee] rounded-full p-2'><MdLocationOn /></h2>
          <h4>{elem}</h4>
        </div>
      ))}


    </div>
  )
}

export default LocationSearchPanel
