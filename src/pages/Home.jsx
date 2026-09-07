import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ChevronDown, UserRound } from 'lucide-react'
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import logoWithText from "../assets/logoWithText.png"
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehiclePanel from '../components/VehiclePanel'
import ConfirmRide from '../components/ConfirmRide'
import LookingForDriver from '../components/LookingForDriver'
import WaitingForDriver from '../components/WaitingForDriver'
import axiosInstance from '../lib/axios'
import { toast } from 'react-toastify'
import { SocketContext } from '../context/SocketContext'
import { useSelector } from 'react-redux'

const Home = () => {
  const [panelOpen, setPanelOpen] = useState(false)
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)

  const vehiclePanelRef = useRef(null)
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false)

  const ConfirmRidePanelRef = useRef(null)
  const [confirmRidePanelOpen, setConfirmRidePanelOpen] = useState(false)

  const vehicleFoundRef = useRef(null)
  const [vehicleFound, setVehicleFound] = useState(false)

  const waitingForDriverRef = useRef(null)
  const [waitingForDriver, setWaitingForDriver] = useState(false)

  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [pickupSuggestions, setPickupSuggestions] = useState([])
  const [destinationSuggestions, setDestinationSuggestions] = useState([])
  const [activeField, setActiveField] = useState(null)
  const [fare, setFare] = useState({})
  const [vehicleType, setVehicleType] = useState(null)
  const userData = useSelector((state) => state.user.userData)

  const {socket} = useContext(SocketContext)

  useEffect(() => {
    socket.emit("join", { userId: userData._id, userType: "user" })
  }, [])



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

  useGSAP(() => {
    if (vehiclePanelOpen) {
      gsap.to(vehiclePanelRef.current, {
        translateY: 0
      })

    } else {
      gsap.to(vehiclePanelRef.current, {
        translateY: "100%"
      })

    }
  }, [vehiclePanelOpen])



  useGSAP(() => {
    if (confirmRidePanelOpen) {
      gsap.to(ConfirmRidePanelRef.current, {
        translateY: 0
      })

    } else {
      gsap.to(ConfirmRidePanelRef.current, {
        translateY: "100%"
      })

    }
  }, [confirmRidePanelOpen])

  useGSAP(function () {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [vehicleFound])


  useGSAP(function () {
    if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [waitingForDriver])

  // function debounce(func, delay) {
  //   let timeoutId;
  //   return (...args) => {
  //     clearTimeout(timeoutId);
  //     timeoutId = setTimeout(() => func(...args), delay);
  //   };
  // };

  // const handlePickupChange = async (e) => {
  //   setPickup(e.target.value)
  //   try {
  //     if (e.target.value.length < 3) return
  //     const response = await axiosInstance.get(`/maps/get-suggestions`, {
  //       params: { input: e.target.value },
  //     })
  //     console.log(response.data)
  //     setPickupSuggestions(response.data.suggestion)
  //   } catch(err) {
  //     toast.error(
  //       err.response?.data?.message ||
  //       "unable to fetch suggestions, please try again later"
  //     );
  //   }
  // }

  // const handleDestinationChange = async (e) => {
  //   setDestination(e.target.value)
  //   try {
  //     if (e.target.value.length < 3) return
  //     const response = await axiosInstance.get(`/maps/get-suggestions`, {
  //       params: { input: e.target.value },
  //     })
  //     console.log(response.data)
  //     setDestinationSuggestions(response.data.suggestion)
  //   } catch(err) {
  //     toast.error(
  //       err.response?.data?.message ||
  //       "unable to fetch suggestions, please try again later"
  //     );
  //   }
  // }



  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const fetchSuggestions = async (input, type) => {
    if (input.length < 3) {
      if (type === "pickup") setPickupSuggestions([]);
      else setDestinationSuggestions([]);
      return;
    }

    try {
      const response = await axiosInstance.get("/maps/get-suggestions", {
        params: { input },
      });

      if (type === "pickup") {
        setPickupSuggestions(response.data.suggestion);
      } else {
        setDestinationSuggestions(response.data.suggestion);
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
        "Unable to fetch suggestions, please try again later"
      );
    }
  };

  const debouncedFetchSuggestions = useCallback(
    debounce(fetchSuggestions, 500),
    []
  );

  const handlePickupChange = (e) => {
    const value = e.target.value;
    setPickup(value);
    debouncedFetchSuggestions(value, "pickup");
  };

  const handleDestinationChange = (e) => {
    const value = e.target.value;
    setDestination(value);
    debouncedFetchSuggestions(value, "destination");
  };

  const findTrip = async () => {
    setVehiclePanelOpen(true)
    setPanelOpen(false)
    try {
      const res = await axiosInstance.get("/ride/get-fare", {
        params: {
          origin: pickup,
          destination
        }
      })
      setFare(res.data.fare)
    } catch (error) {
      toast.error(
        err.response?.data?.message ||
        "unable to fetch fare, please try again later"
      );
    }
  }

  const createRide = async () => {
    try {
      const response = await axiosInstance.post("/ride/create", {
        pickupLocation: pickup,
        destination,
        vehicleType
      })

    } catch (error) {
      toast.error(
        err.response?.data?.message ||
        "unable to create ride, please try again later"
      );
    }
  }


  return (
    <div className='h-screen w-screen overflow-hidden relative'>
      <div className='h-10 w-auto absolute top-4 left-4  drop-shadow-sm drop-shadow-amber-50'>
        <img src={logoWithText} className='h-full' alt="logo" />
      </div>
      <div className='h-screen w-full'>
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
            <div className="line absolute h-16 w-1 top-[50%] -translate-y-[30%] left-5 bg-gray-500 rounded-full"></div>
            <input onClick={() => {
              setPanelOpen(true)
              setActiveField("pickup")
            }} value={pickup} onChange={(e) => handlePickupChange(e)}
              placeholder='Add a pick-up location'
              type="text"
              className='w-full bg-[#eee] px-12 py-2 text-lg rounded-lg mt-6' />


            <input onClick={() => {
              setPanelOpen(true)
              setActiveField("destination")
            }} value={destination}
              onChange={(e) => handleDestinationChange(e)}
              placeholder='Enter your destination'
              type="text"
              className='w-full bg-[#eee] px-12 py-2 text-lg rounded-lg mt-4' />

          </form>
        </div>


        <div ref={panelRef} className='h-0 bg-white px-6'>
          <LocationSearchPanel
            suggestions={activeField == "pickup" ? pickupSuggestions : destinationSuggestions}
            setPanelOpen={setPanelOpen}
            setVehiclePanelOpen={setVehiclePanelOpen}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
            findTrip={findTrip}
          />
        </div>


        <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-6 py-2 pt-6' >
          <VehiclePanel
            setVehiclePanelOpen={setVehiclePanelOpen}
            setConfirmRidePanelOpen={setConfirmRidePanelOpen}
            fare={fare}
            setVehicleType={setVehicleType}
          />
        </div>


        <div ref={ConfirmRidePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-6 py-2 pt-6' >
          <ConfirmRide
            setConfirmRidePanelOpen={setConfirmRidePanelOpen}
            setVehicleFound={setVehicleFound}
            pickup={pickup}
            destination={destination}
            fare={fare}
            vehicleType={vehicleType}
            createRide={createRide}
          />
        </div>


        <div ref={vehicleFoundRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-6 py-2 pt-6' >
          <LookingForDriver
            setVehicleFound={setVehicleFound}
            pickup={pickup}
            destination={destination}
            fare={fare}
            vehicleType={vehicleType}
          />
        </div>


        <div ref={waitingForDriverRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-6 py-2 pt-6' >
          <WaitingForDriver setWaitingForDriver={setWaitingForDriver} />
        </div>
      </div>
    </div>
  )
}

export default Home
