import React, { useContext, useEffect, useRef, useState } from 'react'
import logoWithText from "../assets/logoWithText.png"
import { Link, useNavigate } from 'react-router-dom'
import { FaHome } from 'react-icons/fa'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

import { useSelector } from 'react-redux'
import { SocketContext } from '../context/SocketContext'
import axiosInstance from '../lib/axios'
import { toast } from 'react-toastify'
import Map from '../components/Map'
import { SiOpenstreetmap } from 'react-icons/si'

const CaptainHome = () => {
  const navigate = useNavigate()
  const [ridePopUpPanel, setRidePopUpPanel] = useState(false)
  const RidePopUpRef = useRef(null)

  const captainData = useSelector((state) => state.captain.captainData)
  const [ride, setRide] = useState({})
  const [confirmRideLoading, setConfirmRideLoading] = useState(false)

  const { socket } = useContext(SocketContext)

  const [location, setLocation] = useState(null);

  useEffect(() => {
    socket.emit("join", { userId: captainData._id, userType: "captain" })

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          socket.emit('update-location-captain', {
            captainId: captainData._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude
            }
          })
        })
      }
    }

    const locationInterval = setInterval(updateLocation, 10000)
    updateLocation()
  }, [])

  useEffect(() => {
    socket.on("new-ride", (data) => {
      setRide(data)
      setRidePopUpPanel(true)
    })

    return () => {
      socket.off("new-ride")
    }
  }, [])


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



  const confirmRide = async () => {
    if (confirmRideLoading) return
    try {
      setConfirmRideLoading(true)
      const response = await axiosInstance.post("/ride/confirm-ride", {
        rideId: ride._id
      })
      console.log(response)
      navigate("/going-to-pickup", { state: { ride: response.data } })
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
        "unable to confirm ride, please try again later"
      );
    }
    finally {
      setConfirmRideLoading(false)
    }
  }

  return (
    <div className='h-dvh relative flex flex-col justify-between items-center'>
      <div className='absolute p-6 top-0 flex items-center justify-between w-screen'>
        <img className='w-16' src={logoWithText} alt="logo" />
        <Link to='/captain-home' className=' h-10 w-10 bg-white flex items-center justify-center rounded-full relative z-3'>
          <FaHome />
        </Link>
      </div>
      <div className='h-full w-full'>
        {/* <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" /> */}
        {location ? (
          <Map
            className="absolute z-2"
            latitude={location.latitude}
            longitude={location.longitude}
          />
        ) : <div className='relative h-full  w-full'>
          <img className='h-full w-full object-cover' src="https://preview.redd.it/ubers-car-animations-look-3d-but-its-actually-a-smart-v0-xer1e5ww0wcf1.jpeg?auto=webp&s=b85125fb5b9abe3b6e8fa38c0d4e424ffe9d842d" alt="" />
          <div className='absolute inset-0 bg-gray-700 flex justify-center items-center opacity-30'>
            < SiOpenstreetmap className='absolute top-40 size-20 text-gray-100 animate-pulse' />
          </div>
        </div>
        }
      </div>
      <div className='h-fit w-full absolute bottom-0 p-6 relative z-3 bg-white'>
        <CaptainDetails />
      </div>
      <div ref={RidePopUpRef} className='fixed w-full z-10 bottom-0 translate-y-full  bg-white rounded-lg px-3 py-10 pt-12'>
        <RidePopUp
          ride={ride}
          setRidePopUpPanel={setRidePopUpPanel}
          confirmRide={confirmRide}
          confirmRideLoading={confirmRideLoading}
        />
      </div>

    </div>
  )
}

export default CaptainHome
