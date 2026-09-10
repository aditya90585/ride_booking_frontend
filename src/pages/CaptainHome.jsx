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

const CaptainHome = () => {
  const navigate = useNavigate()
  const [ridePopUpPanel, setRidePopUpPanel] = useState(false)
  const RidePopUpRef = useRef(null)

  const captainData = useSelector((state) => state.captain.captainData)
  const [ride, setRide] = useState({})

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
    try {
      const response = await axiosInstance.post("/ride/confirm-ride", {
        rideId: ride._id
      })
      console.log(response)
      navigate("/going-to-pickup",{ state: { ride:response.data } })
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
        "unable to confirm ride, please try again later"
      );
    }
  }

  return (
    <div className='h-screen'>
      <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
        <img className='w-16' src={logoWithText} alt="logo" />
        <Link to='/captain-home' className=' h-10 w-10 bg-white flex items-center justify-center rounded-full relative z-3'>
          <FaHome />
        </Link>
      </div>
      <div className='h-3/5'>
        {/* <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" /> */}
        {location && (
          <Map
            className="absolute z-2"
            latitude={location.latitude}
            longitude={location.longitude}
          />
        )}
      </div>
      <div className='h-2/5 p-6 relative z-3 bg-white'>
        <CaptainDetails />
      </div>
      <div ref={RidePopUpRef} className='fixed w-full z-10 bottom-0 translate-y-full  bg-white rounded-lg px-3 py-10 pt-12'>
        <RidePopUp
          ride={ride}
          setRidePopUpPanel={setRidePopUpPanel}
          confirmRide={confirmRide}
        />
      </div>
      {/* <div ref={ConfirmRidePopUpRef} className='fixed w-full h-screen z-10 bottom-0 translate-y-full  bg-white px-3 py-10 pt-12'>
        <ConfirmRidePopUp
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
          setRidePopUpPanel={setRidePopUpPanel}
          ride={ride}
        />
      </div> */}
    </div>
  )
}

export default CaptainHome
