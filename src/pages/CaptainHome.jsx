import React, { useRef, useState } from 'react'
import logoWithText from "../assets/logoWithText.png"
import { Link } from 'react-router-dom'
import { FaHome } from 'react-icons/fa'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'

const CaptainHome = () => {
  const [ridePopUpPanel, setRidePopUpPanel] = useState(true)
  const RidePopUpRef = useRef(null)

 const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false)
  const ConfirmRidePopUpRef = useRef(null)

  useGSAP(function () {
    if (ridePopUpPanel) {
      gsap.to(RidePopUpRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(RidePopUpRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [ridePopUpPanel])

    useGSAP(function () {
    if (confirmRidePopUpPanel) {
      gsap.to(ConfirmRidePopUpRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(ConfirmRidePopUpRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [confirmRidePopUpPanel])
  return (
    <div className='h-screen'>
      <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
        <img className='w-16' src={logoWithText} alt="logo" />
        <Link to='/captain-home' className=' h-10 w-10 bg-white flex items-center justify-center rounded-full'>
          <FaHome />
        </Link>
      </div>
      <div className='h-3/5'>
        <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
      </div>
      <div className='h-2/5 p-6'>
        <CaptainDetails />
      </div>
      <div ref={RidePopUpRef} className='fixed w-full z-10 bottom-0 translate-y-full  bg-white rounded-lg px-3 py-10 pt-12'>
        <RidePopUp setRidePopUpPanel={setRidePopUpPanel} setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}  />
      </div>
      <div ref={ConfirmRidePopUpRef} className='fixed w-full h-screen z-10 bottom-0 translate-y-full  bg-white px-3 py-10 pt-12'>
        <ConfirmRidePopUp setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} setRidePopUpPanel={setRidePopUpPanel} />
      </div>
    </div>
  )
}

export default CaptainHome
