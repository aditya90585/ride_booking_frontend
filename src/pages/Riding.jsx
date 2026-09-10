import React, { useContext, useEffect, useState } from 'react'
import logoWithText from "../assets/logoWithText.png"
import Car from "../assets/car.png"
import { FaLocationCrosshairs, FaMapLocationDot, FaRupeeSign } from 'react-icons/fa6'
import { useLocation, useNavigate } from 'react-router-dom'
import { SocketContext } from '../context/SocketContext'
import { toast } from 'react-toastify'
import Map from '../components/Map'
import axiosInstance from '../lib/axios'

const Riding = () => {
    const location = useLocation()
    const rideData = location?.state?.ride
    const navigate = useNavigate()

    const { socket } = useContext(SocketContext)

    const [captainLocation, setcaptainLocation] = useState({})
    const [route, setRoute] = useState(null)


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
                        origin: rideData.pickupLocation,
                        destination: rideData.destination
                    }
                }
            );

            setRoute(routeResponse.data.route);
        }
        setCaptainLocationAndRoute()

    }, [rideData, captainLocation])


    useEffect(() => {
        socket.on("ride-ended", () => {
            toast.success("Ride ended successfully!")
            navigate("/home")
        })
        return () => {
            socket.off("ride-ended")
        }
    }, [])


    return (
        <div className='h-dvh w-screen overflow-hidden relative flex flex-col justify-between'>
            <div className='h-10 w-auto absolute top-4 left-4  drop-shadow-sm drop-shadow-amber-50'>
                <img src={logoWithText} className='h-full' alt="logo" />
            </div>

            <div className='h-1/2 w-full'>
                {/* <img className='h-full w-full object-cover' src="https://preview.redd.it/ubers-car-animations-look-3d-but-its-actually-a-smart-v0-xer1e5ww0wcf1.jpeg?auto=webp&s=b85125fb5b9abe3b6e8fa38c0d4e424ffe9d842d" alt="" /> */}
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
            <div className='h-fit p-6 py-8 relative z-3 bg-white'>
                <div className='flex items-center justify-between'>
                    <img className='h-30' src={Car} alt="" />
                    <div className='text-right'>
                        <h2 className='text-lg font-medium capitalize'>{rideData?.captain?.fullName?.firstName} {rideData?.captain?.fullName?.lastName}</h2>
                        <h4 className='text-xl font-semibold -mt-1 -mb-1'>{rideData?.captain?.vehicle?.plate}</h4>
                        <p className='text-sm text-gray-600'>{rideData?.captain?.vehicle?.color} {rideData?.captain?.vehicle?.vehicleType}</p>
                    </div>
                </div>

                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <FaMapLocationDot />
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{rideData?.destination}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                        <FaRupeeSign />
                        <div>
                            <h3 className='text-lg font-medium'>₹{rideData?.fare}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                        </div>
                    </div>
                </div>
                <button className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg'>Make a Payment</button>
            </div>
        </div>
    )
}

export default Riding
