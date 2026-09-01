import { useState } from "react";
import {
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
} from "lucide-react";


import { MdEmail, MdLock } from "react-icons/md";

import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import logoWithText from "../assets/logoWithText.png"
import axiosInstance from "../lib/axios";
import { captainLogin } from "../redux/Slices/captainSlices";
import { useDispatch } from "react-redux";


const CaptainSignup = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });


  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const res = await axiosInstance.post("/captain/register", {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        color: data.vehicleColor,
        plate: data.vehiclePlate,
        capacity: data.vehicleCapacity,
        vehicleType: data.vehicleType,
      });

      if (res.data.success) {
        localStorage.setItem("wf_token", res.data.token)
        dispatch(captainLogin(res.data.captain))
        toast.success("Captain Account created successfully!");


        navigate("/captain-home");
      }




    } catch (err) {
      toast.error(
        err.response?.data?.message ||
        "Captain Signup failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen w-full overflow-hidden bg-gray-950">
      <div
        className="
                    relative flex min-h-screen w-full
                    items-center justify-center
                    [scrollbar-width:none]
                    min-[820px]:items-center
                "
      >

        {/* Background shapes */}

        <div
          className="
                        pointer-events-none
                        absolute
                        -right-[100px]
                        -top-[160px]
                        h-[500px]
                        w-[500px]
                        rounded-full
                        opacity-[0.28]
                        blur-[90px]
                        animate-[drift_9s_ease-in-out_infinite]
                    "
          style={{
            background:
              "radial-gradient(circle, #c4b5fd 0%, #7c3aed 70%)",
          }}
        />

        <div
          className="
                        pointer-events-none
                        absolute
                        -bottom-[100px]
                        -left-[80px]
                        h-[380px]
                        w-[380px]
                        rounded-full
                        opacity-[0.22]
                        blur-[90px]
                        animate-[drift_12s_ease-in-out_infinite_reverse]
                    "
          style={{
            background:
              "radial-gradient(circle, #fbcfe8 0%, #ec4899 70%)",
          }}
        />

        <div
          className="
                        pointer-events-none
                        absolute
                        left-[10%]
                        top-1/2
                        h-[220px]
                        w-[220px]
                        rounded-full
                        opacity-[0.18]
                        blur-[90px]
                        animate-[drift_7s_ease-in-out_infinite_2s]
                    "
          style={{
            background:
              "radial-gradient(circle, #bfdbfe 0%, #3b82f6 70%)",
          }}
        />


        {/* Card */}

        <div
          className="
                        relative
                        z-10
                        w-full
                        max-w-[460px]
                        rounded-[36px]
                        border
                        border-violet-700/[0.07]
                        bg-white
                        px-12
                        pb-[52px]
                        pt-11
                        my-10
                        shadow-[0_24px_64px_rgba(109,40,217,0.13),0_4px_18px_rgba(0,0,0,0.06)]
                        animate-[cardIn_0.45s_cubic-bezier(0.34,1.56,0.64,1)_both]
                        max-[520px]:rounded-[26px]
                        max-[520px]:px-[26px]
                        max-[520px]:pb-11
                        max-[520px]:pt-[34px]
                    "
        >

          {/* Brand */}

          <div className="mb-8 h-10 w-auto">
            <Link to="/">
              <img src={logoWithText} className="h-full w-auto" alt="logo" />
            </Link>
          </div>


          {/* Heading */}

          <div className="mb-[30px]">

            <h1
              className="
                                m-0
                                font-['Playfair_Display']
                                text-[30px]
                                font-semibold
                                leading-[1.2]
                                tracking-[-0.02em]
                                text-[#1c1033]
                            "
            >
              Create captain account
            </h1>

          </div>


          {/* Form */}

          <form
            className="flex flex-col gap-5"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >

            <div className="flex gap-x-2">


              {/* firstName */}
              <div className="flex flex-col gap-[7px]">
                <label
                  htmlFor="captain-firstName"
                  className="
                                    text-[13px]
                                    font-bold
                                    uppercase
                                    tracking-[0.02em]
                                    text-[#1c1033]
                                "
                >
                  First name
                </label>

                <div className="relative flex items-center">



                  <input
                    id="captain-firstName"
                    type="text"
                    placeholder="John"
                    className={`
                                        w-full
                                        rounded-xl
                                        border-[1.5px]
                                        bg-[#faf9ff]
                                        px-[14px]
                                        py-[13px]
                                        font-['Nunito']
                                        text-sm
                                        font-medium
                                        text-[#1c1033]
                                        outline-none
                                        transition
                                        placeholder:text-[#c9c3de]
                                      selection:bg-white
                                        placeholder:font-normal
                                        focus:border-[#ffb508]
                                        focus:bg-white
                                        focus:shadow-[0_0_0_3.5px_rgba(255,181,8,0.14)]
                                        ${errors.email
                        ? "border-red-600 shadow-[0_0_0_3px_rgba(220,38,38,0.10)]"
                        : "border-[#e4e0f0]"
                      }
                                    `}
                    {...register("firstName", {
                      required: "First Name is required",
                    })}
                  />

                </div>

                {errors.firstName && (
                  <span className="text-xs text-red-600">
                    {errors.firstName.message}
                  </span>
                )}
              </div>
              {/* lastName */}
              <div className="flex flex-col gap-[7px]">
                <label
                  htmlFor="captain-lastName"
                  className="
                                    text-[13px]
                                    font-bold
                                    uppercase
                                    tracking-[0.02em]
                                    text-[#1c1033]
                                "
                >
                  Last name
                </label>

                <div className="relative flex items-center">



                  <input
                    id="captain-lastName"
                    type="text"
                    placeholder="Doe"
                    className={`
                                        w-full
                                        rounded-xl
                                        border-[1.5px]
                                        bg-[#faf9ff]
                                        px-[14px]
                                        py-[13px]
                                        font-['Nunito']
                                        text-sm
                                        font-medium
                                        text-[#1c1033]
                                        outline-none
                                        transition
                                        placeholder:text-[#c9c3de]
                                      selection:bg-white
                                        placeholder:font-normal
                                        focus:border-[#ffb508]
                                        focus:bg-white
                                        focus:shadow-[0_0_0_3.5px_rgba(255,181,8,0.14)]
                                        ${errors.email
                        ? "border-red-600 shadow-[0_0_0_3px_rgba(220,38,38,0.10)]"
                        : "border-[#e4e0f0]"
                      }
                                    `}
                    {...register("lastName", {
                      required: "Last Name is required",
                    })}
                  />

                </div>

                {errors.lasttName && (
                  <span className="text-xs text-red-600">
                    {errors.lastName.message}
                  </span>
                )}
              </div>
            </div>

            {/* Email */}

            <div className="flex flex-col gap-[7px]">

              <label
                htmlFor="captain-signup-email"
                className="
                                    text-[13px]
                                    font-bold
                                    uppercase
                                    tracking-[0.02em]
                                    text-[#1c1033]
                                "
              >
                E-mail
              </label>

              <div className="relative flex items-center">

                <span
                  className="
                                        pointer-events-none
                                        absolute
                                        left-[14px]
                                        z-10
                                        flex
                                        items-center
                                        text-[17px]
                                        text-[#b0a8c8]
                                    "
                >
                  <MdEmail />
                </span>

                <input
                  id="captain-signup-email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  className={`
                                        w-full
                                        rounded-xl
                                        border-[1.5px]
                                        bg-[#faf9ff]
                                        px-[14px]
                                        py-[13px]
                                        pl-[42px]
                                        font-['Nunito']
                                        text-sm
                                        font-medium
                                        text-[#1c1033]
                                        outline-none
                                        transition
                                        placeholder:text-[#c9c3de]
                                      selection:bg-white
                                        placeholder:font-normal
                                        focus:border-[#ffb508]
                                        focus:bg-white
                                        focus:shadow-[0_0_0_3.5px_rgba(255,181,8,0.14)]
                                        ${errors.email
                      ? "border-red-600 shadow-[0_0_0_3px_rgba(220,38,38,0.10)]"
                      : "border-[#e4e0f0]"
                    }
                                    `}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value:
                        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message:
                        "Enter a valid email address",
                    },
                  })}
                />

              </div>

              {errors.email && (
                <span className="text-xs text-red-600">
                  {errors.email.message}
                </span>
              )}




              {/* Password */}

              <div className="flex flex-col gap-[7px]">

                <label
                  htmlFor="captain-signup-pass"
                  className="
                                    text-[13px]
                                    font-bold
                                    uppercase
                                    tracking-[0.02em]
                                    text-[#1c1033]
                                "
                >
                  Password
                </label>

                <div className="relative flex items-center">

                  <span
                    className="
                                        pointer-events-none
                                        absolute
                                        left-[14px]
                                        z-10
                                        flex
                                        items-center
                                        text-[17px]
                                        text-[#b0a8c8]
                                    "
                  >
                    <MdLock />
                  </span>

                  <input
                    id="captain-signup-pass"
                    type={showPass ? "text" : "password"}
                    placeholder="Enter password"
                    autoComplete="current-password"
                    className={`
                                        w-full
                                        rounded-xl
                                        border-[1.5px]
                                        bg-[#faf9ff]
                                        px-[14px]
                                        py-[13px]
                                        pl-[42px]
                                        pr-[45px]
                                        font-['Nunito']
                                        text-sm
                                        font-medium
                                        text-[#1c1033]
                                        outline-none
                                        transition
                                        placeholder:text-[#c9c3de]
                                        placeholder:font-normal
                                        focus:border-[#ffb508]
                                        focus:bg-white
                                        focus:shadow-[0_0_0_3.5px_rgba(255,181,8,0.14)]
                                        ${errors.password
                        ? "border-red-600 shadow-[0_0_0_3px_rgba(220,38,38,0.10)]"
                        : "border-[#e4e0f0]"
                      }
                                    `}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message:
                          "Password must be at least 6 characters",
                      },

                    })}
                  />

                  <button
                    type="button"
                    className="
                                        absolute
                                        right-3
                                        flex
                                        items-center
                                        rounded-md
                                        bg-transparent
                                        p-1
                                        text-[#6b7280]
                                        transition
                                        hover:text-violet-700
                                    "
                    onClick={() =>
                      setShowPass((v) => !v)
                    }
                    aria-label="Toggle password"
                  >
                    {showPass ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>

                </div>

                {errors.password && (
                  <span className="text-xs text-red-600">
                    {errors.password.message}
                  </span>
                )}
              </div>

            </div>

            {/* Vehicle Information */}
            <div className="flex flex-col gap-4 pt-1">
              <h2
                className="
                                  m-0
                                 
                                  text-[15px]
                                  font-extrabold
                                  uppercase
                                  tracking-[0.08em]
                                  text-[#1c1033]
                              "
              >
                Vehicle Information :
              </h2>

              <div className="flex gap-x-2">
                {/* vehicleColor */}
                <div className="flex w-full flex-col gap-[7px]">
                  <label
                    htmlFor="captain-vehicle-color"
                    className="
                                        text-[13px]
                                        font-bold
                                        uppercase
                                        tracking-[0.02em]
                                        text-[#1c1033]
                                    "
                  >
                    Vehicle color
                  </label>

                  <div className="relative flex items-center">
                    <input
                      id="captain-vehicle-color"
                      type="text"
                      placeholder="Red"
                      className={`
                                            w-full
                                            rounded-xl
                                            border-[1.5px]
                                            bg-[#faf9ff]
                                            px-[14px]
                                            py-[13px]
                                            font-['Nunito']
                                            text-sm
                                            font-medium
                                            text-[#1c1033]
                                            outline-none
                                            transition
                                            placeholder:text-[#c9c3de]
                                            placeholder:font-normal
                                            focus:border-[#ffb508]
                                            focus:bg-white
                                            focus:shadow-[0_0_0_3.5px_rgba(255,181,8,0.14)]
                                            ${errors.vehicleColor
                          ? "border-red-600 shadow-[0_0_0_3px_rgba(220,38,38,0.10)]"
                          : "border-[#e4e0f0]"
                        }
                                        `}
                      {...register("vehicleColor", {
                        required: "Vehicle color is required",
                      })}
                    />
                  </div>

                  {errors.vehicleColor && (
                    <span className="text-xs text-red-600">
                      {errors.vehicleColor.message}
                    </span>
                  )}
                </div>

                {/* vehiclePlate */}
                <div className="flex w-full flex-col gap-[7px]">
                  <label
                    htmlFor="captain-vehicle-plate"
                    className="
                                        text-[13px]
                                        font-bold
                                        uppercase
                                        tracking-[0.02em]
                                        text-[#1c1033]
                                    "
                  >
                    Vehicle plate
                  </label>

                  <div className="relative flex items-center">
                    <input
                      id="captain-vehicle-plate"
                      type="text"
                      placeholder="MH 12 AB 1234"
                      className={`
                                            w-full
                                            rounded-xl
                                            border-[1.5px]
                                            bg-[#faf9ff]
                                            px-[14px]
                                            py-[13px]
                                            font-['Nunito']
                                            text-sm
                                            font-medium
                                            text-[#1c1033]
                                            outline-none
                                            transition
                                            placeholder:text-[#c9c3de]
                                            placeholder:font-normal
                                            focus:border-[#ffb508]
                                            focus:bg-white
                                            focus:shadow-[0_0_0_3.5px_rgba(255,181,8,0.14)]
                                            ${errors.vehiclePlate
                          ? "border-red-600 shadow-[0_0_0_3px_rgba(220,38,38,0.10)]"
                          : "border-[#e4e0f0]"
                        }
                                        `}
                      {...register("vehiclePlate", {
                        required: "Vehicle plate is required",
                      })}
                    />
                  </div>

                  {errors.vehiclePlate && (
                    <span className="text-xs text-red-600">
                      {errors.vehiclePlate.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex gap-x-2">
                {/* vehicleCapacity */}
                <div className="flex w-full flex-col gap-[7px]">
                  <label
                    htmlFor="captain-vehicle-capacity"
                    className="
                                        text-[13px]
                                        font-bold
                                        uppercase
                                        tracking-[0.02em]
                                        text-[#1c1033]
                                    "
                  >
                    Capacity
                  </label>

                  <div className="relative flex items-center">
                    <input
                      id="captain-vehicle-capacity"
                      type="number"
                      min="1"
                      placeholder="4"
                      className={`
                                            w-full
                                            rounded-xl
                                            border-[1.5px]
                                            bg-[#faf9ff]
                                            px-[14px]
                                            py-[13px]
                                            font-['Nunito']
                                            text-sm
                                            font-medium
                                            text-[#1c1033]
                                            outline-none
                                            transition
                                            placeholder:text-[#c9c3de]
                                            placeholder:font-normal
                                            focus:border-[#ffb508]
                                            focus:bg-white
                                            focus:shadow-[0_0_0_3.5px_rgba(255,181,8,0.14)]
                                            ${errors.vehicleCapacity
                          ? "border-red-600 shadow-[0_0_0_3px_rgba(220,38,38,0.10)]"
                          : "border-[#e4e0f0]"
                        }
                                        `}
                      {...register("vehicleCapacity", {
                        required: "Vehicle capacity is required",
                        min: {
                          value: 1,
                          message: "Capacity must be at least 1",
                        },
                      })}
                    />
                  </div>

                  {errors.vehicleCapacity && (
                    <span className="text-xs text-red-600">
                      {errors.vehicleCapacity.message}
                    </span>
                  )}
                </div>

                {/* vehicleType */}
                <div className="flex w-full flex-col gap-[7px]">
                  <label
                    htmlFor="captain-vehicle-type"
                    className="
                                        text-[13px]
                                        font-bold
                                        uppercase
                                        tracking-[0.02em]
                                        text-[#1c1033]
                                    "
                  >
                    Vehicle type
                  </label>

                  <div className="relative flex items-center">
                    <select
                      id="captain-vehicle-type"
                      className={`
                                            w-full
                                            rounded-xl
                                            border-[1.5px]
                                            bg-[#faf9ff]
                                            px-[14px]
                                            py-[13px]
                                            font-['Nunito']
                                            text-sm
                                            font-medium
                                            text-[#1c1033]
                                            outline-none
                                            transition
                                            focus:border-[#ffb508]
                                            focus:bg-white
                                            focus:shadow-[0_0_0_3.5px_rgba(255,181,8,0.14)]
                                            ${errors.vehicleType
                          ? "border-red-600 shadow-[0_0_0_3px_rgba(220,38,38,0.10)]"
                          : "border-[#e4e0f0]"
                        }
                                        `}
                      defaultValue=""
                      {...register("vehicleType", {
                        required: "Please select a vehicle type",
                      })}
                    >
                      <option value="" disabled>
                        Select one
                      </option>
                      <option value="car">Car</option>
                      <option value="motorcycle">Motorcycle</option>
                      <option value="auto">Auto</option>
                    </select>
                  </div>

                  {errors.vehicleType && (
                    <span className="text-xs text-red-600">
                      {errors.vehicleType.message}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Submit */}

            <button
              className="
                                group
                                mt-0.5
                                flex
                                items-center
                                justify-center
                                gap-[9px]
                                rounded-xl
                                border-0
                                bg-gradient-to-br
                                from-[#FDC903]
                                to-[#F67A09]
                                px-7
                                py-[15px]
                                font-['Nunito']
                                text-[15px]
                                font-bold
                                tracking-[0.02em]
                                text-white
                                shadow-[0_5px_22px_rgba(109,40,217,0.22)]
                                transition
                                hover:-translate-y-0.5
                                hover:brightness-110
                                hover:shadow-[0_8px_30px_rgba(255,181,8,0.5)]
                                active:translate-y-0
                                disabled:cursor-not-allowed
                                disabled:opacity-70
                            "
              type="submit"
              disabled={loading}
            >

              {loading ? <Loader2 className=" animate-spin" /> : "Create Account"}
              {!loading &&
                <span
                  className="
                                    transition-transform
                                    group-hover:translate-x-1
                                "
                >
                  <ArrowRight
                    size={17}
                    strokeWidth={2.5}
                  />
                </span>
              }

            </button>

            <p
              className="
                                m-0
                                text-center
                                font-['Nunito']
                                text-[13.5px]
                                text-[#6b7280]
                            "
            >
              Already have an captain account?

              <Link
                to="/captain-login"
                className="
                                    ml-[3px]
                                    font-bold
                                    text-[#F67A09]
                                    no-underline
                                    transition
                                    hover:opacity-75
                                    hover:underline
                                "
              >
                Login
              </Link>

            </p>


            {/* Divider */}

            <div
              className="
                                flex
                                items-center
                                gap-3
                                text-[#6b7280]
                            "
            >

              <span className="h-px flex-1 bg-[#e4e0f0]" />

              <span
                className="
                                    whitespace-nowrap
                                    text-xs
                                    font-medium
                                "
              >
                Continue as user
              </span>

              <span className="h-px flex-1 bg-[#e4e0f0]" />

            </div>


            {/* Social */}

            <div className="grid grid-cols-2 gap-3">

              <Link
                to="/login"
                className="
                                    flex
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-xl
                                    border-[1.5px]
                                    border-[#F67A09]
                                    bg-white
                                    px-4
                                    py-[11px]
                                    font-['Nunito']
                                    text-[16px]
                                    font-semibold
                                    text-[#F67A09]
                                    transition
                                    hover:-translate-y-px
                                    hover:border-[#c8c2d8]
                                    hover:bg-[#FFC405]
                                    hover:text-white
                                    hover:shadow-[0_2px_10px_rgba(0,0,0,0.07)]
                                "
                type="button"
              >

                Login
              </Link>

              <Link
                to="/signup"
                className="
                                    flex
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-xl
                                    border-[1.5px]
                                    border-[#F67A09]
                                    bg-white
                                    px-4
                                    py-[11px]
                                    font-['Nunito']
                                    text-[16px]
                                    font-semibold
                                    text-[#F67A09]
                                    transition
                                    hover:-translate-y-px
                                    hover:border-[#c8c2d8]
                                    hover:bg-[#FFC405]
                                    hover:text-white
                                    hover:shadow-[0_2px_10px_rgba(0,0,0,0.07)]
                                "
                type="button"
              >

                Signup
              </Link>
            </div>
          </form>
        </div>
      </div >
    </div >
  );
}

export default CaptainSignup