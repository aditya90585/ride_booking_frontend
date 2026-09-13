import React, { useContext, useEffect, useState } from 'react'
import { FaLocationCrosshairs, FaMapLocationDot, FaRupeeSign } from 'react-icons/fa6'
import Car from "../assets/car.png"
import { useLocation, useNavigate } from 'react-router-dom'
import { SocketContext } from '../context/SocketContext'
import axiosInstance from '../lib/axios'
import Map from '../components/Map.jsx'
import { useSelector } from 'react-redux'

const WaitingForDriver = () => {
    const navigate = useNavigate()
    const routeLocation = useLocation()
    const ride = routeLocation?.state?.ride
    const [captainLocation, setcaptainLocation] = useState({})
    const { socket } = useContext(SocketContext)
    const userData = useSelector
        ((state) => state.user.userData)
    const [route, setRoute] = useState(null)
    useEffect(() => {
        socket.emit("join", { userId: userData._id, userType: "user" })
    }, [])

    useEffect(() => {
        const handleCaptainLocation = (data) => {

            setcaptainLocation({
                latitude: data?.ltd,
                longitude: data?.lng,
                heading: data?.heading
            });
        };

        socket.on("captain-live-location", handleCaptainLocation);

        return () => {
            socket.off("captain-live-location", handleCaptainLocation);
        };
    }, []);


    useEffect(() => {
        async function setCaptainLocationAndRoute() {
            if (!ride?.pickupLocation || !ride?.destination || !captainLocation?.latitude || !captainLocation?.longitude) {
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
                        destination: ride.pickupLocation
                    }
                }
            );

            setRoute(routeResponse.data.route);
        }
        setCaptainLocationAndRoute()

    }, [ride, captainLocation])

    useEffect(() => {
        socket.on("ride-started", (data) => {
            navigate("/riding", { state: { ride: data } })
        })

        return () => {
            socket.off("ride-started")
        }
    }, [])



    return (
        <div className="flex items-center justify-between flex-col h-dvh overflow-hidden w-full z-10 bottom-0  bg-white">
            <div className='h-1/2 w-full'>
                {(captainLocation?.latitude && captainLocation?.longitude) ? (
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
                        alt="map-demo-image"
                    />
                )}

            </div>
            <div className='h-fit w-full px-6 py-2 relative z-4 bg-white'>
                <h3 className='text-2xl font-semibold mb-5 text-center'>Driver is on the way</h3>
                <div className='flex items-center justify-between'>
                    <img className='h-30' src={Car} alt="" />
                    <div className='text-right'>
                        <h2 className='text-lg font-medium capitalize'>{ride?.captain?.fullName?.firstName} {ride?.captain?.fullName?.lastName}</h2>
                        <h4 className='text-xl font-semibold -mt-1 -mb-1'>{ride?.captain?.vehicle?.plate}</h4>
                        <p className='text-sm text-gray-600'>{ride?.captain?.vehicle?.color} {ride?.captain?.vehicle?.vehicleType}</p>
                        <h1 className='text-lg font-semibold'><span className='font-bold'>OTP</span>  :  {ride?.otp} </h1>
                    </div>
                </div>
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <FaLocationCrosshairs />
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{ride?.pickupLocation}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <FaMapLocationDot />
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{ride?.destination}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                        <FaRupeeSign />
                        <div>
                            <h3 className='text-lg font-medium'>₹{ride?.fare}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default WaitingForDriver
