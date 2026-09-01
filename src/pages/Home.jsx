import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ChevronDown } from 'lucide-react'
import React, { useRef, useState } from 'react'
import logoWithText from "../assets/logoWithText.png"

const Home = () => {
  const [panelOpen, setPanelOpen] = useState(false)
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)

  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: "70%"
      })
      gsap.to(panelCloseRef.current, {
        opacity: 1
      })
    } else {
      gsap.to(panelRef.current, {
        height: 0
      })
      gsap.to(panelCloseRef.current, {
        opacity: 0
      })
    }
  }, [panelOpen])
  return (
    <div className='h-screen w-screen overflow-hidden relative'>
      <div className='h-10 w-auto absolute top-4 left-4  drop-shadow-sm drop-shadow-amber-50'>
        <img src={logoWithText} className='h-full' alt="logo" />
      </div>
      <div className='h-full w-full'>
        <img className='h-full w-full object-cover' src="https://preview.redd.it/ubers-car-animations-look-3d-but-its-actually-a-smart-v0-xer1e5ww0wcf1.jpeg?auto=webp&s=b85125fb5b9abe3b6e8fa38c0d4e424ffe9d842d" alt="" />
      </div>
      <div className='h-screen w-full absolute top-0 flex flex-col justify-end'>
        <div className='h-[30%] bg-white p-6 flex flex-col justify-center relative'>

          <h4 className='text-2xl font-semibold flex relative'><span>Find a trip</span>
            <span ref={panelCloseRef} onClick={() => {
              setPanelOpen(false)
            }} className='absolute opacity-0 right-6 text-2xl cursor-pointer'>
              <ChevronDown />
            </span></h4>

          <form className='relative'>
            <div className="line absolute h-16 w-1 top-[50%] -translate-y-[30%] left-5 bg-gray-700 rounded-full"></div>
            <input onClick={() => setPanelOpen(true)} placeholder='Add a pick-up location' type="text" className='w-full bg-[#eee] px-12 py-2 text-lg rounded-lg mt-6' />
            <input onClick={() => setPanelOpen(true)} placeholder='Enter your destination' type="text" className='w-full bg-[#eee] px-12 py-2 text-lg rounded-lg mt-4' />
          </form>
        </div>
        <div ref={panelRef} className='h-0 bg-amber-400'></div>
      </div>
    </div>
  )
}

export default Home
