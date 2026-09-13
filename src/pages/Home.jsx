import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ChevronDown, MapPin, UserRound } from 'lucide-react'
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import logoWithText from "../assets/logoWithText.png"
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehiclePanel from '../components/VehiclePanel'
import ConfirmRide from '../components/ConfirmRide'
import LookingForDriver from '../components/LookingForDriver'

import { SiOpenstreetmap } from "react-icons/si";
import { RiLoader2Line } from "react-icons/ri";

import axiosInstance from '../lib/axios'
import { toast } from 'react-toastify'
import { SocketContext } from '../context/SocketContext'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Map from '../components/Map'

const Home = () => {
  const navigate = useNavigate()
  const [panelOpen, setPanelOpen] = useState(false)
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)

  const vehiclePanelRef = useRef(null)
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false)

  const ConfirmRidePanelRef = useRef(null)
  const [confirmRidePanelOpen, setConfirmRidePanelOpen] = useState(false)

  const vehicleFoundRef = useRef(null)
  const [vehicleFound, setVehicleFound] = useState(false)


  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [pickupSuggestions, setPickupSuggestions] = useState([])
  const [destinationSuggestions, setDestinationSuggestions] = useState([])
  const [activeField, setActiveField] = useState(null)
  const [fare, setFare] = useState({})
  const [vehicleType, setVehicleType] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState("cash")
  const userData = useSelector((state) => state.user.userData)
  const [ride, setRide] = useState({})

  const [location, setLocation] = useState(null);

  const [isPickLoading, setIsPickLoading] = useState(false)
  const [isDestinationLoading, setIsDestinationLoading] = useState(false)
  const [isCurrentLocationLoading, setIsCurrentLocationLoading] = useState(false)
  const [isFareLoading, setIsFareLoading] = useState(false)
  const [isCreatingRide, setIsCreatingRide] = useState(false)

  const { socket } = useContext(SocketContext)

  useEffect(() => {
    socket.emit("join", { userId: userData._id, userType: "user" })
  }, [])

  useEffect(() => {
    socket.on("ride-confirmed", (data) => {
      setRide(data)
      setVehicleFound(false)
      navigate("/waiting-for-driver", { state: { ride: data } })
    })

    return () => {
      socket.off("ride-confirmed")
    }
  }, [])

  useEffect(() => {
    socket.on("ride-started", (data) => {
      navigate("/riding", { state: { ride: data } })
    })

    return () => {
      socket.off("ride-started")
    }
  }, [])



  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      (error) => {
        console.error(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  }, []);

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
        translateY: 0
      })
    } else {
      gsap.to(vehicleFoundRef.current, {
        translateY: "100%"
      })
    }
  }, [vehicleFound])


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

    if (type == "pickup" && isPickLoading) {
      return
    } else if (type == "destination" && isDestinationLoading) {
      return
    }

    if (type == "pickup") {
      setIsPickLoading(true)
    } else if (type == "destination") {
      setIsDestinationLoading(true)
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
    finally {

      if (type == "pickup") {
        setIsPickLoading(false)
      } else if (type == "destination") {
        setIsDestinationLoading(false)
      }
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
    if (isFareLoading) return
    try {
      setIsFareLoading(true)
      const res = await axiosInstance.get("/ride/get-fare", {
        params: {
          origin: pickup,
          destination
        }
      })
      setFare(res.data.fare)
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
        "unable to fetch fare, please try again later"
      );
    } finally {
      setIsFareLoading(false)
    }
  }

  const createRide = async () => {
    if (isCreatingRide) return
    try {
      setIsCreatingRide(true)
      const response = await axiosInstance.post("/ride/create", {
        pickupLocation: pickup,
        destination,
        vehicleType,
        paymentMethod
      })

      if (response.status == 201) {
        setRide(response.data.ride)
        setVehicleFound(true)
        setConfirmRidePanelOpen(false)
      }

    } catch (err) {
      toast.error(
        err.response?.data?.message ||
        "unable to create ride, please try again later"
      );
    }
    finally {
      setIsCreatingRide(false)
    }
  }

  const handleCurrentLocation = () => {
    if (isCurrentLocationLoading) return
    setIsCurrentLocationLoading(true)
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        setLocation({
          latitude,
          longitude
        });

        try {

          const response = await axiosInstance.get("/maps/reverse-geocode", {
            params: {
              lat: latitude,
              lng: longitude
            }
          });

          setPickup(response.data.address);
          setPickupSuggestions([]);
        } catch (error) {
          console.error("Reverse geocoding failed:", error);
          toast.error("Unable to get your current address.");
        }
        finally {
          setIsCurrentLocationLoading(false)
        }
      },
      (error) => {
        console.error("Location error:", error);

        if (error.code === error.PERMISSION_DENIED) {
          toast.error("Please allow location access in your browser.");
        } else if (error.code === error.TIMEOUT) {
          toast.error("Unable to get your location. Please try again.");
        } else {
          toast.error("Unable to get your current location.");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0
      }
    );

  };


  return (
    <div className='h-dvh w-screen overflow-hidden relative'>
      <div className='h-10 w-auto absolute top-4 left-4  drop-shadow-sm drop-shadow-amber-50'>
        <img src={logoWithText} className='h-full' alt="logo" />
      </div>
      <div className='h-dvh w-full'>
        {/* <img className='h-full w-full object-cover' src="https://preview.redd.it/ubers-car-animations-look-3d-but-its-actually-a-smart-v0-xer1e5ww0wcf1.jpeg?auto=webp&s=b85125fb5b9abe3b6e8fa38c0d4e424ffe9d842d" alt="" /> */}
        {location ? (
          <Map
            className="absolute z-2"
            latitude={location.latitude}
            longitude={location.longitude}
          />
        ) : <div className='relative h-full w-full'>
          <img className='h-full w-full object-cover' src="https://preview.redd.it/ubers-car-animations-look-3d-but-its-actually-a-smart-v0-xer1e5ww0wcf1.jpeg?auto=webp&s=b85125fb5b9abe3b6e8fa38c0d4e424ffe9d842d" alt="" />
          <div className='absolute inset-0 bg-gray-700 flex justify-center items-center opacity-30'>
            < SiOpenstreetmap className='size-20 text-gray-100 animate-pulse' />
          </div>
        </div>
        }
      </div>
      <div className='h-dvh  w-full absolute top-0 flex flex-col justify-end'>
        <div className='h-fit py-8 bg-white p-6 flex flex-col justify-center relative z-3'>
          <h4 className='text-2xl font-semibold flex relative'><span>Find a trip</span>
            <span ref={panelCloseRef} onClick={() => {
              setPanelOpen(false)
            }} className='absolute opacity-0 right-6 text-2xl cursor-pointer'>
              <ChevronDown />
            </span></h4>

          <form className='relative'>
            <div className="line block md:hidden absolute  z-5 h-16 w-1 top-[60%] -translate-y-[30%] left-5 bg-gray-500 rounded-full"></div>
            {isCurrentLocationLoading ? <button
              type="button"
              className="flex items-center gap-2 mt-3 ml-2 text-sm font-medium text-blue-400 cursor-pointer animate-pulse"
            >
              <SiOpenstreetmap size={16} />
              Fetching your Location ...
            </button> : <button
              type="button"
              onClick={handleCurrentLocation}
              className="flex items-center gap-2 mt-3 ml-2 text-sm font-medium text-blue-600 cursor-pointer"
            >
              <MapPin size={16} />
              Use my current location
            </button>}

            <div className='md:flex block justify-center items-center md:gap-x-2'>

              <div className='flex w-full items-center relative z-3'>

                <input onClick={() => {
                  setPanelOpen(true)
                  setActiveField("pickup")
                }} value={pickup} onChange={(e) => handlePickupChange(e)}
                  placeholder='Add a pick-up location'
                  type="text"
                  className='w-full bg-[#eee] px-12 py-2 text-lg rounded-lg mt-6 md:mt-6' />
                {isPickLoading && <span><RiLoader2Line className=' absolute right-4 animate-spin mt-1' /></span>}

              </div>

              <div className='flex items-center relative z-3 w-full'>

                <input onClick={() => {
                  setPanelOpen(true)
                  setActiveField("destination")
                }} value={destination}
                  onChange={(e) => handleDestinationChange(e)}
                  placeholder='Enter your destination'
                  type="text"
                  className='w-full bg-[#eee] px-12 py-2 text-lg rounded-lg mt-4 md:mt-6' />

                {isDestinationLoading && <span><RiLoader2Line className=' absolute right-4 animate-spin mt-1' /></span>}

              </div>
            </div>

          </form>
        </div>


        <div ref={panelRef} className='h-0 bg-white px-6 z-3 relative'>
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
            isFareLoading={isFareLoading}
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
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            createRide={createRide}
            isCreatingRide={isCreatingRide}
          />
        </div>


        <div ref={vehicleFoundRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-6 py-2 pt-6' >
          <LookingForDriver
            setVehicleFound={setVehicleFound}
            pickup={pickup}
            destination={destination}
            fare={fare}
            vehicleType={vehicleType}
            ride={ride}
          />
        </div>

      </div>
    </div>
  )
}

export default Home
