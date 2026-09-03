import { Locate } from 'lucide-react'
import React from 'react'
import { MdLocationCity, MdLocationOn } from 'react-icons/md'

const LocationSearchPanel = ({ setVehiclePanelOpen, setPanelOpen }) => {
  const locations = [
    "24 house,12 street,Meerut,Uttar pradesh",
    "25 house,12 street,Meerut,Uttar pradesh",
    "26 house,12 street,Meerut,Uttar pradesh"
  ]
  return (
    <div className='flex flex-col gap-y-8 h-full w-full'>
      {locations.map((elem,i) => (
        <div key={i} onClick={() => {
          setVehiclePanelOpen(true)
          setPanelOpen(false)
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
