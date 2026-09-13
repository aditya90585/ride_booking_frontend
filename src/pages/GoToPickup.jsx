import React, { useContext, useEffect, useRef, useState } from 'react'
import { FaHome } from 'react-icons/fa'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logoWithText from "../assets/logoWithText.png"

import { ChevronUp } from 'lucide-react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import FinishRide from '../components/FinishRide'
import axiosInstance from '../lib/axios'
import { toast } from 'react-toastify'
import Map from '../components/Map'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
import { SocketContext } from '../context/SocketContext'
import { useSelector } from 'react-redux'

const GoToPickup = () => {

    const routerLocation = useLocation()
    const rideData = routerLocation?.state?.ride
    const navigate = useNavigate()
    const [captainLocation, setCaptainLocation] = useState(null);
    const [route, setRoute] = useState(null);



    const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false)
    const ConfirmRidePopUpRef = useRef(null)

    const { socket } = useContext(SocketContext)
    const captainData = useSelector((state) => state.captain.captainData)
    const latestLocation = useRef(null);




    useEffect(() => {
        socket.emit("join", { userId: captainData._id, userType: "captain" })
        if (!navigator.geolocation) {
            toast.error("Geolocation is not supported by your browser.");
            return;
        }

        if (!rideData?.captain?._id || !rideData?.user?.socketId) {
            return;
        }

        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                const { latitude, longitude, heading } = position.coords;

                latestLocation.current = {
                    latitude,
                    longitude,
                    heading
                };

                setCaptainLocation({
                    latitude,
                    longitude,
                    heading
                });
            },
            (error) => {
                console.error("Captain location error:", error);

                if (error.code === error.PERMISSION_DENIED) {
                    toast.error("Please allow location access.");
                } else if (error.code === error.TIMEOUT) {
                    toast.error("Unable to get your location.");
                }
            },
            {
                enableHighAccuracy: true,
                maximumAge: 5000,
                timeout: 10000
            }
        );

        const locationInterval = setInterval(() => {
            const currentLocation = latestLocation.current;

            if (!currentLocation) {
                return;
            }

            socket.emit("update-location-captain", {
                captainId: rideData.captain._id,
                rideId: rideData?._id,
                location: {
                    ltd: currentLocation.latitude,
                    lng: currentLocation.longitude,
                    heading: currentLocation.heading
                }
            });

            console.log("Location sent:", currentLocation);
        }, 10000);

        return () => {
            navigator.geolocation.clearWatch(watchId);
            clearInterval(locationInterval);
        };
    }, [rideData, socket]);

    // useEffect(() => {
    //     if (!navigator.geolocation) {
    //         toast.error("Geolocation is not supported by your browser.");
    //         return;
    //     }

    //     if (!rideData?.captain?._id || !rideData?.user?.socketId) {
    //         return
    //     }

    //     const watchId = navigator.geolocation.watchPosition(
    //         (position) => {
    //             const { latitude, longitude } = position.coords;

    //             setCaptainLocation({
    //                 latitude,
    //                 longitude
    //             });
    //             socket.emit('update-location-captain', {
    //                 captainId: rideData?.captain?._id,
    //                 userSocketId: rideData?.user?.socketId,
    //                 location: {
    //                     ltd: position.coords.latitude,
    //                     lng: position.coords.longitude
    //                 }
    //             })

    //         },
    //         (error) => {
    //             console.error("Captain location error:", error);

    //             if (error.code === error.PERMISSION_DENIED) {
    //                 toast.error("Please allow location access.");
    //             } else if (error.code === error.TIMEOUT) {
    //                 toast.error("Unable to get your location.");
    //             }
    //         },
    //         {
    //             enableHighAccuracy: true,
    //             maximumAge: 5000,
    //             timeout: 10000
    //         }
    //     );



    //     return () => {
    //         navigator.geolocation.clearWatch(watchId);
    //     };
    // }, [rideData]);


    useEffect(() => {
        const getRoute = async () => {
            try {
                if (!rideData?.pickupLocation || !rideData?.destination || !captainLocation?.latitude || !captainLocation?.longitude) {
                    return;
                }
                const response = await axiosInstance.get("/maps/reverse-geocode", {
                    params: {
                        lat: captainLocation.latitude,
                        lng: captainLocation.longitude
                    }
                });

                const routeResponse = await axiosInstance.get(
                    "/maps/get-route",
                    {
                        params: {
                            origin: response?.data?.address,
                            destination: rideData.pickupLocation
                        }
                    }
                );

                setRoute(routeResponse.data.route);
            } catch (error) {
                console.error("Failed to fetch route:", error);
            }
        };

        getRoute();
    }, [rideData, captainLocation]);



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
        <div className='h-dvh'>
            <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
                <img className='w-16' src={logoWithText} alt="logo" />
                <Link to='/captain-home' className=' h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                    <FaHome />
                </Link>
            </div>
            <div className='h-4/5'>
                {/* <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" /> */}
                {captainLocation ? (
                    <Map
                        className="absolute z-2"
                        latitude={captainLocation.latitude}
                        longitude={captainLocation.longitude}
                        route={route}
                        heading={captainLocation.heading}
                    />
                ) : (
                    <img
                        className="h-full w-full object-cover"
                        src="https://preview.redd.it/ubers-car-animations-look-3d-but-its-actually-a-smart-v0-xer1e5ww0wcf1.jpeg?auto=webp&s=b85125fb5b9abe3b6e8fa38c0d4e424ffe9d842d"
                        alt=""
                    />
                )}
            </div>

            <div className='h-1/5 p-6 flex items-center justify-between relative bg-yellow-400 pt-10 relative z-3'
                onClick={() => {
                    setConfirmRidePopUpPanel(true)
                }}
            >
                <h5 className='p-1 text-center w-[90%] absolute top-0' onClick={() => { }}>
                    <ChevronUp className='text-3xl flex justify-center w-full mt-1' />
                </h5>
                <h4 className='text-xl font-semibold'>{'4 KM away'}</h4>
                <button className=' bg-green-600 text-white font-semibold p-3 px-10 rounded-lg'>Verify OTP</button>
            </div>

            {/* <div ref={finishRidePanelRef} className='fixed w-full z-[500] bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
        <FinishRide
          setFinishRidePanel={setFinishRidePanel}
          ride={rideData}
          endRide={endRide}
        />
      </div> */}

            <div ref={ConfirmRidePopUpRef} className='fixed w-full h-dvh z-10 bottom-0 translate-y-full  bg-white px-3 py-10 pt-12'>
                <ConfirmRidePopUp
                    setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
                    // setRidePopUpPanel={}
                    ride={rideData}
                />
            </div>

        </div>
    )
}

export default GoToPickup