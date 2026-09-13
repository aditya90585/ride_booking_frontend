import React, { useContext, useEffect, useState } from 'react'
import logoWithText from "../assets/logoWithText.png"
import Car from "../assets/car.png"
import { FaLocationCrosshairs, FaMapLocationDot, FaRupeeSign } from 'react-icons/fa6'
import { useLocation, useNavigate } from 'react-router-dom'
import { SocketContext } from '../context/SocketContext'
import { toast } from 'react-toastify'
import Map from '../components/Map'
import axiosInstance from '../lib/axios'
import { useSelector } from 'react-redux'

const Riding = () => {
    const location = useLocation()
    const rideData = location?.state?.ride
    const navigate = useNavigate()

    const { socket } = useContext(SocketContext)
    const userData = useSelector((state) => state.user.userData)

    const [captainLocation, setcaptainLocation] = useState({})
    const [route, setRoute] = useState(null)

    const [canDoPayment, setcanDoPayment] = useState(false)
    const [paymentState, setPaymentState] = useState("idle");

    useEffect(() => {
        if (!userData?._id) return;

        socket.emit("join", { userId: userData._id, userType: "user" })
    }, [userData])



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
            if (rideData?.paymentMethod === "online") {
                setPaymentState("idle");
            } else {
                setPaymentState("cash-pending")
            }
        })
        return () => {
            socket.off("ride-ended")
        }
    }, [rideData?.paymentMethod])

    useEffect(() => {
        const handleCashPaymentReceived = (data) => {
            console.log("Cash payment received:", data)

            setPaymentState("success")

            toast.success("Cash payment confirmed!")
        }

        socket.on(
            "cash-payment-received",
            handleCashPaymentReceived
        )

        return () => {
            socket.off(
                "cash-payment-received",
                handleCashPaymentReceived
            )
        }
    }, [socket])

    const handlePayment = async () => {
        if (paymentState === "processing") return;

        try {
            setPaymentState("processing");

            const response = await axiosInstance.post(
                "/payment/create-order",
                {
                    rideId: rideData?._id
                }
            );

            const {
                orderId,
                amount,
                currency
            } = response.data.payment;

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,

                amount,
                currency,

                name: "Wayfare",
                description: "Ride Payment",

                order_id: orderId,

                handler: async function (paymentResponse) {
                    try {
                        console.log(
                            "Payment Response:",
                            paymentResponse
                        );

                        const response =
                            await axiosInstance.post(
                                "/payment/verify",
                                {
                                    razorpay_order_id:
                                        paymentResponse.razorpay_order_id,

                                    razorpay_payment_id:
                                        paymentResponse.razorpay_payment_id,

                                    razorpay_signature:
                                        paymentResponse.razorpay_signature
                                }
                            );

                        console.log(
                            "Verification response:",
                            response.data
                        );

                        if (response.data.success) {
                            setPaymentState("success");

                            toast.success(
                                "Payment successful!"
                            );
                        }

                    } catch (error) {
                        console.error(
                            "Payment verification error:",
                            error
                        );

                        setPaymentState("failed");

                        toast.error(
                            error.response?.data?.message ||
                            "Payment verification failed"
                        );
                    }
                },

                theme: {
                    color: "#000000"
                }
            };

            const razorpay =
                new window.Razorpay(options);

            // Razorpay reports failed payments here
            razorpay.on(
                "payment.failed",
                function (response) {
                    console.error(
                        "Razorpay payment failed:",
                        response.error
                    );

                    setPaymentState("failed");

                    toast.error(
                        response.error?.description ||
                        "Payment failed. Please try again."
                    );
                }
            );

            // User closes the Razorpay checkout.
            // This is NOT necessarily a failed payment.
            razorpay.on(
                "modal.closed",
                function () {
                    console.log(
                        "Razorpay checkout closed"
                    );

                    // Only reset processing state.
                    // Don't mark payment as failed.
                    setPaymentState((currentState) =>
                        currentState === "processing"
                            ? "idle"
                            : currentState
                    );
                }
            );

            razorpay.open();

        } catch (error) {
            console.error(
                "Payment error:",
                error
            );

            setPaymentState("failed");

            toast.error(
                error.response?.data?.message ||
                "Unable to start payment"
            );
        }
    };




    useEffect(() => {
        const syncPaymentStatus = async () => {
            if (!rideData?._id) return;

            try {
                const response = await axiosInstance.get(
                    `/payment/status/${rideData._id}`
                );

                if (!response.data.success) return;

                const status =
                    response.data.ride.paymentStatus;
                if (status === "paid") {
                    setPaymentState("success");
                } else if (status === "failed") {
                    setPaymentState("failed");
                } else {
                    setPaymentState("idle");
                }

            } catch (error) {
                console.error(
                    "Failed to sync payment status:",
                    error
                );
            }
        };

        syncPaymentStatus();
    }, [rideData?._id]);

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
                            <p className='text-sm -mt-1 text-gray-600'> {rideData?.paymentMethod === "online"
                                ? "Online Payment"
                                : "Cash"
                            }</p>
                        </div>
                    </div>
                </div>
                {paymentState === "cash-pending" && (
                    <div className="mt-5">
                        <div className="bg-yellow-100 text-yellow-800 p-4 rounded-lg text-center">
                            <h3 className="font-semibold text-lg">
                                Pay ₹{rideData?.fare} in cash
                            </h3>

                            <p className="text-sm mt-1">
                                Please give the fare to your captain.
                            </p>

                            <p className="text-sm mt-2 font-medium">
                                Waiting for captain to confirm payment...
                            </p>
                        </div>
                    </div>
                )}

                {paymentState === "idle" && rideData?.paymentMethod === "online" && (
                    <button
                        onClick={handlePayment}
                        className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg'
                    >
                        Make a Payment
                    </button>
                )}

                {paymentState === "processing" && (
                    <button
                        disabled
                        className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg opacity-50 cursor-not-allowed'
                    >
                        Processing...
                    </button>
                )}

                {paymentState === "failed" && (
                    <div className="mt-5">
                        <p className="text-center text-red-600 text-sm mb-3">
                            Payment failed. Please try again.
                        </p>

                        <button
                            onClick={handlePayment}
                            className='w-full bg-green-600 text-white font-semibold p-2 rounded-lg'
                        >
                            Pay Again
                        </button>
                    </div>
                )}

                {paymentState === "success" && (
                    <div className="mt-5">
                        <div className="bg-green-100 text-green-700 p-4 rounded-lg text-center">
                            <h3 className="font-semibold text-lg">
                                Payment successful
                            </h3>

                            <p className="text-sm mt-1">
                                Your ride payment has been completed.
                            </p>
                        </div>

                        <button
                            onClick={() => navigate("/home")}
                            className="w-full mt-3 bg-black text-white font-semibold p-2 rounded-lg"
                        >
                            Go Home
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Riding
